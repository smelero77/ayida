import { cn } from "@/lib/utils"
import { Check, Circle, X } from "lucide-react"

import type { ComponentProps } from "react"

import { Separator } from "./separator"

export function Timeline({ className, ...props }: ComponentProps<"ul">) {
  return (
    <ul
      className={cn("grid", className)}
      {...props}
    />
  )
}

export function TimelineItem({ className, ...props }: ComponentProps<"li">) {
  return (
    <li
      className={cn("grid items-center gap-x-2 grid-cols-[0_min-content_1fr]", className)}
      {...props}
    />
  )
}

type TimelineDotStatus = "current" | "done" | "error"

interface TimelineDotProps extends ComponentProps<"div"> {
  status?: TimelineDotStatus
}

export function TimelineDot({
  className,
  status = "current",
  ...props
}: TimelineDotProps) {
  const getIcon = () => {
    switch (status) {
      case "done":
        return <Check className="h-4 w-4 bg-primary text-primary-foreground p-0.5 rounded-full" />
      case "error":
        return <X className="h-4 w-4 bg-destructive text-destructive-foreground p-0.5 rounded-full" />
      default:
        return <Circle className="h-4 w-4 fill-foreground text-foreground rounded-full" />
    }
  }

  return (
    <div
      className={cn(
        "col-start-2 col-end-3 row-start-1 row-end-1 flex justify-center items-center",
        className
      )}
      {...props}
    >
      {getIcon()}
    </div>
  )
}

export function TimelineContent({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("col-start-3 col-end-4 row-start-2 row-end-2 pb-8", className)}
      {...props}
    />
  )
}

export function TimelineHeading({ className, ...props }: ComponentProps<"h3">) {
  return (
    <h3
      className={cn("col-start-3 col-end-4 row-start-1 row-end-1 font-medium", className)}
      {...props}
    />
  )
}

export function TimelineLine({ className, done = false, ...props }: ComponentProps<typeof Separator> & { done?: boolean }) {
  return (
    <Separator
      orientation="vertical"
      className={cn(
        "col-start-2 col-end-3 row-start-2 row-end-2 mx-auto w-[2px] h-full",
        done ? "bg-foreground" : "bg-muted-foreground",
        className
      )}
      {...props}
    />
  )
} 