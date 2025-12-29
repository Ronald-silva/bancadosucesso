import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import logoImg from "@/assets/logo-banca-sucesso.jpg";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const fetchProduct = async (productId: string) => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("id, name, description, price, image_url")
      .eq("id", productId)
      .maybeSingle();

    if (!error && data) {
      setProduct(data);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-card shadow-sm border-b border-border sticky top-0 z-50">
          <div className="container mx-auto px-4 py-3 md:py-4">
            <Link to="/" className="flex items-center gap-2 md:gap-3">
              <img
                src={logoImg}
                alt="Banca Sucesso Logo"
                className="h-10 md:h-14 w-auto object-contain"
              />
            </Link>
          </div>
        </header>
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground text-lg">Produto não encontrado.</p>
          <Link
            to="/produtos"
            className="inline-flex items-center gap-2 text-primary hover:underline mt-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar aos Produtos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <Link to="/" className="flex items-center gap-2 md:gap-3">
            <img
              src={logoImg}
              alt="Banca Sucesso Logo"
              className="h-10 md:h-14 w-auto object-contain"
            />
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 md:py-10">
        <Link
          to="/produtos"
          className="inline-flex items-center gap-2 text-primary hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar aos Produtos
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 md:gap-10">
            {/* Product Image */}
            <div className="aspect-square bg-muted rounded-xl overflow-hidden flex items-center justify-center border border-border">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-muted-foreground">Sem imagem</div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {product.name}
              </h1>

              {product.description ? (
                <div className="prose prose-sm max-w-none">
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {product.description}
                  </p>
                </div>
              ) : (
                <p className="text-muted-foreground italic">
                  Este produto não possui descrição.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
