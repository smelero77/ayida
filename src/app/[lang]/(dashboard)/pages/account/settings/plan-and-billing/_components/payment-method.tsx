import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PaymentMethodForm } from "./payment-method-form"

export function PaymentMethod() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Método de pago</CardTitle>
        <CardDescription>
          Elige tu método de pago e introduce tus datos.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PaymentMethodForm />
      </CardContent>
    </Card>
  )
}
