import { useState, useEffect } from "react";
import { Edit2, Trash2, Plus, Save, X, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  display_order: number;
}

export const SubcategoryManager = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [newSubcategoryName, setNewSubcategoryName] = useState("");
  const [addingToCategoryId, setAddingToCategoryId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const [categoriesResult, subcategoriesResult] = await Promise.all([
      supabase.from("categories").select("*").order("display_order"),
      supabase.from("subcategories").select("*").order("display_order"),
    ]);

    setCategories(categoriesResult.data || []);
    setSubcategories(subcategoriesResult.data || []);
    setIsLoading(false);
  };

  const getSubcategoriesByCategory = (categoryId: string) => {
    return subcategories.filter((s) => s.category_id === categoryId);
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
    setAddingToCategoryId(null);
    cancelEdit();
  };

  const startEdit = (subcategory: Subcategory) => {
    setEditingId(subcategory.id);
    setEditName(subcategory.name);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
  };

  const saveEdit = async () => {
    if (!editingId || !editName.trim()) return;

    const { error } = await supabase
      .from("subcategories")
      .update({ name: editName.trim() })
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
        description: "Subcategoria atualizada.",
      });
      cancelEdit();
      fetchData();
    }
  };

  const deleteSubcategory = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta subcategoria?")) {
      return;
    }

    const { error } = await supabase.from("subcategories").delete().eq("id", id);

    if (error) {
      toast({
        title: "Erro",
        description: mapDatabaseError(error),
        variant: "destructive",
      });
    } else {
      toast({
        title: "Sucesso",
        description: "Subcategoria excluída.",
      });
      fetchData();
    }
  };

  const addSubcategory = async (categoryId: string) => {
    if (!newSubcategoryName.trim()) return;

    const maxOrder = Math.max(
      0,
      ...getSubcategoriesByCategory(categoryId).map((s) => s.display_order)
    );

    const { error } = await supabase.from("subcategories").insert({
      category_id: categoryId,
      name: newSubcategoryName.trim(),
      display_order: maxOrder + 1,
    });

    if (error) {
      toast({
        title: "Erro",
        description: mapDatabaseError(error),
        variant: "destructive",
      });
    } else {
      toast({
        title: "Sucesso",
        description: "Subcategoria criada.",
      });
      setNewSubcategoryName("");
      setAddingToCategoryId(null);
      fetchData();
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Carregando subcategorias...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Subcategorias</h3>

      <div className="space-y-2">
        {categories.map((category) => {
          const categorySubcategories = getSubcategoriesByCategory(category.id);
          const isExpanded = expandedCategory === category.id;

          return (
            <div key={category.id} className="border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center gap-3 p-3 bg-muted/30 hover:bg-muted/50 transition-colors text-left"
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                )}
                <span className="text-xl">{category.icon}</span>
                <span className="flex-1 font-medium text-foreground">
                  {category.name}
                </span>
                <span className="text-sm text-muted-foreground">
                  {categorySubcategories.length} subcategorias
                </span>
              </button>

              {isExpanded && (
                <div className="p-3 space-y-2 bg-background">
                  {categorySubcategories.map((subcategory) => (
                    <div
                      key={subcategory.id}
                      className="flex items-center gap-3 p-2 bg-muted/20 rounded"
                    >
                      {editingId === subcategory.id ? (
                        <>
                          <Input
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            placeholder="Nome da subcategoria"
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
                          <span className="flex-1 text-foreground pl-2">
                            {subcategory.name}
                          </span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => startEdit(subcategory)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-destructive hover:text-destructive"
                            onClick={() => deleteSubcategory(subcategory.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  ))}

                  {addingToCategoryId === category.id ? (
                    <div className="flex items-center gap-2 mt-2">
                      <Input
                        value={newSubcategoryName}
                        onChange={(e) => setNewSubcategoryName(e.target.value)}
                        placeholder="Nome da nova subcategoria"
                        className="flex-1"
                        autoFocus
                      />
                      <Button size="sm" onClick={() => addSubcategory(category.id)}>
                        <Save className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setAddingToCategoryId(null);
                          setNewSubcategoryName("");
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full mt-2"
                      onClick={() => setAddingToCategoryId(category.id)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar Subcategoria
                    </Button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
