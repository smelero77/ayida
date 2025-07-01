import Link from "next/link"

import { cn } from "@/lib/utils"

import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { RecentLogsTable } from "./recent-logs-table"

export function RecentLogs() {
  return (
    <Card>
      <CardHeader className="flex-row justify-between items-center gap-x-3 space-y-0">
        <div className="space-y-1.5">
          <CardTitle>Registros recientes</CardTitle>
          <CardDescription>
            Consulta la actividad reciente de tu cuenta. Comprueba si hay acciones inusuales o sospechosas.
          </CardDescription>
        </div>
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "link" }), "size-fit p-0")}
        >
          Ver todo
        </Link>
      </CardHeader>
      <CardContent>
        <RecentLogsTable />
      </CardContent>
    </Card>
  )
}
