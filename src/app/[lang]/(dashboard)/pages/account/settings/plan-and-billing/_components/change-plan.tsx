import { plansData } from "../../../_data/plans"
import { subscriptionsData } from "../../../_data/subscriptions"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChangePlanForm } from "./change-plan-form"

export function ChangePlan() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cambiar plan</CardTitle>
        <CardDescription>
          Elige el plan que mejor se adapte a tus necesidades. Los precios mostrados son por mes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChangePlanForm plans={plansData} subscriptions={subscriptionsData} />
      </CardContent>
    </Card>
  )
}
