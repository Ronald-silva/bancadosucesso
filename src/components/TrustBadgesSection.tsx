import { Truck, Shield, CreditCard, Headphones } from "lucide-react";

const TrustBadgesSection = () => {
  const badges = [
    {
      icon: Truck,
      title: "Entrega Rápida",
      description: "Receba em poucos dias",
    },
    {
      icon: Shield,
      title: "Compra Segura",
      description: "Pagamento 100% protegido",
    },
    {
      icon: CreditCard,
      title: "Parcele em até 10x",
      description: "Sem juros no cartão",
    },
    {
      icon: Headphones,
      title: "Suporte Dedicado",
      description: "Atendimento humanizado",
    },
  ];

  return (
    <section className="py-8 md:py-10 bg-card border-y border-border">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="flex items-center gap-3 md:gap-4 p-3 md:p-4"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <badge.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm md:text-base">
                  {badge.title}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {badge.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadgesSection;
