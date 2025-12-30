import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, LogOut, Package, ShoppingCart, Users, Layers, Plus, DollarSign, Star, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import logoImg from '@/assets/logo-banca-sucesso.jpg';
import { CategoryManager } from '@/components/admin/CategoryManager';
import { SubcategoryManager } from '@/components/admin/SubcategoryManager';
import { AdminProductForm } from '@/components/admin/AdminProductForm';
import { SalesManager } from '@/components/admin/SalesManager';
import { FeaturedProductsManager } from '@/components/admin/FeaturedProductsManager';
import { SalespeopleManager } from '@/components/admin/SalespeopleManager';

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  total: number;
  status: string;
  created_at: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  is_featured: boolean;
}

const Admin = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [productCount, setProductCount] = useState(0);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [showProductForm, setShowProductForm] = useState(false);
  const { user, isAdmin, isLoading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();

  // Redirect non-admin users to auth page
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        navigate('/auth', { replace: true });
      } else if (!isAdmin) {
        navigate('/auth', { replace: true });
      }
    }
  }, [user, isAdmin, authLoading, navigate]);

  // Server-side verification of admin role on component mount
  useEffect(() => {
    const verifyAdminAccess = async () => {
      if (!user) return;
      
      const { data } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .maybeSingle();
      
      if (!data) {
        navigate('/auth', { replace: true });
      }
    };
    
    if (!authLoading && user && isAdmin) {
      verifyAdminAccess();
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchData();
    }
  }, [user, isAdmin]);

  const fetchData = async () => {
    setIsPageLoading(true);
    
    const [ordersResult, productsResult] = await Promise.all([
      supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10),
      supabase.from('products').select('id', { count: 'exact' }),
    ]);

    if (ordersResult.data) {
      setOrders(ordersResult.data);
    }
    if (productsResult.count !== null) {
      setProductCount(productsResult.count);
    }
    
    setIsPageLoading(false);
  };

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Carregando...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <img
                src={logoImg}
                alt="Banca do Sucesso"
                className="h-10 w-auto rounded-lg"
              />
            </Link>
            <h1 className="text-xl font-bold">Painel Admin</h1>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="border-foreground/30 bg-background text-foreground hover:bg-muted"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <Link
          to="/"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Site
        </Link>

        {/* Admin Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="sales">Vendas</TabsTrigger>
            <TabsTrigger value="salespeople">Vendedores</TabsTrigger>
            <TabsTrigger value="vitrine">Vitrine</TabsTrigger>
            <TabsTrigger value="products">Produtos</TabsTrigger>
            <TabsTrigger value="categories">Categorias</TabsTrigger>
            <TabsTrigger value="subcategories">Subcategorias</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Produtos</p>
                    <p className="text-2xl font-bold text-foreground">{productCount}</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <ShoppingCart className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pedidos</p>
                    <p className="text-2xl font-bold text-foreground">{orders.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Admin</p>
                    <p className="text-sm font-medium text-foreground truncate max-w-32">
                      {user?.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="p-4 border-b border-border">
                <h2 className="text-lg font-semibold text-foreground">Pedidos Recentes</h2>
              </div>
              
              {isPageLoading ? (
                <div className="p-8 text-center text-muted-foreground">
                  Carregando pedidos...
                </div>
              ) : orders.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  Nenhum pedido ainda.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                          Cliente
                        </th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                          Contato
                        </th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                          Total
                        </th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                          Status
                        </th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                          Data
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id} className="border-b border-border last:border-0">
                          <td className="p-4">
                            <p className="font-medium text-foreground">{order.customer_name}</p>
                            <p className="text-sm text-muted-foreground">{order.customer_email}</p>
                          </td>
                          <td className="p-4 text-sm text-foreground">
                            {order.customer_phone}
                          </td>
                          <td className="p-4 font-bold text-primary">
                            {formatPrice(order.total)}
                          </td>
                          <td className="p-4">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                              {order.status}
                            </span>
                          </td>
                          <td className="p-4 text-sm text-muted-foreground">
                            {formatDate(order.created_at)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Sales Tab */}
          <TabsContent value="sales" className="space-y-6">
            <SalesManager />
          </TabsContent>

          {/* Salespeople Tab */}
          <TabsContent value="salespeople" className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <SalespeopleManager />
            </div>
          </TabsContent>

          {/* Vitrine Tab */}
          <TabsContent value="vitrine" className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <FeaturedProductsManager />
            </div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Gerenciar Produtos</h3>
                <Button onClick={() => setShowProductForm(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Produto
                </Button>
              </div>
              <p className="text-muted-foreground">
                Use o formulário para adicionar novos produtos com categoria e subcategoria.
              </p>
              <Link to="/produtos" className="mt-4 block">
                <Button variant="outline" className="w-full">
                  Ver Todos os Produtos
                </Button>
              </Link>
            </div>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <CategoryManager />
            </div>
          </TabsContent>

          {/* Subcategories Tab */}
          <TabsContent value="subcategories" className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <SubcategoryManager />
            </div>
          </TabsContent>
        </Tabs>

        {/* Product Form Modal */}
        {showProductForm && (
          <AdminProductForm
            onClose={() => setShowProductForm(false)}
            onSuccess={() => fetchData()}
          />
        )}
      </main>
    </div>
  );
};

export default Admin;
