import { auth } from "~/server/auth"
import type { LocaleType } from "@/types"
import UserProfiles from "./_components/user-profiles"

export default async function ProfilesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params

  const session = await auth()
  if (!session?.user?.id) {
    return <div className="p-4">No autorizado</div>
  }

  return (
    <UserProfiles lang={lang as LocaleType} />
  )
} 