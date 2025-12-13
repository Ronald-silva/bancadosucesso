import { TrendingDown, CreditCard, Truck, HeadphonesIcon, Award } from "lucide-react";

const benefits = [
  {
    icon: TrendingDown,
    title: "Preços Mais Baixos",
    description: "Economize mais do que nas lojas físicas, com os melhores preços do mercado online.",
    highlight: "Até 70% OFF",
  },
  {
    icon: CreditCard,
    title: "Pagamento Flexível",
    description: "Várias opções de pagamento seguras: PIX, cartão, boleto e parcelamento sem juros.",
    highlight: "10x sem juros",
  },
  {
    icon: Truck,
    title: "Envio Rápido",
    description: "Entrega confiável e rastreável para todo o Brasil com prazos que você pode contar.",
    highlight: "Frete grátis*",
  },
  {
    icon: HeadphonesIcon,
    title: "Suporte 10/6",
    description: "Nossa equipe está disponível 10 horas por dia, 6 dias por semana para te ajudar.",
    highlight: "Sempre online",
  },
  {
    icon: Award,
    title: "Qualidade Garantida",
    description: "Produtos selecionados com garantia de satisfação ou seu dinheiro de volta.",
    highlight: "100% garantido",
  },
];

const BenefitsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block px-4 py-2 bg-secondary/20 text-secondary-foreground rounded-full text-sm font-semibold mb-4">
            BENEFÍCIOS EXCLUSIVOS
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
            Por que escolher a <span className="text-gradient-gold">Banca do Sucesso</span>?
          </h2>
        </div>

        <div className="grid gap-6">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="group flex flex-col md:flex-row items-start md:items-center gap-6 p-6 md:p-8 bg-card rounded-2xl border border-border hover:border-secondary/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <benefit.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              
              <div className="flex-1">
                <h3 className="font-display font-bold text-xl md:text-2xl text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground font-body">
                  {benefit.description}
                </p>
              </div>

              <div className="md:text-right">
                <span className="inline-block px-4 py-2 bg-secondary/20 text-secondary-foreground rounded-lg font-display font-bold text-sm">
                  {benefit.highlight}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
