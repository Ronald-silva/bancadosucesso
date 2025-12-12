import { Button } from "@/components/ui/button";
import { ShoppingBag, Zap, Clock } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-hero overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-secondary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      {/* Urgency banner */}
      <div className="bg-destructive py-3 text-center relative z-10">
        <div className="container flex items-center justify-center gap-3 text-destructive-foreground">
          <Clock className="w-5 h-5 animate-countdown" />
          <span className="font-display font-bold text-sm md:text-base">
            ⚡ OFERTA POR TEMPO LIMITADO - Preços especiais acabam em breve!
          </span>
          <Clock className="w-5 h-5 animate-countdown" />
        </div>
      </div>

      <div className="container relative z-10 pt-12 pb-20 md:pt-20 md:pb-32">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Logo/Brand */}
          <div className="mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center gap-3 mb-2">
              <ShoppingBag className="w-12 h-12 text-secondary" />
              <h2 className="font-display font-black text-3xl md:text-4xl text-primary-foreground">
                Banca do <span className="text-gradient-gold">Sucesso</span>
              </h2>
            </div>
          </div>

          {/* Main Headline */}
          <h1 
            className="font-display font-black text-4xl md:text-6xl lg:text-7xl text-primary-foreground leading-tight mb-6 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            ACESSE O <span className="text-gradient-gold">MELHOR PREÇO</span>
            <br />DA LOJA EM LINHA!
          </h1>

          {/* Subheadline */}
          <p 
            className="text-lg md:text-xl lg:text-2xl text-primary-foreground/90 max-w-3xl mb-10 animate-fade-in font-body"
            style={{ animationDelay: "0.3s" }}
          >
            Encontre tudo o que precisa para tornar sua vida mais fácil e divertida, 
            todos os dias, <span className="font-bold text-secondary">sem sair de casa!</span>
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <Button variant="hero" size="xl" className="group">
              <Zap className="w-5 h-5 group-hover:animate-shake" />
              COMPRAR AGORA
            </Button>
            <Button variant="outline" size="xl" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
              Ver Produtos
            </Button>
          </div>

          {/* Trust badges */}
          <div 
            className="flex flex-wrap justify-center gap-6 text-primary-foreground/80 animate-fade-in"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-success rounded-full" />
              <span className="text-sm font-medium">Compra 100% Segura</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-secondary rounded-full" />
              <span className="text-sm font-medium">Entrega Rápida</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-success rounded-full" />
              <span className="text-sm font-medium">+10 Anos no Mercado</span>
            </div>
          </div>
        </div>
      </div>

      {/* Wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path 
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
