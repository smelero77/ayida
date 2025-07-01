import type { ReactNode } from "react"

import { getDictionary } from "@/lib-shadboard-new/get-dictionary"
import type { LocaleType } from "@/types"

import { NavList } from "./_components/nav-list"

export default async function SettingsLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dictionary: any = await getDictionary(lang as LocaleType)
  const navDict = dictionary.accountSettings.nav as Record<string, string>

  return (
    <div className="container grid w-full items-start gap-6 p-4 md:grid-cols-[180px_1fr]">
      <div className="grid gap-6">
        <h1 className="text-3xl font-semibold">{navDict.general}</h1>
        <NavList navDict={navDict} locale={lang as LocaleType} />
      </div>
      <div className="grid gap-6">{children}</div>
    </div>
  )
}
