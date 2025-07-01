"use client"

import { useCallback } from "react"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { Earth } from "lucide-react"

import type { DictionaryType } from "@/lib-shadboard/get-dictionary"

import { i18n } from "@/configs-shadboard/i18n"
import { relocalizePathname } from "@/lib-shadboard/i18n"
import { getDictionaryValue } from "@/lib-shadboard/utils"

import { useSettings } from "@/hooks-shadboard/use-settings"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type LocaleType = "en" | "ar"

export function LanguageDropdown({
  dictionary,
}: {
  dictionary: DictionaryType
}) {
  const pathname = usePathname()
  const params = useParams()
  const { settings, updateSettings } = useSettings()

  const locale = (params.lang as LocaleType) || "en"
  const direction = i18n.localeDirection[locale as keyof typeof i18n.localeDirection]

  const setLocale = useCallback(
    (localeName: LocaleType) => {
      updateSettings({ ...settings, locale: localeName })
    },
    [settings, updateSettings]
  )

  return (
    <DropdownMenu dir={direction}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Language">
          <Earth className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          {dictionary.navigation.language.language}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={locale}>
          {i18n.locales.map((locale) => {
            const localeName = i18n.localeNames[locale]
            const localizedLocaleName = getDictionaryValue(
              localeName,
              dictionary.navigation.language
            )

            return (
              <Link
                key={locale}
                href={relocalizePathname(pathname, locale)}
                onClick={() => setLocale(locale)}
              >
                <DropdownMenuRadioItem value={locale}>
                  {localizedLocaleName}
                </DropdownMenuRadioItem>
              </Link>
            )
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
