"use client";
import { 
  Heart, 
  Palette, 
  Building2, 
  Laptop, 
  Users, 
  Rocket, 
  Zap, 
  FlaskConical 
} from "lucide-react";

export default function Categories() {
  return (
    <section id="categories" className="py-20 bg-slate-950">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-4">
          8 categorías de <span className="text-zetika-green">ayudas</span> disponibles
        </h2>
        <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
          Encuentra exactamente lo que necesitas entre más de 47.000 ayudas organizadas por sectores
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className="group relative p-6 rounded-xl bg-slate-900/50 hover:bg-slate-800/70 transition-all duration-300 border border-slate-700/50 hover:border-zetika-green/50 cursor-pointer"
            >
              <div className="w-12 h-12 bg-zetika-green/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-zetika-green/30 transition-colors">
                {category.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2 text-center">
                {category.title}
              </h3>
              <p className="text-gray-400 text-sm text-center">
                {category.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-zetika-green/10 hover:bg-zetika-green/20 text-zetika-green border border-zetika-green/30 px-6 py-3 rounded-lg font-medium transition-colors">
            Ver todas las categorías
          </button>
        </div>
      </div>
    </section>
  );
}

const categories = [
  {
    title: "Acción Social",
    description: "Desempleados, igualdad, discapacidad",
    icon: <Heart className="w-6 h-6 text-zetika-green" />,
  },
  {
    title: "Cultura",
    description: "Artes escénicas, videojuegos, patrimonio",
    icon: <Palette className="w-6 h-6 text-zetika-green" />,
  },
  {
    title: "Desarrollo Económico",
    description: "Comercio, turismo, desarrollo rural",
    icon: <Building2 className="w-6 h-6 text-zetika-green" />,
  },
  {
    title: "Digitalización",
    description: "Consultoría digital, marketing digital",
    icon: <Laptop className="w-6 h-6 text-zetika-green" />,
  },
  {
    title: "Empleo",
    description: "Formación, nuevas contrataciones",
    icon: <Users className="w-6 h-6 text-zetika-green" />,
  },
  {
    title: "Emprendimiento",
    description: "Startups, proyectos innovadores",
    icon: <Rocket className="w-6 h-6 text-zetika-green" />,
  },
  {
    title: "Energías Renovables",
    description: "Fotovoltaica, movilidad eléctrica",
    icon: <Zap className="w-6 h-6 text-zetika-green" />,
  },
  {
    title: "I+D+i",
    description: "Investigación, desarrollo, innovación",
    icon: <FlaskConical className="w-6 h-6 text-zetika-green" />,
  },
]; 