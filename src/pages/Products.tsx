import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Plus, Search, X, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products/ProductCard';
import { AdminProductCard } from '@/components/products/AdminProductCard';
import { ProductForm } from '@/components/products/ProductForm';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import FooterSection from '@/components/FooterSection';

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [localSearch, setLocalSearch] = useState(searchParams.get('busca') || '');
  const { isAdmin } = useAuth();

  const searchQuery = searchParams.get('busca') || '';

  const fetchProducts = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
    } else {
      setProducts(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setSearchParams({ busca: localSearch.trim() });
    } else {
      setSearchParams({});
    }
  };

  const clearSearch = () => {
    setLocalSearch('');
    setSearchParams({});
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <div className="container py-6 md:py-8">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Nossos Produtos</h1>
              <p className="text-muted-foreground mt-1">
                {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} 
                {searchQuery && ` para "${searchQuery}"`}
              </p>
            </div>
            {isAdmin && (
              <Button onClick={() => setShowForm(true)} className="self-start sm:self-auto">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Produto
              </Button>
            )}
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-6 md:mb-8">
            <div className="flex gap-2 max-w-xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  placeholder="Buscar produtos..."
                  className="w-full h-11 pl-10 pr-4 rounded-lg bg-card text-foreground placeholder:text-muted-foreground text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <Button type="submit" className="h-11 px-6">Buscar</Button>
              {searchQuery && (
                <Button type="button" variant="outline" onClick={clearSearch} className="h-11">
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </form>

          {/* Products Grid */}
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="bg-card rounded-lg h-64 md:h-80 animate-pulse border border-border" />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Package className="w-16 h-16 text-muted-foreground/30 mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Nenhum produto encontrado</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery ? `Não encontramos resultados para "${searchQuery}"` : 'Ainda não há produtos cadastrados'}
              </p>
              {searchQuery && <Button variant="outline" onClick={clearSearch}>Limpar busca</Button>}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {filteredProducts.map((product) =>
                isAdmin ? (
                  <AdminProductCard key={product.id} {...product} onEdit={() => handleEdit(product)} onDelete={fetchProducts} />
                ) : (
                  <ProductCard key={product.id} {...product} />
                )
              )}
            </div>
          )}
        </div>
      </main>

      <FooterSection />

      {showForm && (
        <ProductForm onClose={handleCloseForm} onSuccess={fetchProducts} editProduct={editingProduct || undefined} />
      )}
    </div>
  );
};

export default Products;
