import { TrendingDown, CreditCard, Truck, HeadphonesIcon, Award } from "lucide-react";

const benefits = [
  {
    icon: TrendingDown,
    title: "Preços baixos",
    description: "Economize com os melhores preços do mercado online.",
    highlight: "Até 70% OFF",
  },
  {
    icon: CreditCard,
    title: "Pagamento flexível",
    description: "PIX, cartão, boleto e parcelamento sem juros.",
    highlight: "10x sem juros",
  },
  {
    icon: Truck,
    title: "Envio rápido",
    description: "Entrega confiável e rastreável para todo o Brasil.",
    highlight: "Frete grátis*",
  },
  {
    icon: HeadphonesIcon,
    title: "Suporte 10/6",
    description: "Nossa equipe está disponível 10 horas por dia, 6 dias por semana para te ajudar.",
    highlight: "Atendimento dedicado",
  },
  {
    icon: Award,
    title: "Qualidade garantida",
    description: "Satisfação garantida.",
    highlight: "100% garantido",
  },
];

const BenefitsSection = () => {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wide">
            Benefícios
          </p>
          <h2 className="font-semibold text-2xl md:text-3xl text-foreground">
            Por que escolher a <span className="text-secondary">Banca do Sucesso</span>?
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="p-5 bg-card rounded-lg border border-border hover:border-secondary/50 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground mb-1">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {benefit.description}
                  </p>
                  <span className="text-xs font-medium text-secondary">
                    {benefit.highlight}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
