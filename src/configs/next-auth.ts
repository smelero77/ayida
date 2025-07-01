import { PrismaAdapter } from "@auth/prisma-adapter"
import type { Adapter } from "next-auth/adapters"
import CredentialsProvider from "next-auth/providers/credentials"

import { db } from "@/lib/prisma"

// Configuration for NextAuth with custom adapters and providers
// NextAuth.js documentation: https://next-auth.js.org/getting-started/introduction
export const authOptions = {
  // Use Prisma adapter for database interaction
  // More info: https://next-auth.js.org/getting-started/adapter
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      // Custom authorize function to validate user credentials
      async authorize(credentials) {
        if (!credentials) return null

        try {
          // Authenticate the user by sending credentials to an external API
          // Refer to the NextAuth.js documentation for handling custom sign-in flows:
          // https://next-auth.js.org/providers/credentials
          const res = await fetch(`${process.env.API_URL}/auth/sign-in`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          })

          const payload = await res.json()

          // Throw error if the response status indicates a failure
          if (res.status >= 400) {
            throw new Error(payload?.message ?? "An unknown error occurred.")
          }

          return payload // Return user data on successful authentication
        } catch (e: unknown) {
          // Handle errors and provide appropriate error message
          throw new Error(
            e instanceof Error ? e.message : "An unknown error occurred."
          )
        }
      },
    }),
  ],
  pages: {
    signIn: "/es/signin", // Custom sign-in page
  },
  session: {
    strategy: "jwt" as const, // Use JWT strategy for sessions
    maxAge: 30 * 24 * 60 * 60, // Set session expiration to 30 days
    // More info on session strategies: https://next-auth.js.org/getting-started/options#session
  },
  callbacks: {
    // Callback to redirect after successful sign in
    async redirect() {
      // Always redirect to the analytics dashboard after successful login
      return "/es/dashboards/analytics"
    },
  },
}
