/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client"

import { useCurrentUser } from "@/hooks/use-current-user"

import { ProfileContentIntroItem } from "./profile-content-info-intro-item"

export function ProfileContentIntroList() {
  const { user } = useCurrentUser()

  const location = user?.province ? `${user.province}, ${user.city ?? ""}` : user?.city

  return (
    <ul className="grid gap-y-3">
      <ProfileContentIntroItem
        title="Works as a"
        value={
          <>
            {user?.role} <span className="text-foreground"> at </span>{" "}
            {user?.organization}
          </>
        }
        iconName="BriefcaseBusiness"
      />
      <ProfileContentIntroItem
        title="Lives in"
        value={location}
        iconName="House"
      />

      <ProfileContentIntroItem
        title="Email"
        value={user?.email}
        iconName="Mail"
      />

      <ProfileContentIntroItem
        title="Phone Number"
        value={user?.phoneNumber}
        iconName="Phone"
      />
      <ProfileContentIntroItem
        title="Language"
        value={user?.language}
        iconName="Languages"
      />
    </ul>
  )
}
