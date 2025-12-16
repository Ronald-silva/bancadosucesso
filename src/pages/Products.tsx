import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Plus, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products/ProductCard';
import { AdminProductCard } from '@/components/products/AdminProductCard';
import { ProductForm } from '@/components/products/ProductForm';
import { CartButton } from '@/components/cart/CartButton';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import logoImg from '@/assets/logo-banca-sucesso.jpg';

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
  const [isCartOpen, setIsCartOpen] = useState(false);
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 px-4 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <img
                src={logoImg}
                alt="Banca do Sucesso"
                className="h-10 w-auto rounded-lg"
              />
            </Link>
            <h1 className="text-xl font-bold hidden sm:block">Produtos</h1>
          </div>
          <div className="flex items-center gap-3">
            {isAdmin && (
              <Link to="/admin">
                <Button variant="outline" size="sm" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  Painel Admin
                </Button>
              </Link>
            )}
            <CartButton onClick={() => setIsCartOpen(true)} />
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="bg-gradient-to-b from-primary to-primary/90 py-6 px-4">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="relative flex items-center">
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Buscar produtos..."
              className="w-full h-12 pl-5 pr-24 rounded-full bg-primary-foreground text-foreground placeholder:text-muted-foreground border-2 border-secondary/50 focus:border-secondary focus:outline-none focus:ring-4 focus:ring-secondary/20 shadow-lg transition-all duration-300"
            />
            {localSearch && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-20 p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <Button
              type="submit"
              variant="hero"
              size="sm"
              className="absolute right-1.5 h-9 px-4 rounded-full"
            >
              <Search className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Link>
            {searchQuery && (
              <span className="text-sm text-muted-foreground">
                {filteredProducts.length} resultado{filteredProducts.length !== 1 ? 's' : ''} para "{searchQuery}"
              </span>
            )}
          </div>
          {isAdmin && (
            <Button onClick={() => setShowForm(true)} variant="cta">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Produto
            </Button>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-muted rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            {searchQuery ? (
              <>
                <p className="text-muted-foreground text-lg mb-4">
                  Nenhum produto encontrado para "{searchQuery}".
                </p>
                <Button onClick={clearSearch} variant="outline">
                  Limpar busca
                </Button>
              </>
            ) : (
              <>
                <p className="text-muted-foreground text-lg mb-4">
                  Nenhum produto cadastrado ainda.
                </p>
                {isAdmin && (
                  <Button onClick={() => setShowForm(true)} variant="cta">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Primeiro Produto
                  </Button>
                )}
              </>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) =>
              isAdmin ? (
                <AdminProductCard
                  key={product.id}
                  {...product}
                  onEdit={() => handleEdit(product)}
                  onDelete={fetchProducts}
                />
              ) : (
                <ProductCard key={product.id} {...product} />
              )
            )}
          </div>
        )}
      </main>

      {/* Product Form Modal */}
      {showForm && (
        <ProductForm
          onClose={handleCloseForm}
          onSuccess={fetchProducts}
          editProduct={editingProduct || undefined}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Products;
