import { NotFound404 } from "@/components-shadboard/pages/not-found-404"
import { i18n } from "@/configs-shadboard-new/i18n"
import type { LocaleType } from "@/types"

interface PageProps {
  params: {
    lang: LocaleType
  }
}

export default function NotFound404Page({ params }: PageProps) {
  const { lang } = params
  return <NotFound404 />
}

export function generateStaticParams() {
  return i18n.locales.map((loc) => ({ lang: loc }))
} 