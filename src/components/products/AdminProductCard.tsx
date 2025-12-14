import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AdminProductCardProps {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  onEdit: () => void;
  onDelete: () => void;
}

export const AdminProductCard = ({
  id,
  name,
  price,
  image_url,
  onEdit,
  onDelete,
}: AdminProductCardProps) => {
  const { toast } = useToast();

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) {
      return;
    }

    const { error } = await supabase.from('products').delete().eq('id', id);

    if (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao excluir o produto.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Sucesso',
      description: 'Produto excluído com sucesso.',
    });
    onDelete();
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
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
        <div className="flex gap-2 mt-3">
          <Button
            onClick={onEdit}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            <Edit className="w-4 h-4 mr-1" />
            Editar
          </Button>
          <Button
            onClick={handleDelete}
            variant="destructive"
            size="sm"
            className="flex-1"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Excluir
          </Button>
        </div>
      </div>
    </div>
  );
};
