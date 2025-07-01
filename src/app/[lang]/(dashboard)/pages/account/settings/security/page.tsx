import type { Metadata } from "next"

import { AccountRecoveryOptions } from "./_components/account-recovery-options"
import { ChangePassword } from "./_components/change-password"
import { RecentLogs } from "./_components/recent-logs"
import { SecurityPreferences } from "./_components/security-preferences"

import { auth } from "~/server/auth"
import { db } from "~/server/db"

// Define metadata for the page
// More info: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
export const metadata: Metadata = {
  title: "Configuración de seguridad",
}

export default async function SecurityPage() {
  const session = await auth()
  const user = session?.user?.id ? await db.user.findUnique({ where: { id: session.user.id } }) : null

  return (
    <div className="grid gap-4">
      <ChangePassword />
      <SecurityPreferences user={user as any} />
      <AccountRecoveryOptions user={user as any} />
      <RecentLogs />
    </div>
  )
}
