import { ChatBox } from "../_components/chat-box"
import { ChatBoxPlaceholder } from "../_components/chat-box-placeholder"

import { auth } from "~/server/auth"
import { db } from "~/server/db"

export default async function ChatBoxPage(props: {
  params: Promise<{ id: string[] }>
}) {
  const params = await props.params
  const chatIdParam = params.id?.[0]

  // If no chat is selected, show a placeholder UI
  if (!chatIdParam) return <ChatBoxPlaceholder />

  const session = await auth()
  const dbUser = session?.user?.id
    ? await db.user.findUnique({ where: { id: session.user.id } })
    : null

  const user = dbUser
    ? { id: dbUser.id, name: dbUser.name ?? "", avatar: dbUser.image ?? undefined, status: "ONLINE" }
    : { id: "", name: "", avatar: undefined, status: "OFFLINE" }

  return <ChatBox user={user} />
}
