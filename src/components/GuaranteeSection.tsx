import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const GuaranteeSection = () => {
  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-lg border border-border p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              {/* Guarantee icon */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                  <ShieldCheck className="w-10 h-10 text-primary" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                  Garantia total
                </p>
                
                <h2 className="font-semibold text-xl md:text-2xl text-foreground mb-3">
                  Sua satisfação é nossa prioridade
                </h2>
                
                <p className="text-muted-foreground text-sm mb-5">
                  Se você não estiver satisfeito com sua experiência, oferecemos um novo produto 
                  ou reembolso integral da sua compra. Sem complicações.
                </p>

                <Button variant="cta" size="lg" asChild>
                  <a 
                    href="https://wa.me/559182750788" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Comprar com garantia
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuaranteeSection;
