import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { ProductCard } from "@/components/products/ProductCard";
import { CartButton } from "@/components/cart/CartButton";
import { CartDrawer } from "@/components/cart/CartDrawer";
import logoImg from "@/assets/logo-banca-sucesso.jpg";

interface Category {
  id: string;
  name: string;
  icon: string | null;
  slug: string;
}

interface Subcategory {
  id: string;
  name: string;
  category_id: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  subcategory_id: string | null;
}

const CategoryProducts = () => {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchCategoryData();
    }
  }, [slug]);

  const fetchCategoryData = async () => {
    setIsLoading(true);

    // Fetch category by slug
    const { data: categoryData } = await supabase
      .from("categories")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (categoryData) {
      setCategory(categoryData);

      // Fetch subcategories for this category
      const { data: subcategoriesData } = await supabase
        .from("subcategories")
        .select("*")
        .eq("category_id", categoryData.id)
        .order("display_order", { ascending: true });

      setSubcategories(subcategoriesData || []);

      // Fetch products for this category
      const { data: productsData } = await supabase
        .from("products")
        .select("*")
        .eq("category_id", categoryData.id)
        .order("name", { ascending: true });

      setProducts(productsData || []);
    }

    setIsLoading(false);
  };

  // Group products by subcategory
  const getProductsBySubcategory = (subcategoryId: string) => {
    return products.filter((p) => p.subcategory_id === subcategoryId);
  };

  // Products without subcategory
  const productsWithoutSubcategory = products.filter((p) => !p.subcategory_id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Carregando...</div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <p className="text-muted-foreground mb-4">Categoria não encontrada.</p>
        <Button asChild>
          <Link to="/">Voltar ao Início</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 px-4 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <img
                src={logoImg}
                alt="Banca do Sucesso"
                className="h-10 w-auto rounded-lg"
              />
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{category.icon}</span>
              <h1 className="text-lg md:text-xl font-bold">{category.name}</h1>
            </div>
          </div>
          <CartButton onClick={() => setIsCartOpen(true)} />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Início
        </Link>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">
              Nenhum produto nesta categoria ainda.
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Products without subcategory */}
            {productsWithoutSubcategory.length > 0 && (
              <div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                  {productsWithoutSubcategory.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      image_url={product.image_url}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Products grouped by subcategory */}
            {subcategories.map((subcategory) => {
              const subcategoryProducts = getProductsBySubcategory(subcategory.id);
              if (subcategoryProducts.length === 0) return null;

              return (
                <div key={subcategory.id}>
                  <h2 className="text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
                    {subcategory.name}
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                    {subcategoryProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        image_url={product.image_url}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default CategoryProducts;
