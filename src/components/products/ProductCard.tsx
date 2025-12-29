import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
    <Link 
      to={`/produto/${id}`}
      className="block bg-card rounded-lg md:rounded-xl border border-border overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-secondary/30"
    >
      <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden">
        {image_url ? (
          <img
            src={image_url}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <div className="text-muted-foreground text-xs md:text-sm">Sem imagem</div>
        )}
      </div>
      <div className="p-3 md:p-4">
        <h3 className="font-medium text-foreground text-xs md:text-sm line-clamp-2 min-h-[2rem] md:min-h-[2.5rem]">{name}</h3>
        <p className="text-base md:text-lg font-bold text-primary mt-1">{formatPrice(price)}</p>
        <Button
          onClick={handleAddToCart}
          className="w-full mt-2 md:mt-3 text-xs md:text-sm h-9 md:h-10"
          variant="cta"
        >
          <ShoppingCart className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1.5 md:mr-2" />
          Comprar
        </Button>
      </div>
    </Link>
  );
};
