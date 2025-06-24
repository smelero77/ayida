"use client"

import { FloatingNav } from "@/components/floating-navbar"
import HeroSection from "@/components/aceternity/hero-section"
import FeaturesSection from "@/components/aceternity/features-section"
import TestimonialsSection from "@/components/aceternity/testimonials-section"
import PricingSection from "@/components/aceternity/pricing-section"
import CTASection from "@/components/aceternity/cta-section"
import { Home, Zap, MessageSquare, DollarSign, Users } from "lucide-react"

const navItems = [
  {
    name: "Inicio",
    link: "#home",
    icon: <Home className="h-4 w-4" />,
  },
  {
    name: "Características",
    link: "#features",
    icon: <Zap className="h-4 w-4" />,
  },
  {
    name: "Testimonios",
    link: "#testimonials",
    icon: <MessageSquare className="h-4 w-4" />,
  },
  {
    name: "Precios",
    link: "#pricing",
    icon: <DollarSign className="h-4 w-4" />,
  },
  {
    name: "Contacto",
    link: "#contact",
    icon: <Users className="h-4 w-4" />,
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <FloatingNav navItems={navItems} />

      <main>
        <section id="home">
          <HeroSection />
        </section>
        <section id="features">
          <FeaturesSection />
        </section>
        <section id="testimonials">
          <TestimonialsSection />
        </section>
        <section id="pricing">
          <PricingSection />
        </section>
        <section id="contact">
          <CTASection />
        </section>
      </main>
    </div>
  )
}
