"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import type { LocaleType } from "@/types"

import { linksData } from "../../_data/nav-list-links"

import { ensureLocalizedPathname } from "@/lib/i18n"
import { cn } from "@/lib/utils"

export function NavList({
  navDict,
  locale,
}: {
  navDict: Record<string, string>
  locale: LocaleType
}) {
  const pathname = usePathname()

  return (
    <nav className="flex flex-wrap gap-4 text-sm text-muted-foreground md:flex-col">
      {linksData.map((link) => {
        const localizedPathname = ensureLocalizedPathname(link.href, locale)
        const title = navDict[link.key]

        return (
          <Link
            key={link.key}
            href={localizedPathname}
            className={cn(
              pathname === localizedPathname && "font-semibold text-primary"
            )}
            aria-current={pathname === localizedPathname ? "page" : undefined}
          >
            {title}
          </Link>
        )
      })}
    </nav>
  )
}
