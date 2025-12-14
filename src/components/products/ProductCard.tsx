import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
}

export const ProductCard = ({ id, name, price, image_url }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart({ id, name, price, image_url });
    toast({
      title: 'Produto adicionado',
      description: `${name} foi adicionado ao carrinho.`,
    });
  };

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden transition-shadow hover:shadow-lg">
      <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden">
        {image_url ? (
          <img
            src={image_url}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-muted-foreground text-sm">Sem imagem</div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-foreground truncate">{name}</h3>
        <p className="text-lg font-bold text-primary mt-1">{formatPrice(price)}</p>
        <Button
          onClick={handleAddToCart}
          className="w-full mt-3"
          variant="cta"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Comprar
        </Button>
      </div>
    </div>
  );
};
