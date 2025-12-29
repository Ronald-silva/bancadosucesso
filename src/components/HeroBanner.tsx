import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Truck, Shield, CreditCard, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroBanner = () => {
  const [currentSlide] = useState(0);

  const benefits = [
    { icon: Truck, text: "Entrega Rápida" },
    { icon: Shield, text: "Compra Segura" },
    { icon: CreditCard, text: "10x sem juros" },
    { icon: Clock, text: "+10 Anos de Mercado" },
  ];

  return (
    <section className="bg-banner relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/30 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container relative z-10">
        <div className="py-8 md:py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Content */}
            <div className="text-center lg:text-left space-y-4 md:space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary-foreground/15 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-primary-foreground border border-primary-foreground/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                </span>
                Ofertas especiais disponíveis
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
                O melhor preço
                <br />
                <span className="text-secondary">para sua obra</span>
              </h1>

              <p className="text-base md:text-lg text-primary-foreground/85 max-w-lg mx-auto lg:mx-0">
                Encontre tudo para sua casa e construção com preços imbatíveis. 
                Qualidade garantida e entrega rápida.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold h-12 px-8 text-base shadow-lg"
                  asChild
                >
                  <Link to="/produtos" className="flex items-center gap-2">
                    Ver Ofertas
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground/50 h-12 px-8 text-base"
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
            </div>

            {/* Visual element */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative">
                {/* Decorative circles */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-72 h-72 rounded-full border-2 border-primary-foreground/10 animate-pulse" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-56 h-56 rounded-full border-2 border-secondary/30" />
                </div>
                
                {/* Center content */}
                <div className="relative w-64 h-64 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 flex items-center justify-center">
                  <div className="text-center p-6">
                    <span className="text-6xl font-bold text-secondary">10+</span>
                    <p className="text-primary-foreground text-sm mt-2">Anos de experiência</p>
                  </div>
                </div>

                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-bounce">
                  Frete Grátis*
                </div>
                <div className="absolute -bottom-2 -left-6 bg-primary-foreground text-primary px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  10x sem juros
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits bar */}
        <div className="border-t border-primary-foreground/10 py-4 md:py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center justify-center gap-2 md:gap-3 text-primary-foreground"
              >
                <benefit.icon className="w-5 h-5 md:w-6 md:h-6 text-secondary flex-shrink-0" />
                <span className="text-xs md:text-sm font-medium">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
