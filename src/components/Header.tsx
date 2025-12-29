import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { CartButton } from "@/components/cart/CartButton";
import { CartDrawer } from "@/components/cart/CartDrawer";
import logoImg from "@/assets/logo-banca-sucesso.jpg";

const Header = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/produtos?busca=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  const categories = [
    { name: "Ferramentas", icon: "🔧" },
    { name: "Materiais", icon: "🧱" },
    { name: "Elétrica", icon: "💡" },
    { name: "Hidráulica", icon: "🚿" },
    { name: "Pintura", icon: "🎨" },
    { name: "Jardim", icon: "🌱" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full">
        {/* Top bar */}
        <div className="bg-primary text-primary-foreground">
          <div className="container flex items-center justify-between h-12 md:h-14">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 -ml-2 hover:bg-primary-foreground/10 rounded-lg transition-colors"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-2 md:gap-3 hover:opacity-90 transition-opacity"
            >
              <img
                src={logoImg}
                alt="Banca do Sucesso"
                className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-secondary"
              />
              <div className="hidden sm:block">
                <span className="font-bold text-base md:text-lg leading-tight block">
                  Banca do Sucesso
                </span>
                <span className="text-2xs md:text-xs text-primary-foreground/70 leading-tight">
                  Home Center
                </span>
              </div>
            </Link>

            {/* Search bar - Desktop */}
            <form
              onSubmit={handleSearch}
              className="hidden lg:flex flex-1 max-w-xl mx-6"
            >
              <div className="relative w-full flex">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar produtos, marcas e mais..."
                  className="w-full h-10 pl-4 pr-12 rounded-l-lg bg-primary-foreground text-foreground placeholder:text-muted-foreground text-sm border-0 focus:outline-none focus:ring-2 focus:ring-secondary"
                />
                <Button
                  type="submit"
                  className="h-10 px-4 rounded-l-none rounded-r-lg bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </form>

            {/* Right actions */}
            <div className="flex items-center gap-1 md:gap-2">
              {/* User menu */}
              <div className="hidden md:flex items-center">
                {user ? (
                  <Link
                    to={isAdmin ? "/admin" : "/produtos"}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-primary-foreground/10 transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <div className="text-left">
                      <span className="text-xs text-primary-foreground/70 block leading-tight">
                        Olá, {isAdmin ? "Admin" : "Cliente"}
                      </span>
                      <span className="text-sm font-medium flex items-center gap-1">
                        {isAdmin ? "Painel" : "Conta"}
                        <ChevronDown className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                ) : (
                  <Link
                    to="/auth"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-primary-foreground/10 transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <div className="text-left">
                      <span className="text-xs text-primary-foreground/70 block leading-tight">
                        Faça seu login
                      </span>
                      <span className="text-sm font-medium flex items-center gap-1">
                        Entre ou Cadastre
                        <ChevronDown className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                )}
              </div>

              {/* Cart button */}
              <CartButton onClick={() => setIsCartOpen(true)} />
            </div>
          </div>
        </div>

        {/* Categories bar - Desktop */}
        <nav className="hidden lg:block bg-card border-b border-border shadow-sm">
          <div className="container">
            <div className="flex items-center gap-1 h-12">
              <Link
                to="/produtos"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
              >
                <Menu className="w-4 h-4" />
                Todos os Produtos
              </Link>
              <div className="w-px h-6 bg-border mx-2" />
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to="/produtos"
                  className="flex items-center gap-1.5 px-3 py-2 text-sm text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors whitespace-nowrap"
                >
                  <span>{category.icon}</span>
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-card border-b border-border shadow-lg animate-fade-in">
            <div className="container py-4 space-y-4">
              {/* Mobile search */}
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar produtos..."
                  className="w-full h-11 pl-4 pr-12 rounded-lg bg-muted text-foreground placeholder:text-muted-foreground text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="absolute right-1 top-1 h-9 px-3 bg-primary hover:bg-primary/90"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </form>

              {/* Mobile categories */}
              <div className="grid grid-cols-3 gap-2">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    to="/produtos"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex flex-col items-center gap-1 p-3 rounded-lg bg-muted hover:bg-primary/10 transition-colors text-center"
                  >
                    <span className="text-xl">{category.icon}</span>
                    <span className="text-xs font-medium text-foreground">{category.name}</span>
                  </Link>
                ))}
              </div>

              {/* Mobile user actions */}
              <div className="pt-2 border-t border-border">
                {user ? (
                  <Link
                    to={isAdmin ? "/admin" : "/produtos"}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                  >
                    <User className="w-5 h-5 text-primary" />
                    <span className="font-medium">
                      {isAdmin ? "Painel Admin" : "Minha Conta"}
                    </span>
                  </Link>
                ) : (
                  <Link
                    to="/auth"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                  >
                    <User className="w-5 h-5 text-primary" />
                    <span className="font-medium">Entrar ou Cadastrar</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;
