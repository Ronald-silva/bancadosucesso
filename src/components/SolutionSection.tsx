import { Check, ShoppingCart, Shield, Truck, Headphones, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: ShoppingCart,
    title: "Produtos de Qualidade",
    description: "A preços acessíveis para todos",
  },
  {
    icon: Shield,
    title: "Compra Segura",
    description: "Pagamento protegido e fácil",
  },
  {
    icon: Truck,
    title: "Variedade Completa",
    description: "Tudo em uma só plataforma",
  },
  {
    icon: Headphones,
    title: "Suporte Personalizado",
    description: "Atendimento quando precisar",
  },
  {
    icon: Gift,
    title: "Benefícios Exclusivos",
    description: "Prêmios e ofertas especiais",
  },
];

const SolutionSection = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block px-4 py-2 bg-success/10 text-success rounded-full text-sm font-semibold mb-4">
            A SOLUÇÃO
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
            É hora de <span className="text-gradient-gold">aproveitar</span> a melhor opção!
          </h2>
          <p className="text-lg text-muted-foreground font-body">
            A <span className="font-bold text-primary">Banca do Sucesso</span> é a loja online 
            mais completa e barata do Brasil, com opções para todos os gostos e necessidades.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-6 bg-card rounded-2xl border border-border hover:border-success/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-success/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-success" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-foreground mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm font-body">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="cta" size="xl">
            <Check className="w-5 h-5" />
            QUERO APROVEITAR AGORA
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
