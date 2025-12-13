import { XCircle, DollarSign, Search } from "lucide-react";

const problems = [
  {
    icon: DollarSign,
    title: "Gastando demais",
    description: "Preços altos que pesam no bolso e comprometem o orçamento",
  },
  {
    icon: Search,
    title: "Sem opções",
    description: "Falta de variedade e produtos de qualidade acessíveis",
  },
];

const ProblemSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-2 bg-destructive/10 text-destructive rounded-full text-sm font-semibold mb-4">
            O PROBLEMA
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
            Você está <span className="text-destructive">cansado</span> de...
          </h2>
          <p className="text-lg text-muted-foreground font-body">
            Procurar por produtos em lojas físicas, perdendo tempo e dinheiro em trânsito? 
            Sentir-se frustrado com a falta de opções e preços acessíveis?
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((problem, index) => (
            <div 
              key={index}
              className="group relative p-8 bg-card rounded-2xl border-2 border-border hover:border-destructive/30 transition-all duration-300 shadow-card hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute -top-4 -right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <XCircle className="w-8 h-8 text-destructive" />
              </div>
              <div className="w-14 h-14 bg-destructive/10 rounded-xl flex items-center justify-center mb-5">
                <problem.icon className="w-7 h-7 text-destructive" />
              </div>
              <h3 className="font-display font-bold text-xl text-foreground mb-3">
                {problem.title}
              </h3>
              <p className="text-muted-foreground font-body">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
