import { useState, useRef, useCallback } from "react";
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { X, Check, RotateCcw } from "lucide-react";

interface ImageCropEditorProps {
  imageSrc: string;
  onSave: (croppedImageBlob: Blob) => void;
  onCancel: () => void;
}

type AspectRatioOption = "free" | "1:1" | "4:3" | "3:4" | "16:9" | "9:16";

const aspectRatioLabels: Record<AspectRatioOption, string> = {
  free: "Livre",
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
  const [aspectRatio, setAspectRatio] = useState<AspectRatioOption>("1:1");
  const [scale, setScale] = useState(100);
  const imgRef = useRef<HTMLImageElement>(null);

  const onImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const { width, height } = e.currentTarget;
      const aspect = aspectRatioValues[aspectRatio];
      if (aspect) {
        setCrop(centerAspectCrop(width, height, aspect));
      } else {
        setCrop({
          unit: "%",
          x: 5,
          y: 5,
          width: 90,
          height: 90,
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
        setCrop({
          unit: "%",
          x: 5,
          y: 5,
          width: 90,
          height: 90,
        });
      }
    }
  };

  const handleReset = () => {
    setScale(100);
    if (imgRef.current) {
      const { width, height } = imgRef.current;
      const aspect = aspectRatioValues[aspectRatio];
      if (aspect) {
        setCrop(centerAspectCrop(width, height, aspect));
      } else {
        setCrop({
          unit: "%",
          x: 5,
          y: 5,
          width: 90,
          height: 90,
        });
      }
    }
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

    // Set canvas size to crop dimensions
    canvas.width = cropWidth;
    canvas.height = cropHeight;

    ctx.drawImage(
      image,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      cropWidth,
      cropHeight
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
  }, [completedCrop]);

  const handleSave = async () => {
    const croppedBlob = await getCroppedImage();
    if (croppedBlob) {
      onSave(croppedBlob);
    }
  };

  return (
    <div className="fixed inset-0 bg-foreground/80 flex items-center justify-center z-[60] p-4">
      <div className="bg-background rounded-lg max-w-2xl w-full p-6 shadow-xl max-h-[95vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Editar Imagem
          </h3>
          <button
            onClick={onCancel}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Aspect Ratio Selection */}
          <div>
            <Label>Proporção</Label>
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

          {/* Scale Slider */}
          <div>
            <Label>Zoom: {scale}%</Label>
            <Slider
              value={[scale]}
              onValueChange={(v) => setScale(v[0])}
              min={50}
              max={200}
              step={5}
              className="mt-2"
            />
          </div>

          {/* Image Crop Area */}
          <div className="flex justify-center bg-muted/50 rounded-lg p-4 overflow-auto max-h-[50vh]">
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspectRatioValues[aspectRatio]}
              className="max-w-full"
            >
              <img
                ref={imgRef}
                src={imageSrc}
                alt="Crop preview"
                onLoad={onImageLoad}
                style={{
                  transform: `scale(${scale / 100})`,
                  transformOrigin: "center",
                  maxHeight: "400px",
                  width: "auto",
                }}
                crossOrigin="anonymous"
              />
            </ReactCrop>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Resetar
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
              Aplicar Corte
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
