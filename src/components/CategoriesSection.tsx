import { Link } from "react-router-dom";
import { Wrench, Zap, Droplets, Paintbrush, Leaf, Hammer, ArrowRight } from "lucide-react";

const CategoriesSection = () => {
  const categories = [
    { name: "Ferramentas", icon: Hammer, color: "bg-orange-500" },
    { name: "Materiais", icon: Wrench, color: "bg-blue-500" },
    { name: "Elétrica", icon: Zap, color: "bg-yellow-500" },
    { name: "Hidráulica", icon: Droplets, color: "bg-cyan-500" },
    { name: "Pintura", icon: Paintbrush, color: "bg-purple-500" },
    { name: "Jardim", icon: Leaf, color: "bg-green-500" },
  ];

  return (
    <section className="py-8 md:py-12 bg-muted/50">
      <div className="container">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
              Navegue por Categoria
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mt-1">
              Encontre o que precisa rapidamente
            </p>
          </div>
          <Link
            to="/produtos"
            className="hidden sm:flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm transition-colors"
          >
            Ver todas
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              to="/produtos"
              className="group flex flex-col items-center gap-3 p-4 md:p-6 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-professional transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className={`w-12 h-12 md:w-14 md:h-14 ${category.color} rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                <category.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
              <span className="text-xs md:text-sm font-medium text-foreground text-center group-hover:text-primary transition-colors">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
