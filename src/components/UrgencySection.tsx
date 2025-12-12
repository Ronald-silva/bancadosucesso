import { Button } from "@/components/ui/button";
import { Zap, AlertTriangle, Clock } from "lucide-react";

const UrgencySection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="relative max-w-4xl mx-auto">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-cta opacity-20 blur-3xl rounded-full" />
          
          <div className="relative bg-card rounded-3xl border-2 border-secondary shadow-glow p-8 md:p-12 text-center overflow-hidden">
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-secondary/10 rounded-br-full" />
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-secondary/10 rounded-tl-full" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-6">
                <AlertTriangle className="w-6 h-6 text-destructive animate-pulse" />
                <span className="text-destructive font-display font-bold text-sm md:text-base uppercase tracking-wider">
                  Oferta Limitada
                </span>
                <AlertTriangle className="w-6 h-6 text-destructive animate-pulse" />
              </div>

              <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
                Não perca a chance de aproveitar os
                <span className="text-gradient-gold block mt-2">MELHORES PREÇOS!</span>
              </h2>

              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 font-body">
                A Banca do Sucesso oferece essa oportunidade única por tempo limitado. 
                <span className="font-bold text-foreground"> Aproveite já antes que acabe!</span>
              </p>

              {/* Countdown-style urgency */}
              <div className="flex justify-center gap-4 mb-8">
                <div className="bg-primary rounded-xl p-4 min-w-[80px]">
                  <div className="font-display font-black text-2xl md:text-3xl text-primary-foreground animate-countdown">
                    24
                  </div>
                  <div className="text-xs text-primary-foreground/80 uppercase">Horas</div>
                </div>
                <div className="bg-primary rounded-xl p-4 min-w-[80px]">
                  <div className="font-display font-black text-2xl md:text-3xl text-primary-foreground animate-countdown">
                    59
                  </div>
                  <div className="text-xs text-primary-foreground/80 uppercase">Minutos</div>
                </div>
                <div className="bg-primary rounded-xl p-4 min-w-[80px]">
                  <div className="font-display font-black text-2xl md:text-3xl text-primary-foreground animate-countdown">
                    59
                  </div>
                  <div className="text-xs text-primary-foreground/80 uppercase">Segundos</div>
                </div>
              </div>

              <Button variant="hero" size="xl" className="group mb-4">
                <Zap className="w-6 h-6 group-hover:animate-shake" />
                ACESSAR AGORA MESMO
              </Button>

              <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                <Clock className="w-4 h-4" />
                Oferta válida enquanto durarem os estoques
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UrgencySection;
