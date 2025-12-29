import { useEffect, useState } from 'react';
import { Star, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  is_featured: boolean;
}

export const FeaturedProductsManager = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchProducts = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('id, name, price, image_url, is_featured')
      .order('name');

    if (error) {
      console.error('Error fetching products:', error);
    } else {
      setProducts(data || []);
      setFeaturedProducts((data || []).filter((p) => p.is_featured));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const toggleFeatured = async (product: Product) => {
    const newFeaturedState = !product.is_featured;
    
    // Check if we already have 5 featured products
    if (newFeaturedState && featuredProducts.length >= 5) {
      toast({
        title: 'Limite atingido',
        description: 'Você já tem 5 produtos em destaque. Remova um antes de adicionar outro.',
        variant: 'destructive',
      });
      return;
    }

    const { error } = await supabase
      .from('products')
      .update({ is_featured: newFeaturedState })
      .eq('id', product.id);

    if (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao atualizar o destaque.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Sucesso',
      description: newFeaturedState
        ? 'Produto adicionado à vitrine.'
        : 'Produto removido da vitrine.',
    });
    
    fetchProducts();
  };

  const nonFeaturedProducts = products.filter((p) => !p.is_featured);

  if (isLoading) {
    return (
      <div className="text-center text-muted-foreground py-8">
        Carregando produtos...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Featured Products Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Star className="w-5 h-5 text-secondary fill-secondary" />
            Produtos em Destaque na Vitrine ({featuredProducts.length}/5)
          </h3>
        </div>
        
        {featuredProducts.length === 0 ? (
          <div className="bg-muted/50 rounded-lg p-6 text-center text-muted-foreground">
            Nenhum produto em destaque. Selecione até 5 produtos para aparecer na vitrine.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-3 bg-secondary/10 border border-secondary/30 rounded-lg p-3"
              >
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                      Sem img
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground text-sm truncate">
                    {product.name}
                  </p>
                  <p className="text-xs text-secondary-foreground font-semibold">
                    {formatPrice(product.price)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="flex-shrink-0 text-muted-foreground hover:text-destructive"
                  onClick={() => toggleFeatured(product)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Available Products Section */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Selecionar Produtos para Vitrine
        </h3>
        
        {nonFeaturedProducts.length === 0 ? (
          <div className="bg-muted/50 rounded-lg p-6 text-center text-muted-foreground">
            Todos os produtos já estão em destaque ou não há produtos cadastrados.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-80 overflow-y-auto">
            {nonFeaturedProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-3 bg-card border border-border rounded-lg p-3 hover:border-secondary/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                      Sem img
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground text-sm truncate">
                    {product.name}
                  </p>
                  <p className="text-xs text-primary font-semibold">
                    {formatPrice(product.price)}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-shrink-0"
                  onClick={() => toggleFeatured(product)}
                  disabled={featuredProducts.length >= 5}
                >
                  <Star className="w-4 h-4 mr-1" />
                  Destacar
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
