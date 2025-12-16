import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Search } from "lucide-react";
import logoImg from "@/assets/logo-banca-sucesso.jpg";

const HeroSection = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/produtos?busca=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const featuredProducts = [
    { name: "Ferramentas", icon: "🔧" },
    { name: "Materiais", icon: "🧱" },
    { name: "Elétrica", icon: "💡" },
    { name: "Hidráulica", icon: "🚿" },
    { name: "Pintura", icon: "🎨" },
    { name: "Jardim", icon: "🌱" },
  ];

  return (
    <>
      <section className="bg-gradient-hero relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-foreground/5 rounded-full blur-3xl" />
        </div>

        {/* Admin/Login Link */}
        <div className="absolute top-4 right-4 z-10">
          {user ? (
            isAdmin ? (
              <Link to="/admin">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-secondary/50 text-primary-foreground bg-primary-foreground/10 hover:bg-secondary hover:text-secondary-foreground hover:border-secondary"
                >
                  Painel Admin
                </Button>
              </Link>
            ) : (
              <Link to="/produtos">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-secondary/50 text-primary-foreground bg-primary-foreground/10 hover:bg-secondary hover:text-secondary-foreground hover:border-secondary"
                >
                  Minha Conta
                </Button>
              </Link>
            )
          ) : (
            <Link to="/auth">
              <Button
                variant="outline"
                size="sm"
                className="border-secondary/50 text-primary-foreground bg-primary-foreground/10 hover:bg-secondary hover:text-secondary-foreground hover:border-secondary"
              >
                Admin
              </Button>
            </Link>
          )}
        </div>

        <div className="container px-4 py-12 md:py-24 relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            {/* Logo */}
            <div className="mb-6 md:mb-8 animate-fade-in">
              <div className="relative">
                <div className="absolute inset-0 bg-secondary/30 rounded-full blur-xl scale-150" />
                <img 
                  src={logoImg} 
                  alt="Banca do Sucesso Home Center" 
                  className="relative w-20 h-20 md:w-32 md:h-32 rounded-full object-cover border-4 border-secondary shadow-xl"
                />
              </div>
            </div>

            {/* Main Headline */}
            <h1 
              className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary-foreground leading-tight mb-3 md:mb-4 animate-fade-in px-2"
              style={{ animationDelay: "0.1s" }}
            >
              O melhor preço da loja, <span className="text-gradient-gold">online</span>
            </h1>

            {/* Subheadline */}
            <p 
              className="text-sm sm:text-base md:text-lg text-primary-foreground/85 max-w-2xl mb-5 md:mb-6 animate-fade-in px-4"
              style={{ animationDelay: "0.2s" }}
            >
              Encontre tudo o que precisa para sua casa e trabalho com preços acessíveis e entrega rápida.
            </p>

            {/* Search Bar */}
            <form 
              onSubmit={handleSearch}
              className="w-full max-w-xl mb-6 md:mb-8 animate-fade-in px-2"
              style={{ animationDelay: "0.25s" }}
            >
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar produtos..."
                  className="w-full h-12 md:h-14 pl-4 md:pl-5 pr-14 md:pr-32 rounded-full bg-primary-foreground/95 text-foreground placeholder:text-muted-foreground text-sm md:text-base border-2 border-secondary/50 focus:border-secondary focus:outline-none focus:ring-4 focus:ring-secondary/20 shadow-xl transition-all duration-300"
                />
                <Button
                  type="submit"
                  variant="hero"
                  size="sm"
                  className="absolute right-1.5 h-9 md:h-11 px-3 md:px-6 rounded-full"
                >
                  <Search className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="hidden sm:inline ml-2">Buscar</span>
                </Button>
              </div>
            </form>

            {/* CTA Buttons */}
            <div 
              className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-8 md:mb-10 animate-fade-in w-full sm:w-auto px-4 sm:px-0"
              style={{ animationDelay: "0.3s" }}
            >
              <Button 
                variant="hero" 
                size="lg" 
                asChild
                className="animate-pulse-glow w-full sm:w-auto text-sm md:text-base"
              >
                <Link to="/produtos">
                  Ver Loja Online
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-primary-foreground/30 text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20 hover:text-primary-foreground hover:border-secondary w-full sm:w-auto text-sm md:text-base"
                asChild
              >
                <a 
                  href="https://wa.me/559182750788" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Falar no WhatsApp
                </a>
              </Button>
            </div>

            {/* Trust badges */}
            <div 
              className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-2 md:gap-3 animate-fade-in px-2"
              style={{ animationDelay: "0.4s" }}
            >
              {[
                { icon: "✓", text: "Compra segura" },
                { icon: "✓", text: "10x sem juros" },
                { icon: "✓", text: "Entrega rápida" },
                { icon: "✓", text: "+10 anos" },
              ].map((badge, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center justify-center gap-1.5 md:gap-2 bg-primary-foreground/10 px-3 md:px-4 py-2 rounded-full text-xs md:text-sm text-primary-foreground border border-primary-foreground/20"
                >
                  <span className="text-secondary font-bold">{badge.icon}</span>
                  {badge.text}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom wave decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-primary to-transparent" />
      </section>

      {/* Featured Categories Section */}
      <section className="bg-primary py-10 md:py-16 relative overflow-hidden">
        {/* Decorative accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent" />
        
        <div className="container px-4 relative z-10">
          <h2 className="text-center text-xl md:text-3xl font-bold text-primary-foreground mb-6 md:mb-8">
            Nossas <span className="text-gradient-gold">Categorias</span>
          </h2>
          
          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4 mb-8 md:mb-10">
            {featuredProducts.map((category, index) => (
              <Link
                key={index}
                to="/produtos"
                className="group bg-primary-foreground/10 hover:bg-secondary border border-primary-foreground/20 hover:border-secondary rounded-lg md:rounded-xl p-3 md:p-5 text-center transition-all duration-300 hover:scale-105 hover:shadow-accent"
              >
                <span className="text-2xl md:text-4xl mb-2 md:mb-3 block transition-transform duration-300 group-hover:scale-110">{category.icon}</span>
                <span className="text-primary-foreground group-hover:text-secondary-foreground font-medium text-xs md:text-sm transition-colors duration-300 line-clamp-1">{category.name}</span>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Button 
              variant="hero" 
              size="lg" 
              asChild
              className="text-sm md:text-base"
            >
              <Link to="/produtos">
                Ver Todos os Produtos
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
