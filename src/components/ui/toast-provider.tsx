"use client"

import { ToastProvider as HeroToastProvider } from "@heroui/react"
import { toast, toastRegion } from "@/lib/toast-styles"

export function ToastProvider() {
  return (
    <HeroToastProvider
      placement="top-right"
      maxVisibleToasts={3}
      toastProps={{
        variant: "flat",
        radius: "md",
        shadow: "md",
        classNames: {
          base: toast({ variant: "flat", radius: "md", shadow: "md" }).base(),
          wrapper: toast().wrapper(),
          title: toast().title(),
          description: toast().description(),
          icon: toast().icon(),
          loadingIcon: toast().loadingIcon(),
          content: toast().content(),
          progressTrack: toast().progressTrack(),
          progressIndicator: toast().progressIndicator(),
          motionDiv: toast().motionDiv(),
          closeButton: toast().closeButton(),
          closeIcon: toast().closeIcon(),
        },
      }}
      regionProps={{
        classNames: {
          base: toastRegion().base(),
        },
      }}
    />
  )
} 