import type { UserType } from "../../../types"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { AccountRecoveryOptionsForm } from "./account-recovery-options-form"

export function AccountRecoveryOptions({ user }: { user: UserType }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Opciones de recuperación de cuenta</CardTitle>
        <CardDescription>
          Configura y gestiona opciones de recuperación para recuperar fácilmente el acceso si olvidas tu contraseña.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AccountRecoveryOptionsForm user={user} />
      </CardContent>
    </Card>
  )
}
