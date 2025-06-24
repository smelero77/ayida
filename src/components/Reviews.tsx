"use client";

export default function Reviews() {
  return (
    <section id="testimonials" className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-4">
          Empresas que <span className="text-zetika-green">confían en ZÉTIKA</span>
        </h2>
        <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
          Desde emprendedores hasta gestores profesionales, todos encuentran en ZÉTIKA la solución perfecta
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-slate-800/50 p-8 rounded-xl border border-slate-700/50 hover:border-zetika-green/30 transition-colors">
              <div className="mb-6">
                <span className="bg-zetika-green/20 text-zetika-green px-3 py-1 rounded-full text-xs font-medium">
                  {testimonial.type}
                </span>
              </div>
              <p className="text-gray-300 mb-6 italic text-lg leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-zetika-green rounded-full flex items-center justify-center mr-4">
                  <span className="text-slate-900 font-bold">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-gray-400">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    quote: "ZÉTIKA revolucionó nuestra consultora. Gestionamos 300% más proyectos con la misma eficiencia. El ERP de subvenciones es imprescindible.",
    name: "María López",
    title: "Directora de Subvenciones Pro",
    type: "GESTOR PROFESIONAL",
  },
  {
    quote: "El sistema de marca blanca nos permitió ofrecer búsqueda de subvenciones a nuestros 500+ clientes. La integración fue perfecta.",
    name: "Carlos Ruiz",
    title: "CTO de InnovaTech Solutions",
    type: "EMPRESA TECNOLÓGICA",
  },
  {
    quote: "En 2 semanas encontré y solicité 3 subvenciones relevantes para mi startup. Sin ZÉTIKA habría tardado meses. La IA es increíble.",
    name: "Ana García",
    title: "Fundadora de EcoStart",
    type: "EMPRENDEDORA",
  },
];
