import { useState, useEffect } from "react";
import { Edit2, Trash2, Plus, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { mapDatabaseError } from "@/lib/errorMapper";

interface Category {
  id: string;
  name: string;
  icon: string | null;
  slug: string;
  display_order: number;
}

export const CategoryManager = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editIcon, setEditIcon] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      toast({
        title: "Erro",
        description: mapDatabaseError(error),
        variant: "destructive",
      });
    } else {
      setCategories(data || []);
    }
    setIsLoading(false);
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const startEdit = (category: Category) => {
    setEditingId(category.id);
    setEditName(category.name);
    setEditIcon(category.icon || "");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditIcon("");
  };

  const saveEdit = async () => {
    if (!editingId || !editName.trim()) return;

    const { error } = await supabase
      .from("categories")
      .update({
        name: editName.trim(),
        icon: editIcon.trim() || null,
        slug: generateSlug(editName.trim()),
      })
      .eq("id", editingId);

    if (error) {
      toast({
        title: "Erro",
        description: mapDatabaseError(error),
        variant: "destructive",
      });
    } else {
      toast({
        title: "Sucesso",
        description: "Categoria atualizada.",
      });
      cancelEdit();
      fetchCategories();
    }
  };

  const deleteCategory = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta categoria? Os produtos vinculados perderão a categoria.")) {
      return;
    }

    const { error } = await supabase.from("categories").delete().eq("id", id);

    if (error) {
      toast({
        title: "Erro",
        description: mapDatabaseError(error),
        variant: "destructive",
      });
    } else {
      toast({
        title: "Sucesso",
        description: "Categoria excluída.",
      });
      fetchCategories();
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Carregando categorias...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Categorias</h3>

      <div className="space-y-2">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
          >
            {editingId === category.id ? (
              <>
                <Input
                  value={editIcon}
                  onChange={(e) => setEditIcon(e.target.value)}
                  placeholder="Emoji"
                  className="w-16"
                />
                <Input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Nome da categoria"
                  className="flex-1"
                />
                <Button size="sm" onClick={saveEdit}>
                  <Save className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={cancelEdit}>
                  <X className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <>
                <span className="text-xl">{category.icon}</span>
                <span className="flex-1 font-medium text-foreground">
                  {category.name}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => startEdit(category)}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-destructive hover:text-destructive"
                  onClick={() => deleteCategory(category.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
