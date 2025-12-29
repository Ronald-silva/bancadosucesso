import { useState, useEffect } from "react";
import { X, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { mapDatabaseError } from "@/lib/errorMapper";

interface Category {
  id: string;
  name: string;
  icon: string | null;
}

interface Subcategory {
  id: string;
  name: string;
  category_id: string;
}

interface AdminProductFormProps {
  onClose: () => void;
  onSuccess: () => void;
  editProduct?: {
    id: string;
    name: string;
    price: number;
    image_url: string | null;
    category_id: string | null;
    subcategory_id: string | null;
  };
}

export const AdminProductForm = ({
  onClose,
  onSuccess,
  editProduct,
}: AdminProductFormProps) => {
  const [name, setName] = useState(editProduct?.name || "");
  const [price, setPrice] = useState(editProduct?.price?.toString() || "");
  const [categoryId, setCategoryId] = useState(editProduct?.category_id || "");
  const [subcategoryId, setSubcategoryId] = useState(editProduct?.subcategory_id || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    editProduct?.image_url || null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const { toast } = useToast();

  const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  useEffect(() => {
    fetchCategoriesAndSubcategories();
  }, []);

  const fetchCategoriesAndSubcategories = async () => {
    const [categoriesResult, subcategoriesResult] = await Promise.all([
      supabase.from("categories").select("*").order("display_order"),
      supabase.from("subcategories").select("*").order("display_order"),
    ]);

    setCategories(categoriesResult.data || []);
    setSubcategories(subcategoriesResult.data || []);
  };

  const getSubcategoriesByCategory = (catId: string) => {
    return subcategories.filter((s) => s.category_id === catId);
  };

  const handleCategoryChange = (value: string) => {
    setCategoryId(value);
    setSubcategoryId(""); // Reset subcategory when category changes
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        toast({
          title: "Formato não suportado",
          description:
            "Use apenas imagens JPG, PNG, WebP ou GIF. Arquivos HEIC não são compatíveis com navegadores.",
          variant: "destructive",
        });
        e.target.value = "";
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: "Arquivo muito grande",
          description: "A imagem deve ter no máximo 5MB.",
          variant: "destructive",
        });
        e.target.value = "";
        return;
      }

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
        title: "Erro",
        description: "O nome do produto é obrigatório.",
        variant: "destructive",
      });
      return;
    }

    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue <= 0) {
      toast({
        title: "Erro",
        description: "Informe um preço válido.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      let imageUrl = editProduct?.image_url || null;

      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(fileName, imageFile);

        if (uploadError) {
          throw uploadError;
        }

        const { data: urlData } = supabase.storage
          .from("product-images")
          .getPublicUrl(fileName);

        imageUrl = urlData.publicUrl;
      }

      const productData = {
        name: name.trim(),
        price: priceValue,
        image_url: imageUrl,
        category_id: categoryId || null,
        subcategory_id: subcategoryId || null,
      };

      if (editProduct) {
        const { error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", editProduct.id);

        if (error) throw error;

        toast({
          title: "Sucesso",
          description: "Produto atualizado com sucesso.",
        });
      } else {
        const { error } = await supabase.from("products").insert(productData);

        if (error) throw error;

        toast({
          title: "Sucesso",
          description: "Produto criado com sucesso.",
        });
      }

      onSuccess();
      onClose();
    } catch (error: any) {
      console.error("Error saving product:", error);
      toast({
        title: "Erro",
        description: mapDatabaseError(error),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const availableSubcategories = categoryId
    ? getSubcategoriesByCategory(categoryId)
    : [];

  return (
    <div className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg max-w-md w-full p-6 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">
            {editProduct ? "Editar Produto" : "Novo Produto"}
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
            <Label htmlFor="category">Categoria</Label>
            <Select value={categoryId} onValueChange={handleCategoryChange}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {availableSubcategories.length > 0 && (
            <div>
              <Label htmlFor="subcategory">Subcategoria</Label>
              <Select value={subcategoryId} onValueChange={setSubcategoryId}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Selecione uma subcategoria (opcional)" />
                </SelectTrigger>
                <SelectContent>
                  {availableSubcategories.map((subcategory) => (
                    <SelectItem key={subcategory.id} value={subcategory.id}>
                      {subcategory.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

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
                    accept=".jpg,.jpeg,.png,.webp,.gif"
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
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
