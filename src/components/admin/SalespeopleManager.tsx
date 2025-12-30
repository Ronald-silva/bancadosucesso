import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Check, X, UserCheck, UserX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Salesperson {
  id: string;
  name: string;
  is_active: boolean;
  created_at: string;
}

export const SalespeopleManager = () => {
  const [salespeople, setSalespeople] = useState<Salesperson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newName, setNewName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchSalespeople();

    // Subscribe to realtime changes
    const channel = supabase
      .channel('salespeople-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'salespeople',
        },
        () => {
          fetchSalespeople();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchSalespeople = async () => {
    const { data, error } = await supabase
      .from('salespeople')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      toast({
        title: 'Erro ao carregar vendedores',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      setSalespeople(data || []);
    }
    setIsLoading(false);
  };

  const handleAdd = async () => {
    const trimmedName = newName.trim();
    if (!trimmedName) {
      toast({
        title: 'Nome obrigatório',
        description: 'Digite o nome do vendedor.',
        variant: 'destructive',
      });
      return;
    }

    if (trimmedName.length > 100) {
      toast({
        title: 'Nome muito longo',
        description: 'O nome deve ter no máximo 100 caracteres.',
        variant: 'destructive',
      });
      return;
    }

    const { error } = await supabase
      .from('salespeople')
      .insert({ name: trimmedName });

    if (error) {
      toast({
        title: 'Erro ao adicionar vendedor',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Vendedor adicionado',
        description: `"${trimmedName}" foi cadastrado com sucesso.`,
      });
      setNewName('');
    }
  };

  const handleEdit = async (id: string) => {
    const trimmedName = editingName.trim();
    if (!trimmedName) {
      toast({
        title: 'Nome obrigatório',
        description: 'Digite o nome do vendedor.',
        variant: 'destructive',
      });
      return;
    }

    if (trimmedName.length > 100) {
      toast({
        title: 'Nome muito longo',
        description: 'O nome deve ter no máximo 100 caracteres.',
        variant: 'destructive',
      });
      return;
    }

    const { error } = await supabase
      .from('salespeople')
      .update({ name: trimmedName })
      .eq('id', id);

    if (error) {
      toast({
        title: 'Erro ao atualizar vendedor',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Vendedor atualizado',
        description: `Nome alterado para "${trimmedName}".`,
      });
      setEditingId(null);
      setEditingName('');
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('salespeople')
      .update({ is_active: !currentStatus })
      .eq('id', id);

    if (error) {
      toast({
        title: 'Erro ao atualizar status',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: currentStatus ? 'Vendedor desativado' : 'Vendedor ativado',
        description: currentStatus
          ? 'O vendedor foi removido da lista de seleção.'
          : 'O vendedor está disponível para seleção.',
      });
    }
  };

  const handleDelete = async (id: string, name: string) => {
    const { error } = await supabase
      .from('salespeople')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: 'Erro ao excluir vendedor',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Vendedor excluído',
        description: `"${name}" foi removido.`,
      });
    }
  };

  const startEditing = (salesperson: Salesperson) => {
    setEditingId(salesperson.id);
    setEditingName(salesperson.name);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingName('');
  };

  if (isLoading) {
    return <div className="text-muted-foreground">Carregando vendedores...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Gerenciar Vendedores
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Cadastre os vendedores que atendem os clientes. Eles aparecerão na página de checkout.
        </p>
      </div>

      {/* Add new salesperson */}
      <div className="flex gap-2">
        <Input
          placeholder="Nome do vendedor"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          maxLength={100}
          className="flex-1"
        />
        <Button onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Adicionar
        </Button>
      </div>

      {/* Salespeople list */}
      {salespeople.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          Nenhum vendedor cadastrado.
        </div>
      ) : (
        <div className="space-y-2">
          {salespeople.map((salesperson) => (
            <div
              key={salesperson.id}
              className={`flex items-center gap-3 p-3 rounded-lg border ${
                salesperson.is_active
                  ? 'bg-card border-border'
                  : 'bg-muted/50 border-border/50'
              }`}
            >
              {editingId === salesperson.id ? (
                <>
                  <Input
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleEdit(salesperson.id);
                      if (e.key === 'Escape') cancelEditing();
                    }}
                    maxLength={100}
                    className="flex-1"
                    autoFocus
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEdit(salesperson.id)}
                  >
                    <Check className="w-4 h-4 text-green-600" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={cancelEditing}>
                    <X className="w-4 h-4 text-destructive" />
                  </Button>
                </>
              ) : (
                <>
                  <span
                    className={`flex-1 font-medium ${
                      salesperson.is_active
                        ? 'text-foreground'
                        : 'text-muted-foreground line-through'
                    }`}
                  >
                    {salesperson.name}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      salesperson.is_active
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {salesperson.is_active ? 'Ativo' : 'Inativo'}
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => startEditing(salesperson)}
                    title="Editar nome"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() =>
                      handleToggleActive(salesperson.id, salesperson.is_active)
                    }
                    title={salesperson.is_active ? 'Desativar' : 'Ativar'}
                  >
                    {salesperson.is_active ? (
                      <UserX className="w-4 h-4 text-destructive" />
                    ) : (
                      <UserCheck className="w-4 h-4 text-green-600" />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(salesperson.id, salesperson.name)}
                    title="Excluir"
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
