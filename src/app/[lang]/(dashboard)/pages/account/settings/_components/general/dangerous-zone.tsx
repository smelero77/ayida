import type { UserType } from "../../../types"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DeleteAccountForm } from "./delete-account-form"

export function DangerousZone({
  user,
  dictionary,
}: {
  user: UserType
  dictionary: any
}) {
  const t = dictionary.accountSettings.dangerousZone

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.title}</CardTitle>
        <CardDescription>{t.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <DeleteAccountForm user={user} />
      </CardContent>
    </Card>
  )
}
