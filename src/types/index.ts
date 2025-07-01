export type LocaleType = "en" | "ar" | "es"

export type ThemeType = "zinc" | "slate" | "stone" | "gray" | "neutral" | "red" | "rose" | "orange" | "green" | "blue" | "yellow" | "violet"

export type ModeType = "light" | "dark" | "system"

export type LayoutType = "vertical" | "horizontal"

export type DirectionType = "ltr" | "rtl"

export type FormatStyleType = "number" | "currency" | "percent" | "compact"

export interface SettingsType {
  theme: ThemeType
  mode: ModeType
  radius: number
  layout: LayoutType
  locale: LocaleType
}

// Auth form types
export interface SignInFormType {
  email: string
  password: string
  rememberMe?: boolean
}

export interface RegisterFormType {
  name: string
  email: string
  password: string
  confirmPassword: string
  acceptTerms?: boolean
}

export interface ForgotPasswordFormType {
  email: string
}

export interface NewPasswordFormType {
  password: string
  confirmPassword: string
}

export interface VerifyEmailFormType {
  code: string
}

// Shadboard Navigation Types
export interface NavigationType {
  title: string
  items: NavigationRootItem[]
}

export type NavigationRootItem =
  | NavigationRootItemWithHrefType
  | NavigationRootItemWithItemsType

export interface NavigationRootItemBasicType {
  title: string
  label?: string
  iconName: string
}

export interface NavigationRootItemWithHrefType
  extends NavigationRootItemBasicType {
  href: string
  items?: never
}

export interface NavigationRootItemWithItemsType
  extends NavigationRootItemBasicType {
  items: (
    | NavigationNestedItemWithHrefType
    | NavigationNestedItemWithItemsType
  )[]
  href?: never
}

export interface NavigationNestedItemBasicType {
  title: string
  label?: string
}

export interface NavigationNestedItemWithHrefType
  extends NavigationNestedItemBasicType {
  href: string
  items?: never
}

export interface NavigationNestedItemWithItemsType
  extends NavigationNestedItemBasicType {
  items: (
    | NavigationNestedItemWithHrefType
    | NavigationNestedItemWithItemsType
  )[]
  href?: never
}

export type NavigationNestedItem =
  | NavigationNestedItemWithHrefType
  | NavigationNestedItemWithItemsType 