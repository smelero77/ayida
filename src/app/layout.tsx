import type { ReactNode } from "react"
import "../styles/globals.css"

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body suppressHydrationWarning className="overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
