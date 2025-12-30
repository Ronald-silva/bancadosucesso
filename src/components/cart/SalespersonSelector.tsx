import { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';

interface Salesperson {
  id: string;
  name: string;
}

interface SalespersonSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const SalespersonSelector = ({
  value,
  onChange,
}: SalespersonSelectorProps) => {
  const [salespeople, setSalespeople] = useState<Salesperson[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSalespeople();

    // Subscribe to realtime changes for immediate updates
    const channel = supabase
      .channel('salespeople-cart-changes')
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
    // Only fetch active salespeople (RLS policy ensures this)
    const { data } = await supabase
      .from('salespeople')
      .select('id, name')
      .eq('is_active', true)
      .order('name', { ascending: true });

    setSalespeople(data || []);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <User className="w-4 h-4" />
          Vendedor que atendeu
        </Label>
        <div className="h-10 bg-muted rounded-md animate-pulse" />
      </div>
    );
  }

  if (salespeople.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="salesperson" className="flex items-center gap-2">
        <User className="w-4 h-4" />
        Vendedor que atendeu
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="salesperson">
          <SelectValue placeholder="Selecione o vendedor" />
        </SelectTrigger>
        <SelectContent>
          {salespeople.map((salesperson) => (
            <SelectItem key={salesperson.id} value={salesperson.name}>
              {salesperson.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
