/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"

interface CurrentUserResult {
  session: ReturnType<typeof useSession>["data"]
  user: any | undefined
  isLoading: boolean
  error: Error | undefined
  refetch: () => void
}

export function useCurrentUser(): CurrentUserResult {
  const { data: session, status } = useSession()
  const [user, setUser] = useState<any>()
  const [error, setError] = useState<Error>()
  const [internalLoading, setInternalLoading] = useState(false)

  const fetchUser = () => {
    if (!session?.user?.id) return
    setInternalLoading(true)
    fetch("/api/user/me")
      .then((res) => res.json())
      .then((json) => {
        if (!json.success) {
          throw new Error(json.error || "Error")
        }
        setUser(json.data)
        setError(undefined)
      })
      .catch((err) => setError(err as Error))
      .finally(() => setInternalLoading(false))
  }

  useEffect(() => {
    fetchUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.id])

  return {
    session,
    user,
    isLoading: status === "loading" || internalLoading,
    error,
    refetch: fetchUser,
  }
} 