"use client"

import { useState } from "react"
import { Star } from "lucide-react"

import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

interface RatingProps extends ComponentProps<"div"> {
  value?: number
  length?: number
  readOnly?: boolean
  onValueChange?: (value: number) => void
}

export function Rating({
  className,
  value = 0,
  length = 5,
  readOnly = false,
  onValueChange,
  ...props
}: RatingProps) {
  const [hoverValue, setHoverValue] = useState(0)

  const handleClick = (rating: number) => {
    if (!readOnly && onValueChange) {
      onValueChange(rating)
    }
  }

  const handleMouseEnter = (rating: number) => {
    if (!readOnly) {
      setHoverValue(rating)
    }
  }

  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoverValue(0)
    }
  }

  return (
    <div
      className={cn("flex gap-1", className)}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {Array.from({ length }, (_, index) => {
        const starValue = index + 1
        const filled = starValue <= (hoverValue || value)

        return (
          <Star
            key={starValue}
            className={cn(
              "h-5 w-5 cursor-pointer transition-colors",
              filled
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-200 text-gray-200"
            )}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
          />
        )
      })}
    </div>
  )
} 