import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

const SeparatorWithText = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & {
    text?: string
    textClassName?: string
    orientation?: "horizontal" | "vertical"
  }
>(({ className, text, textClassName, orientation = "horizontal", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex items-center",
      orientation === "horizontal" ? "w-full" : "h-full flex-col",
      className
    )}
    {...props}
  >
    <div className={cn(
      "bg-border",
      orientation === "horizontal" ? "h-[1px] flex-1" : "w-[1px] flex-1"
    )} />
    {text && (
      <div className={cn(
        "bg-background px-3 text-sm text-muted-foreground",
        orientation === "horizontal" ? "mx-3" : "my-3",
        textClassName
      )}>
        {text}
      </div>
    )}
    <div className={cn(
      "bg-border",
      orientation === "horizontal" ? "h-[1px] flex-1" : "w-[1px] flex-1"
    )} />
  </div>
))
SeparatorWithText.displayName = "SeparatorWithText"

export { Separator, SeparatorWithText }
