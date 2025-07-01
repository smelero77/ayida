import * as React from "react"
import { Check, ChevronDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export interface SelectOption {
  value: string
  label: string
}

interface MultiSelectProps {
  options: SelectOption[]
  value: string[]
  onValueChange: (val: string[]) => void
  placeholder?: string
  maxCount?: number
  className?: string
  selectAllText?: string
  clearText?: string
  closeText?: string
}

export function MultiSelect({
  options,
  value,
  onValueChange,
  placeholder = "Select options",
  maxCount = 3,
  selectAllText = "Select All",
  clearText = "Clear",
  closeText = "Close",
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const toggleOption = (v: string) => {
    if (value.includes(v)) {
      onValueChange(value.filter((x) => x !== v))
    } else {
      onValueChange([...value, v])
    }
  }

  return (
    <Popover modal open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          className={cn("justify-between w-full h-10 px-3 py-2", className)}
        >
          {value.length === 0 ? (
            <span className="text-muted-foreground">{placeholder}</span>
          ) : (
            <div className="flex flex-wrap gap-1 max-w-full text-start">
              {value.slice(0, maxCount).map((v) => {
                const opt = options.find((o) => o.value === v)
                return (
                  <Badge key={v} className="px-2 py-0.5">
                    {opt?.label ?? v}
                    <X
                      className="ms-1 size-3 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleOption(v)
                      }}
                    />
                  </Badge>
                )
              })}
              {value.length > maxCount && (
                <Badge variant="secondary" className="px-2 py-0.5">
                  +{value.length - maxCount}
                </Badge>
              )}
            </div>
          )}
          <ChevronDown className="ms-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]" align="start">
        <Command>
          <CommandInput placeholder="Search..." className="h-9" />
          <CommandList>
            <CommandEmpty>No results.</CommandEmpty>
            <CommandGroup className="max-h-52 overflow-auto">
              <CommandItem
                key="__all__"
                onSelect={() => {
                  if (value.length === options.length) {
                    onValueChange([])
                  } else {
                    onValueChange(options.map((o) => o.value))
                  }
                }}
                className="cursor-pointer"
              >
                <div
                  className={cn(
                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                    value.length === options.length &&
                      "bg-primary text-primary-foreground"
                  )}
                >
                  {value.length === options.length && (
                    <Check className="h-3 w-3" />
                  )}
                </div>
                <span>{selectAllText}</span>
              </CommandItem>
              {options.map((opt) => {
                const isSelected = value.includes(opt.value)
                return (
                  <CommandItem
                    key={opt.value}
                    onSelect={() => toggleOption(opt.value)}
                    className="cursor-pointer"
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected && "bg-primary text-primary-foreground"
                      )}
                    >
                      {isSelected && <Check className="h-3 w-3" />}
                    </div>
                    <span>{opt.label}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
            <CommandSeparator />
            <div className="flex items-center justify-between">
              {value.length > 0 && (
                <CommandItem
                  onSelect={() => onValueChange([])}
                  className="flex-1 justify-center cursor-pointer"
                >
                  {clearText}
                </CommandItem>
              )}
              {value.length > 0 && <Separator orientation="vertical" className="flex h-6" />}
              <CommandItem
                onSelect={() => setOpen(false)}
                className="flex-1 justify-center cursor-pointer"
              >
                {closeText}
              </CommandItem>
            </div>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
} 