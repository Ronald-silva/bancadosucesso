import { Star, Quote, Users, ShoppingBag, ThumbsUp } from "lucide-react";

const stats = [
  { icon: Users, value: "10+", label: "Anos de Experiência" },
  { icon: ShoppingBag, value: "50.000+", label: "Produtos Vendidos" },
  { icon: ThumbsUp, value: "98%", label: "Clientes Satisfeitos" },
];

const testimonials = [
  {
    name: "Maria Santos",
    location: "São Paulo, SP",
    text: "Encontrei tudo que precisava com preços incríveis! A entrega foi super rápida e o atendimento é excelente.",
    rating: 5,
  },
  {
    name: "João Silva",
    location: "Rio de Janeiro, RJ",
    text: "Melhor loja online que já comprei. Produtos de qualidade e o suporte me ajudou em todas as dúvidas.",
    rating: 5,
  },
  {
    name: "Ana Oliveira",
    location: "Belo Horizonte, MG",
    text: "Compro há 3 anos e nunca tive problemas. Recomendo para todos os meus amigos e família!",
    rating: 5,
  },
];

const SocialProofSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-hero text-primary-foreground">
      <div className="container">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 md:gap-12 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-secondary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-7 h-7 md:w-8 md:h-8 text-secondary" />
              </div>
              <div className="font-display font-black text-3xl md:text-5xl text-secondary mb-2">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-primary-foreground/80">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
            O que nossos <span className="text-gradient-gold">clientes</span> dizem
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto font-body">
            Mais de 10 anos de experiência garantindo a satisfação de milhares de clientes em todo o Brasil.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-primary-foreground/20"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                ))}
              </div>
              
              <Quote className="w-8 h-8 text-secondary/50 mb-4" />
              
              <p className="text-primary-foreground/90 mb-6 font-body leading-relaxed">
                "{testimonial.text}"
              </p>
              
              <div>
                <div className="font-display font-bold text-primary-foreground">
                  {testimonial.name}
                </div>
                <div className="text-sm text-primary-foreground/60">
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
