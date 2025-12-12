import { ShieldCheck, RefreshCw, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const GuaranteeSection = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-card">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Guarantee badge */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-32 h-32 md:w-40 md:h-40 bg-success/10 rounded-full flex items-center justify-center">
                    <ShieldCheck className="w-16 h-16 md:w-20 md:h-20 text-success" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-success text-success-foreground rounded-full p-2">
                    <RefreshCw className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Guarantee content */}
              <div className="flex-1 text-center md:text-left">
                <span className="inline-block px-4 py-2 bg-success/10 text-success rounded-full text-sm font-semibold mb-4">
                  GARANTIA TOTAL
                </span>
                
                <h2 className="font-display font-bold text-2xl md:text-3xl lg:text-4xl text-foreground mb-4">
                  Sua satisfação é nossa <span className="text-success">prioridade</span>
                </h2>
                
                <p className="text-lg text-muted-foreground mb-6 font-body">
                  Se você não estiver satisfeito com a sua experiência em nossa loja, 
                  não precisará de uma palavra de explicação. Vamos oferecer um novo produto 
                  ou um <span className="font-bold text-foreground">reembolso integral</span> da sua compra. 
                  Assim é o serviço que oferecemos.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Button variant="cta" size="lg">
                    COMPRAR COM GARANTIA
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuaranteeSection;
