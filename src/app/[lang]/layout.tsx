import { Cairo, Lato } from "next/font/google"
import { Providers } from "@/providers"
import { i18n } from "@/configs-shadboard-new/i18n"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"
import type { LocaleType } from "@/types"

// Define fonts for the application
const latoFont = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-lato",
})
const cairoFont = Cairo({
  subsets: ["arabic"],
  weight: ["400", "700"],
  style: ["normal"],
  variable: "--font-cairo",
})

export default async function LangLayout({ 
  children, 
  params 
}: { 
  children: ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params;
  const direction = i18n.localeDirection[lang as LocaleType]

  return (
    <div
      className={cn(
        "[&:lang(en)]:font-lato [&:lang(ar)]:font-cairo", // Set font styles based on the language
        "flex flex-col flex-1 w-full",
        "bg-background text-foreground antialiased overscroll-none", // Set background, text, anti-aliasing styles, and overscroll behavior
        latoFont.variable, // Include Lato font variable
        cairoFont.variable // Include Cairo font variable
      )}
      lang={lang}
      dir={direction}
    >
      <Providers 
        session={null} 
        locale={lang as LocaleType} 
        direction={direction}
      >
        {children}
      </Providers>
    </div>
  )
} 