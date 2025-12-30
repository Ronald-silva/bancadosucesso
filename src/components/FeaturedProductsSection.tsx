import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  is_featured: boolean;
}

const FeaturedProductsSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("id, name, price, image_url, is_featured")
        .eq("is_featured", true)
        .limit(5)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setProducts(data);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  if (loading) {
    return (
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="bg-card rounded-xl h-48 md:h-64 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary-foreground px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-3 md:mb-4 border border-secondary/30">
            <ShoppingBag className="w-3 h-3 md:w-4 md:h-4 text-secondary" />
            <span className="text-xs md:text-sm font-semibold">Vitrine de Produtos</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-3 md:mb-4">
            Produtos em <span className="text-primary">Destaque</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto px-4">
            Confira alguns dos nossos produtos mais procurados. Qualidade garantida com os melhores preços.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6 mb-8 md:mb-10">
          {products.map((product, index) => (
            <Link
              key={product.id}
              to="/produtos"
              className="group relative bg-card rounded-xl md:rounded-2xl overflow-hidden border border-border hover:border-secondary/50 shadow-sm hover:shadow-xl hover:shadow-secondary/10 transition-all duration-500 hover:-translate-y-1 md:hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Product Image */}
              <div className="aspect-square overflow-hidden bg-muted/30 relative">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/10">
                    <ShoppingBag className="w-8 md:w-12 h-8 md:h-12 text-muted-foreground/30" />
                  </div>
                )}
                
                {/* Overlay on Hover - hidden on mobile */}
                <div className="hidden md:flex absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 items-end justify-center pb-4">
                  <span className="text-primary-foreground text-sm font-semibold bg-secondary px-4 py-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-lg">
                    Ver Catálogo
                  </span>
                </div>

                {/* Corner accent - hidden on mobile */}
                <div className="hidden md:block absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-secondary border-l-[40px] border-l-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Product Info */}
              <div className="p-3 md:p-4 bg-gradient-to-b from-card to-muted/30">
                <h3 className="font-medium text-foreground text-xs md:text-sm line-clamp-2 mb-1.5 md:mb-2 group-hover:text-primary transition-colors duration-300 min-h-[2rem] md:min-h-[2.5rem]">
                  {product.name}
                </h3>
                <p className="text-secondary-foreground font-bold text-sm md:text-lg bg-secondary/20 inline-block px-2 md:px-3 py-0.5 md:py-1 rounded-md md:rounded-lg border border-secondary/30">
                  {formatPrice(product.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button
            variant="default"
            size="lg"
            asChild
            className="group shadow-brand hover:shadow-xl text-sm md:text-base"
          >
            <Link to="/produtos" className="flex items-center gap-2">
              Ver Todos os Produtos
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
