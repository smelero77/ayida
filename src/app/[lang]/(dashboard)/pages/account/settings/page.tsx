import type { Metadata } from "next"

import type { LocaleType } from "@/types"
import { getDictionary } from "@/lib-shadboard-new/get-dictionary"

import { auth } from "~/server/auth"
import { db } from "~/server/db"

import { DangerousZone } from "./_components/general/dangerous-zone"
import { ProfileInfo } from "./_components/general/profile-info"

// Metadata will be translated via dictionary inside component if necessary

export default async function ProfileInfoPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dictionary = await getDictionary(lang as LocaleType)

  const session = await auth()
  const user = session?.user?.id ? await db.user.findUnique({ where: { id: session.user.id } }) : null

  return (
    <div className="grid gap-4">
      <ProfileInfo user={user ?? undefined} dictionary={dictionary as any} />
      <DangerousZone user={user ?? undefined} dictionary={dictionary as any} />
    </div>
  )
}
