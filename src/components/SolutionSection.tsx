import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  "Produtos de qualidade a preços acessíveis",
  "Compra segura com pagamento protegido",
  "Variedade completa em um só lugar",
  "Suporte dedicado quando precisar",
  "Benefícios e ofertas exclusivas",
];

const SolutionSection = () => {
  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-sm font-medium text-secondary-foreground mb-2 uppercase tracking-wide">
            A solução
          </p>
          <h2 className="font-semibold text-2xl md:text-3xl text-foreground mb-4">
            Conheça a <span className="text-secondary">Banca do Sucesso</span>
          </h2>
          <p className="text-muted-foreground">
            A loja online mais completa e acessível do Brasil, com opções para todos os gostos.
          </p>
        </div>

        <div className="max-w-xl mx-auto mb-10">
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li 
                key={index}
                className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border"
              >
                <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-primary-foreground" />
                </div>
                <span className="text-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center">
          <Button variant="cta" size="lg" asChild>
            <a 
              href="https://wa.me/559182750788" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Quero aproveitar
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
