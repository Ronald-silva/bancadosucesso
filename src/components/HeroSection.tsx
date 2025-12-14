import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import logoImg from "@/assets/logo-banca-sucesso.jpg";

const HeroSection = () => {
  const { user, isAdmin } = useAuth();

  return (
    <section className="bg-gradient-hero relative">
      {/* Admin/Login Link */}
      <div className="absolute top-4 right-4">
        {user ? (
          isAdmin ? (
            <Link to="/admin">
              <Button
                variant="outline"
                size="sm"
                className="border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground/10"
              >
                Painel Admin
              </Button>
            </Link>
          ) : (
            <Link to="/produtos">
              <Button
                variant="outline"
                size="sm"
                className="border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground/10"
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
              className="border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground/10"
            >
              Admin
            </Button>
          </Link>
        )}
      <div className="container py-16 md:py-24">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Logo */}
          <div className="mb-8 animate-fade-in">
            <img 
              src={logoImg} 
              alt="Banca do Sucesso Home Center" 
              className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-primary-foreground/20"
            />
          </div>

          {/* Main Headline */}
          <h1 
            className="font-semibold text-3xl md:text-4xl lg:text-5xl text-primary-foreground leading-tight mb-4 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            O melhor preço da loja, <span className="text-secondary">online</span>
          </h1>

          {/* Subheadline */}
          <p 
            className="text-base md:text-lg text-primary-foreground/80 max-w-2xl mb-8 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Encontre tudo o que precisa para sua casa e trabalho com preços acessíveis e entrega rápida.
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row gap-3 mb-10 animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <Button 
              variant="hero" 
              size="lg" 
              asChild
            >
              <Link to="/produtos">
                Ver Loja Online
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground/10 hover:text-primary-foreground"
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
            className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-primary-foreground/70 animate-fade-in text-sm"
            style={{ animationDelay: "0.4s" }}
          >
            <span>✓ Compra segura</span>
            <span>✓ 10x sem juros</span>
            <span>✓ Entrega rápida</span>
            <span>✓ +10 anos no mercado</span>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default HeroSection;
