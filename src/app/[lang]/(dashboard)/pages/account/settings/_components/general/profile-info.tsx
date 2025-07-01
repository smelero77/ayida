/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { UserType } from "../../../types"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ProfileInfoForm } from "./profile-info-form"

export function ProfileInfo({
  user,
  dictionary,
}: {
  user: UserType
  dictionary: any
}) {
  const t = dictionary.accountSettings.profileInfo

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.title}</CardTitle>
        <CardDescription>{t.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ProfileInfoForm user={user} dictionary={dictionary} />
      </CardContent>
    </Card>
  )
}
