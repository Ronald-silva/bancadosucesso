import { useState, useRef, useCallback } from "react";
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { X, Check, RotateCcw, Move, Maximize2 } from "lucide-react";

interface ImageCropEditorProps {
  imageSrc: string;
  onSave: (croppedImageBlob: Blob) => void;
  onCancel: () => void;
}

type AspectRatioOption = "free" | "1:1" | "4:3" | "3:4" | "16:9" | "9:16";

const aspectRatioLabels: Record<AspectRatioOption, string> = {
  free: "Livre (Edição Total)",
  "1:1": "Quadrado (1:1)",
  "4:3": "Horizontal (4:3)",
  "3:4": "Vertical (3:4)",
  "16:9": "Widescreen (16:9)",
  "9:16": "Retrato (9:16)",
};

const aspectRatioValues: Record<AspectRatioOption, number | undefined> = {
  free: undefined,
  "1:1": 1,
  "4:3": 4 / 3,
  "3:4": 3 / 4,
  "16:9": 16 / 9,
  "9:16": 9 / 16,
};

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export const ImageCropEditor = ({
  imageSrc,
  onSave,
  onCancel,
}: ImageCropEditorProps) => {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [aspectRatio, setAspectRatio] = useState<AspectRatioOption>("free");
  const [scale, setScale] = useState(100);
  const [outputWidth, setOutputWidth] = useState<string>("");
  const [outputHeight, setOutputHeight] = useState<string>("");
  const imgRef = useRef<HTMLImageElement>(null);

  const onImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const { width, height } = e.currentTarget;
      const aspect = aspectRatioValues[aspectRatio];
      if (aspect) {
        setCrop(centerAspectCrop(width, height, aspect));
      } else {
        // For free mode, start with full image selection
        setCrop({
          unit: "%",
          x: 0,
          y: 0,
          width: 100,
          height: 100,
        });
      }
    },
    [aspectRatio]
  );

  const handleAspectRatioChange = (value: AspectRatioOption) => {
    setAspectRatio(value);
    const aspect = aspectRatioValues[value];
    if (imgRef.current) {
      const { width, height } = imgRef.current;
      if (aspect) {
        setCrop(centerAspectCrop(width, height, aspect));
      } else {
        // For free mode, select entire image
        setCrop({
          unit: "%",
          x: 0,
          y: 0,
          width: 100,
          height: 100,
        });
      }
    }
  };

  const handleReset = () => {
    setScale(100);
    setOutputWidth("");
    setOutputHeight("");
    if (imgRef.current) {
      const { width, height } = imgRef.current;
      const aspect = aspectRatioValues[aspectRatio];
      if (aspect) {
        setCrop(centerAspectCrop(width, height, aspect));
      } else {
        setCrop({
          unit: "%",
          x: 0,
          y: 0,
          width: 100,
          height: 100,
        });
      }
    }
  };

  const handleSelectAll = () => {
    setCrop({
      unit: "%",
      x: 0,
      y: 0,
      width: 100,
      height: 100,
    });
  };

  const getCroppedImage = useCallback(async (): Promise<Blob | null> => {
    if (!completedCrop || !imgRef.current) {
      return null;
    }

    const image = imgRef.current;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return null;
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const cropX = completedCrop.x * scaleX;
    const cropY = completedCrop.y * scaleY;
    const cropWidth = completedCrop.width * scaleX;
    const cropHeight = completedCrop.height * scaleY;

    // Determine output dimensions
    let finalWidth = cropWidth;
    let finalHeight = cropHeight;

    const customWidth = parseInt(outputWidth);
    const customHeight = parseInt(outputHeight);

    if (customWidth > 0 && customHeight > 0) {
      finalWidth = customWidth;
      finalHeight = customHeight;
    } else if (customWidth > 0) {
      finalWidth = customWidth;
      finalHeight = (cropHeight / cropWidth) * customWidth;
    } else if (customHeight > 0) {
      finalHeight = customHeight;
      finalWidth = (cropWidth / cropHeight) * customHeight;
    }

    // Set canvas size to final dimensions
    canvas.width = finalWidth;
    canvas.height = finalHeight;

    // Enable image smoothing for better quality
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      finalWidth,
      finalHeight
    );

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          resolve(blob);
        },
        "image/jpeg",
        0.95
      );
    });
  }, [completedCrop, outputWidth, outputHeight]);

  const handleSave = async () => {
    const croppedBlob = await getCroppedImage();
    if (croppedBlob) {
      onSave(croppedBlob);
    }
  };

  // Calculate current crop dimensions for display
  const getCropDimensions = () => {
    if (!completedCrop || !imgRef.current) return { width: 0, height: 0 };
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
    return {
      width: Math.round(completedCrop.width * scaleX),
      height: Math.round(completedCrop.height * scaleY),
    };
  };

  const cropDimensions = getCropDimensions();

  return (
    <div className="fixed inset-0 bg-foreground/80 flex items-center justify-center z-[60] p-4">
      <div className="bg-background rounded-lg max-w-3xl w-full p-6 shadow-xl max-h-[95vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Editor de Imagem Completo
            </h3>
            <p className="text-sm text-muted-foreground">
              Recorte, redimensione e ajuste livremente de todos os lados
            </p>
          </div>
          <button
            onClick={onCancel}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Controls Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Aspect Ratio Selection */}
            <div>
              <Label className="flex items-center gap-2">
                <Move className="w-4 h-4" />
                Proporção / Formato
              </Label>
              <Select
                value={aspectRatio}
                onValueChange={(v) => handleAspectRatioChange(v as AspectRatioOption)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(aspectRatioLabels) as AspectRatioOption[]).map(
                    (key) => (
                      <SelectItem key={key} value={key}>
                        {aspectRatioLabels[key]}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Zoom Slider */}
            <div>
              <Label>Zoom: {scale}%</Label>
              <Slider
                value={[scale]}
                onValueChange={(v) => setScale(v[0])}
                min={50}
                max={200}
                step={5}
                className="mt-3"
              />
            </div>
          </div>

          {/* Output Dimensions (Optional) */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="flex items-center gap-2">
                <Maximize2 className="w-4 h-4" />
                Largura Final (px)
              </Label>
              <Input
                type="number"
                value={outputWidth}
                onChange={(e) => setOutputWidth(e.target.value)}
                placeholder={`Auto (${cropDimensions.width}px)`}
                className="mt-1"
                min="1"
              />
            </div>
            <div>
              <Label>Altura Final (px)</Label>
              <Input
                type="number"
                value={outputHeight}
                onChange={(e) => setOutputHeight(e.target.value)}
                placeholder={`Auto (${cropDimensions.height}px)`}
                className="mt-1"
                min="1"
              />
            </div>
          </div>

          {/* Current Dimensions Info */}
          <div className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
            <strong>Área selecionada:</strong> {cropDimensions.width} x {cropDimensions.height} px
            {(outputWidth || outputHeight) && (
              <span className="ml-2">
                → <strong>Saída:</strong>{" "}
                {outputWidth || "auto"} x {outputHeight || "auto"} px
              </span>
            )}
          </div>

          {/* Image Crop Area */}
          <div className="flex justify-center bg-muted/50 rounded-lg p-4 overflow-auto max-h-[45vh]">
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspectRatioValues[aspectRatio]}
              className="max-w-full"
              ruleOfThirds
            >
              <img
                ref={imgRef}
                src={imageSrc}
                alt="Crop preview"
                onLoad={onImageLoad}
                style={{
                  transform: `scale(${scale / 100})`,
                  transformOrigin: "center",
                  maxHeight: "350px",
                  width: "auto",
                }}
                crossOrigin="anonymous"
              />
            </ReactCrop>
          </div>

          {/* Instructions */}
          <div className="text-xs text-muted-foreground bg-primary/5 rounded-lg p-3 space-y-1">
            <p><strong>Dicas de uso:</strong></p>
            <ul className="list-disc list-inside space-y-0.5">
              <li>Arraste as bordas da seleção para recortar de qualquer lado</li>
              <li>Arraste o centro para mover a área de recorte</li>
              <li>Use "Livre" para recortar em qualquer proporção</li>
              <li>Defina dimensões finais para redimensionar a imagem</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Resetar
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleSelectAll}
              className="flex items-center gap-2"
            >
              <Maximize2 className="w-4 h-4" />
              Selecionar Tudo
            </Button>
            <div className="flex-1" />
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              Aplicar Edição
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
