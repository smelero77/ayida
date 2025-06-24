"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Zap, ArrowRight } from "lucide-react"

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string
    link: string
    icon?: JSX.Element
  }[]
  className?: string
}) => {
  const [visible, setVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    let lastScrollY = window.scrollY

    const updateScrollDirection = () => {
      const scrollY = window.scrollY

      // Actualizar si está scrolleado
      setScrolled(scrollY > 20)

      // El menú siempre debe ser visible
      setVisible(true)

      lastScrollY = scrollY > 0 ? scrollY : 0
    }

    window.addEventListener("scroll", updateScrollDirection)
    return () => window.removeEventListener("scroll", updateScrollDirection)
  }, [visible])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: 0,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className={cn(
          "flex fixed top-4 inset-x-0 mx-auto z-[5000] items-center justify-between transition-all duration-300",
          scrolled
            ? "max-w-fit border border-neutral-200 dark:border-neutral-700 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-lg px-4 py-2"
            : "max-w-7xl bg-transparent px-6 py-4",
          className,
        )}
      >
        <motion.div
          className="flex items-center space-x-2"
          animate={{
            scale: scrolled ? 0.9 : 1,
          }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">StreamLine</span>
        </motion.div>

        <motion.div
          className="hidden md:flex items-center space-x-6"
          animate={{
            scale: scrolled ? 0.95 : 1,
            opacity: scrolled ? 0.9 : 1,
          }}
          transition={{ duration: 0.8 }}
        >
          {navItems.map((navItem, idx) => (
            <Link
              key={`link-${idx}`}
              href={navItem.link}
              className={cn(
                "relative items-center flex space-x-1 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors text-sm font-medium",
              )}
            >
              <span className="block sm:hidden">{navItem.icon}</span>
              <span>{navItem.name}</span>
            </Link>
          ))}
        </motion.div>

        <motion.div
          className="hidden md:flex items-center space-x-2"
          animate={{
            scale: scrolled ? 0.9 : 1,
          }}
          transition={{ duration: 0.8 }}
        >
          <Button variant="ghost" size={scrolled ? "sm" : "default"}>
            Sign In
          </Button>
          <Button size={scrolled ? "sm" : "default"} className="rounded-full">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>

        <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 mx-4 md:hidden bg-white/95 dark:bg-black/95 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                {navItems.map((navItem, idx) => (
                  <Link
                    key={`mobile-link-${idx}`}
                    href={navItem.link}
                    className="flex items-center space-x-3 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {navItem.icon}
                    <span className="font-medium">{navItem.name}</span>
                  </Link>
                ))}
                <div className="border-t border-neutral-200 dark:border-neutral-800 pt-4 space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    Sign In
                  </Button>
                  <Button className="w-full rounded-full">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  )
}
