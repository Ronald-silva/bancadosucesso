import { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { mapDatabaseError } from '@/lib/errorMapper';
interface ProductFormProps {
  onClose: () => void;
  onSuccess: () => void;
  editProduct?: {
    id: string;
    name: string;
    price: number;
    image_url: string | null;
  };
}

export const ProductForm = ({ onClose, onSuccess, editProduct }: ProductFormProps) => {
  const [name, setName] = useState(editProduct?.name || '');
  const [price, setPrice] = useState(editProduct?.price?.toString() || '');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(editProduct?.image_url || null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: 'Erro',
        description: 'O nome do produto é obrigatório.',
        variant: 'destructive',
      });
      return;
    }

    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue <= 0) {
      toast({
        title: 'Erro',
        description: 'Informe um preço válido.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      let imageUrl = editProduct?.image_url || null;

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(fileName, imageFile);

        if (uploadError) {
          throw uploadError;
        }

        const { data: urlData } = supabase.storage
          .from('product-images')
          .getPublicUrl(fileName);
        
        imageUrl = urlData.publicUrl;
      }

      if (editProduct) {
        const { error } = await supabase
          .from('products')
          .update({
            name: name.trim(),
            price: priceValue,
            image_url: imageUrl,
          })
          .eq('id', editProduct.id);

        if (error) throw error;

        toast({
          title: 'Sucesso',
          description: 'Produto atualizado com sucesso.',
        });
      } else {
        const { error } = await supabase.from('products').insert({
          name: name.trim(),
          price: priceValue,
          image_url: imageUrl,
        });

        if (error) throw error;

        toast({
          title: 'Sucesso',
          description: 'Produto criado com sucesso.',
        });
      }

      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Error saving product:', error);
      toast({
        title: 'Erro',
        description: mapDatabaseError(error),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg max-w-md w-full p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">
            {editProduct ? 'Editar Produto' : 'Novo Produto'}
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nome do Produto</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Camiseta Azul"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="price">Preço (R$)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0,00"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="image">Imagem do Produto</Label>
            <div className="mt-1">
              {imagePreview ? (
                <div className="relative aspect-square max-w-48 mx-auto mb-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview(null);
                    }}
                    className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                  <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">
                    Clique para enviar imagem
                  </span>
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
