import type { UserType } from "../../../types"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SecurityPreferencesForm } from "./security-preferences-form"

export function SecurityPreferences({ user }: { user: UserType }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferencias de seguridad</CardTitle>
        <CardDescription>
          Actualiza tus ajustes de seguridad para mejorar la protección de tu cuenta y gestionar las funciones de seguridad.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SecurityPreferencesForm user={user} />
      </CardContent>
    </Card>
  )
}
