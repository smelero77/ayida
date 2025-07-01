import { Unauthorized401 } from "@/components-shadboard/pages/unauthorized-401"
import { i18n } from "@/configs-shadboard-new/i18n"
import type { LocaleType } from "@/types"

interface PageProps {
  params: {
    lang: LocaleType
  }
}

export default function Unauthorized401Page({ params }: PageProps) {
  const { lang } = params
  return <Unauthorized401 locale={lang} />
}

export function generateStaticParams() {
  return i18n.locales.map((loc) => ({ lang: loc }))
} 