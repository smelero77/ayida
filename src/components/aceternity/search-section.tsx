"use client";
import { motion } from "framer-motion";
import { Search, Filter, MapPin, Calendar, Euro } from "lucide-react";
import { useState } from "react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function SearchSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [
    "Todas las categorías",
    "Innovación y Tecnología",
    "Sostenibilidad",
    "Emprendimiento",
    "Investigación",
    "Internacionalización"
  ];

  return (
    <div className="py-20 bg-white relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-500/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center mb-12"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Busca subvenciones
          </h2>
          <p className="text-xl text-gray-600">
            Encuentra las convocatorias que mejor se adapten a tu proyecto
          </p>
        </motion.div>

        {/* Search form */}
        <motion.div
          className="max-w-3xl mx-auto"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search input */}
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar por palabras clave..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Category filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 appearance-none bg-white"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search button */}
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                <Search className="w-5 h-5" />
                Buscar
              </button>
            </div>

            {/* Quick filters */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex flex-wrap gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  España
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium hover:bg-green-100 transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  Últimos 30 días
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-medium hover:bg-purple-100 transition-colors"
                >
                  <Euro className="w-4 h-4" />
                  +€100K
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Popular searches */}
        <motion.div
          className="mt-12 text-center"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          transition={{ delay: 0.4 }}
        >
          <p className="text-gray-600 mb-4">Búsquedas populares:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Innovación", "Digitalización", "Sostenibilidad", "Pymes", "I+D+i"].map((term, index) => (
              <motion.button
                key={term}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                onClick={() => setSearchTerm(term)}
              >
                {term}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 