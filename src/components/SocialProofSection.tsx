import { Star, Users, ShoppingBag, ThumbsUp } from "lucide-react";

const stats = [
  { icon: Users, value: "10+", label: "Anos de experiência" },
  { icon: ShoppingBag, value: "50.000+", label: "Produtos vendidos" },
  { icon: ThumbsUp, value: "98%", label: "Clientes satisfeitos" },
];

const testimonials = [
  {
    name: "Maria Santos",
    location: "Belém, PA",
    text: "Encontrei tudo que precisava com preços incríveis! A entrega foi super rápida e o atendimento é excelente.",
    rating: 5,
  },
  {
    name: "João Silva",
    location: "Belém, PA",
    text: "Melhor loja online que já comprei. Produtos de qualidade e o suporte me ajudou em todas as dúvidas.",
    rating: 5,
  },
  {
    name: "Ana Oliveira",
    location: "Belém, PA",
    text: "Compro há 3 anos e nunca tive problemas. Recomendo para todos os meus amigos e família!",
    rating: 5,
  },
];

const SocialProofSection = () => {
  return (
    <section className="py-16 md:py-20 bg-primary text-primary-foreground">
      <div className="container">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 mb-14 max-w-2xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-foreground/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-secondary" />
              </div>
              <div className="font-semibold text-2xl md:text-3xl text-secondary mb-1">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-primary-foreground/70">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="font-semibold text-2xl md:text-3xl mb-2">
            O que nossos clientes dizem
          </h2>
          <p className="text-primary-foreground/70">
            Mais de 25 anos garantindo a satisfação de milhares de clientes.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-primary-foreground/5 rounded-lg p-5 border border-primary-foreground/10"
            >
              <div className="flex gap-0.5 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                ))}
              </div>
              
              <p className="text-primary-foreground/90 text-sm mb-4 leading-relaxed">
                "{testimonial.text}"
              </p>
              
              <div>
                <div className="font-medium text-primary-foreground text-sm">
                  {testimonial.name}
                </div>
                <div className="text-xs text-primary-foreground/60">
                  {testimonial.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
