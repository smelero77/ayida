// src/pages/index.tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { HeroHighlight, Highlight } from "~/components/ui/hero-highlight"
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarLogo,
  NavbarButton,
} from "~/components/ui/resizable-navbar"
import { NAVIGATION, BENEFITS, TESTIMONIALS, STEPS, ROUTES, SECTIONS } from "~/server/lib/constants"

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-white text-gray-900">
      {/* Header */}
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems items={NAVIGATION} />
          <NavbarButton href={ROUTES.SIGNIN} variant="primary">
            Iniciar sesión
          </NavbarButton>
        </NavBody>
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle isOpen={mobileMenuOpen} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
          </MobileNavHeader>
          <MobileNavMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
            {NAVIGATION.map((item) => (
              <a
                key={item.name}
                href={item.link}
                className="block px-4 py-2 text-base font-semibold hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <NavbarButton href={ROUTES.SIGNIN} variant="primary" className="mt-4">
              Iniciar sesión
            </NavbarButton>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Hero */}
      <div className="relative isolate px-6 pt-24 lg:px-8">
        <HeroHighlight>
          <div id={SECTIONS.INICIO} className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center">
            <motion.h1
              className="text-5xl font-bold tracking-tight sm:text-7xl"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            >
              aYIDA: <Highlight>subvenciones</Highlight> a la velocidad de tu idea
            </motion.h1>
            <motion.p
              className="mt-6 text-lg leading-8 text-gray-600"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }}
            >
              Descubre, filtra y solicita ayudas públicas con un solo clic. Olvida la burocracia, concéntrate en tu proyecto.
            </motion.p>
            <motion.div
              className="mt-10 flex items-center justify-center gap-x-6"
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Link
                href={ROUTES.DASHBOARD}
                className="rounded-md bg-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg
                           hover:bg-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
              >
                Despega ya
              </Link>
              <Link href={`#${SECTIONS.BENEFICIOS}`} className="text-sm font-semibold text-gray-900">
                Más detalles <span aria-hidden="true">→</span>
              </Link>
            </motion.div>
          </div>
        </HeroHighlight>
      </div>

      {/* Top blob */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-30
                     bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30
                     sm:left-[calc(50%-30rem)] sm:w-[72rem]"
          style={{ clipPath:
            "polygon(74.1% 44.1%,100% 61.6%,97.5% 26.9%,85.5% 0.1%,80.7% 2%,72.5% 32.5%,60.2% 62.4%,52.4% 68.1%,47.5% 58.3%,45.2% 34.5%,27.5% 76.7%,0.1% 64.9%,17.9% 100%,27.6% 76.8%,76.1% 97.7%,74.1% 44.1%)"
          }}
        />
      </motion.div>

      {/* Bottom blob */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2
                     bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30
                     sm:left-[calc(50%+36rem)] sm:w-[72rem]"
          style={{ clipPath:
            "polygon(74.1% 44.1%,100% 61.6%,97.5% 26.9%,85.5% 0.1%,80.7% 2%,72.5% 32.5%,60.2% 62.4%,52.4% 68.1%,47.5% 58.3%,45.2% 34.5%,27.5% 76.7%,0.1% 64.9%,17.9% 100%,27.6% 76.8%,76.1% 97.7%,74.1% 44.1%)"
          }}
        />
      </motion.div>

      {/* Beneficios */}
      <section id={SECTIONS.BENEFICIOS} className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {BENEFITS.map((b, i) => (
            <motion.div
              key={i}
              className="p-6 bg-white rounded-xl shadow"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 * i, duration: 0.6 }}
            >
              <div className="text-4xl mb-4">{b.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{b.title}</h3>
              <p className="text-gray-600">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonios */}
      <section id={SECTIONS.TESTIMONIOS} className="py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Qué dicen de aYIDA</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.blockquote
              key={i}
              className="p-6 bg-gray-100 rounded-lg italic"
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 * i, duration: 0.6 }}
            >
              "{t.text}"
              <footer className="mt-4 font-semibold text-right">— {t.name}</footer>
            </motion.blockquote>
          ))}
        </div>
      </section>

      {/* Cómo funciona */}
      <section id={SECTIONS.COMO_FUNCIONA} className="py-20 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">Cómo funciona</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          {STEPS.map((s, i) => (
            <motion.div
              key={i}
              className="text-center p-6"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 * i, duration: 0.6 }}
            >
              <div className="mx-auto mb-4 w-12 h-12 flex items-center justify-center rounded-full bg-cyan-500 text-white">
                {s.step}
              </div>
              <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-gray-600">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 text-center">
        <motion.h2
          className="text-4xl font-bold mb-6"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
        >
          Listo para despegar tu proyecto?
        </motion.h2>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Link
            href={ROUTES.DASHBOARD}
            className="px-8 py-3 bg-cyan-500 text-white font-semibold rounded-lg shadow hover:bg-cyan-600 transition"
          >
            Despega ya
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-white text-center text-gray-500">
        © {new Date().getFullYear()} aYIDA. Todos los derechos reservados.
      </footer>
    </div>
  )
}
