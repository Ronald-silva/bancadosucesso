const problems = [
  {
    title: "Preços altos",
    description: "Produtos que pesam no bolso e comprometem seu orçamento mensal.",
  },
  {
    title: "Falta de variedade",
    description: "Dificuldade em encontrar produtos de qualidade com bom custo-benefício.",
  },
];

const ProblemSection = () => {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wide">
            O problema
          </p>
          <h2 className="font-semibold text-2xl md:text-3xl text-foreground mb-4">
            Você está cansado de...
          </h2>
          <p className="text-muted-foreground">
            Procurar por produtos e não encontrar opções que cabem no seu bolso?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {problems.map((problem, index) => (
            <div 
              key={index}
              className="p-6 bg-muted/50 rounded-lg border border-border"
            >
              <h3 className="font-medium text-foreground mb-2">
                {problem.title}
              </h3>
              <p className="text-sm text-muted-foreground">
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
