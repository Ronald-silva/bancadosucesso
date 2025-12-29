import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ShoppingCart, ArrowRight, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
}

const FeaturedProductsSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("id, name, price, image_url")
        .limit(8)
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

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: "Adicionado ao carrinho",
      description: `${product.name} foi adicionado.`,
    });
  };

  if (loading) {
    return (
      <section className="py-8 md:py-12 bg-background">
        <div className="container">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-card rounded-lg h-64 md:h-80 animate-pulse border border-border"
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
    <section className="py-8 md:py-12 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
              Produtos em Destaque
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mt-1">
              Os mais procurados da loja
            </p>
          </div>
          <Link
            to="/produtos"
            className="hidden sm:flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm transition-colors"
          >
            Ver todos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group bg-card rounded-lg border border-border overflow-hidden card-hover animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Product Image */}
              <Link to="/produtos" className="block relative aspect-square overflow-hidden bg-muted">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <Package className="w-10 h-10 md:w-12 md:h-12 text-muted-foreground/30" />
                  </div>
                )}
              </Link>

              {/* Product Info */}
              <div className="p-3 md:p-4">
                <Link to="/produtos">
                  <h3 className="font-medium text-foreground text-sm md:text-base line-clamp-2 min-h-[2.5rem] md:min-h-[3rem] hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                </Link>
                
                <div className="mt-2 md:mt-3">
                  <p className="text-lg md:text-xl font-bold text-success">
                    {formatPrice(product.price)}
                  </p>
                  <p className="text-2xs md:text-xs text-muted-foreground">
                    em até 10x de {formatPrice(product.price / 10)}
                  </p>
                </div>

                <Button
                  onClick={() => handleAddToCart(product)}
                  className="w-full mt-3 md:mt-4 h-9 md:h-10 text-xs md:text-sm bg-primary hover:bg-primary/90"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Comprar
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile see all button */}
        <div className="mt-6 text-center sm:hidden">
          <Button variant="outline" asChild className="w-full">
            <Link to="/produtos" className="flex items-center justify-center gap-2">
              Ver todos os produtos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
