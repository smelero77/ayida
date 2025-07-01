import type { Metadata } from "next"

import { getDictionary } from "@/lib/get-dictionary"

export const metadata: Metadata = {
  title: "Email App",
  description: "Email application interface",
}

export default async function EmailPage({
  params: { lang },
}: {
  params: { lang: string }
}) {
  const dictionary = await getDictionary(lang)

  return (
    <div className="flex flex-col gap-4 p-4 pt-0">
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-medium">Email</h3>
          <p className="text-sm text-muted-foreground">
            Manage your email communications
          </p>
        </div>
        <div className="flex items-center justify-center h-96 border-2 border-dashed border-muted-foreground/25 rounded-lg">
          <div className="text-center">
            <p className="text-muted-foreground">Email interface coming soon</p>
            <p className="text-sm text-muted-foreground/75">
              This will include inbox, compose, and email management features
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 