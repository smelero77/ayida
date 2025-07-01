import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { NotificationPreferencesForm } from "./notifications-preferenes-form"

export function NotificationPreferences() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferencias de notificación</CardTitle>
        <CardDescription>
          Ajusta tus preferencias para controlar qué notificaciones recibes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <NotificationPreferencesForm />
      </CardContent>
    </Card>
  )
}
