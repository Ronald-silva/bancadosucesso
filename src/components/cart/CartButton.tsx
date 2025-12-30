import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

interface CartButtonProps {
  onClick: () => void;
}

export const CartButton = ({ onClick }: CartButtonProps) => {
  const { totalItems } = useCart();

  return (
    <Button
      onClick={onClick}
      variant="outline"
      size="icon"
      className="relative border-foreground/30"
    >
      <ShoppingCart className="w-5 h-5 text-foreground" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </Button>
  );
};
