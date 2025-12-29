import { ShoppingCart, Package } from 'lucide-react';
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
      title: 'Adicionado ao carrinho',
      description: `${name} foi adicionado.`,
    });
  };

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="group bg-card rounded-lg border border-border overflow-hidden card-hover">
      <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden">
        {image_url ? (
          <img
            src={image_url}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <Package className="w-10 h-10 text-muted-foreground/30" />
        )}
      </div>
      <div className="p-3 md:p-4">
        <h3 className="font-medium text-foreground text-sm md:text-base line-clamp-2 min-h-[2.5rem] md:min-h-[3rem]">
          {name}
        </h3>
        <div className="mt-2">
          <p className="text-lg md:text-xl font-bold text-success">
            {formatPrice(price)}
          </p>
          <p className="text-2xs md:text-xs text-muted-foreground">
            em até 10x de {formatPrice(price / 10)}
          </p>
        </div>
        <Button
          onClick={handleAddToCart}
          className="w-full mt-3 h-9 md:h-10 text-xs md:text-sm bg-primary hover:bg-primary/90"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Comprar
        </Button>
      </div>
    </div>
  );
};
