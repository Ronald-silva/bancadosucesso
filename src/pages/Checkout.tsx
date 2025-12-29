import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, CheckCircle } from 'lucide-react';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import logoImg from '@/assets/logo-banca-sucesso.jpg';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image_url?: string | null;
}

const checkoutSchema = z.object({
  name: z.string().min(2, 'Nome é obrigatório').max(100),
  email: z.string().email('Email inválido').max(255),
  phone: z.string().min(10, 'Telefone inválido').max(20),
});

const Checkout = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const { items, totalPrice, clearCart } = useCart();
  const { toast } = useToast();

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  // Verify cart prices against database to prevent manipulation
  const verifyCartPrices = async (cartItems: CartItem[]) => {
    const productIds = cartItems.map(item => item.id);
    const { data: products, error } = await supabase
      .from('products')
      .select('id, name, price')
      .in('id', productIds);
    
    if (error || !products) {
      throw new Error('Erro ao verificar preços dos produtos');
    }
    
    // Verify each item price matches database
    for (const item of cartItems) {
      const dbProduct = products.find(p => p.id === item.id);
      if (!dbProduct) {
        throw new Error(`Produto "${item.name}" não encontrado ou foi removido`);
      }
      // Check price difference (allow tiny floating point differences)
      if (Math.abs(Number(dbProduct.price) - item.price) > 0.01) {
        throw new Error('Os preços foram atualizados. Por favor, atualize seu carrinho.');
      }
      // Verify product name hasn't been tampered
      if (dbProduct.name !== item.name) {
        throw new Error('Informações do produto foram alteradas. Atualize seu carrinho.');
      }
    }
    
    return products;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = checkoutSchema.safeParse({
      name,
      email,
      phone,
    });

    if (!validation.success) {
      toast({
        title: 'Erro de validação',
        description: validation.error.errors[0].message,
        variant: 'destructive',
      });
      return;
    }

    if (items.length === 0) {
      toast({
        title: 'Carrinho vazio',
        description: 'Adicione produtos ao carrinho antes de finalizar.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      // Verify prices before generating WhatsApp message
      await verifyCartPrices(items as CartItem[]);

      // Generate WhatsApp message with verified prices
      let message = '🛒 *PEDIDO CONFIRMADO - BANCA DO SUCESSO*\n\n';
      message += '👤 *Dados do Cliente:*\n';
      message += `Nome: ${name.trim()}\n`;
      message += `Email: ${email.trim()}\n`;
      message += `Telefone: ${phone.trim()}\n\n`;
      message += '📦 *Produtos:*\n';
      message += '─────────────────\n';
      
      items.forEach((item) => {
        message += `• ${item.name}\n`;
        message += `  Qtd: ${item.quantity} x ${formatPrice(item.price)}\n`;
        message += `  Subtotal: ${formatPrice(item.price * item.quantity)}\n\n`;
      });
      
      message += '─────────────────\n';
      message += `💰 *TOTAL: ${formatPrice(totalPrice)}*\n\n`;
      message += '_Pedido realizado pelo site Banca do Sucesso_';

      const whatsappNumber = '5591982750788';
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      
      clearCart();
      setOrderSuccess(true);
      
      // Open WhatsApp
      window.open(whatsappUrl, '_blank');
    } catch (error: any) {
      toast({
        title: 'Erro de validação',
        description: error.message || 'Erro ao processar pedido.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Pedido Enviado!
          </h1>
          <p className="text-muted-foreground mb-6">
            Seu pedido foi enviado para o WhatsApp da loja. Aguarde a confirmação!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/produtos">
              <Button variant="outline">Continuar Comprando</Button>
            </Link>
            <Link to="/">
              <Button>Voltar ao Início</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 px-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link to="/">
            <img
              src={logoImg}
              alt="Banca do Sucesso"
              className="h-10 w-auto rounded-lg"
            />
          </Link>
          <h1 className="text-xl font-bold">Finalizar Compra</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <Link
          to="/produtos"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar aos Produtos
        </Link>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-lg mb-4">
              Seu carrinho está vazio
            </p>
            <Link to="/produtos">
              <Button>Ver Produtos</Button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="order-2 lg:order-1">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Resumo do Pedido
              </h2>
              <div className="bg-muted rounded-lg p-4 space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 bg-background rounded-lg p-3"
                  >
                    <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                          Sem imagem
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground truncate">
                        {item.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Qtd: {item.quantity}
                      </p>
                    </div>
                    <p className="font-bold text-primary">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
                <div className="pt-3 border-t border-border flex items-center justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-primary">{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>

            {/* Checkout Form */}
            <div className="order-1 lg:order-2">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Seus Dados
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome completo"
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Telefone/WhatsApp</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(00) 00000-0000"
                    className="mt-1"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full"
                  variant="cta"
                  size="lg"
                >
                  {isLoading ? 'Enviando...' : 'Confirmar Pedido'}
                </Button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Checkout;
