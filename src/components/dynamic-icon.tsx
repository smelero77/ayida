import { 
  Bell, 
  CheckCircle, 
  Clock, 
  Settings, 
  Home, 
  Search, 
  FileText, 
  Users, 
  BarChart3,
  User,
  UserCog,
  LogOut,
  Maximize2,
  Minimize2,
  ChartPie,
  BarChart,
  ShoppingCart,
  LayoutTemplate,
  CircleDollarSign,
  CreditCard,
  Headset,
  AtSign,
  MessageCircle,
  Calendar,
  Grid2X2 as Grid2x2,
  ListTodo,
  SwatchBook,
  Package,
  ShoppingBasket,
  LogIn,
  Replace,
  Type,
  LayoutGrid,
  LayoutDashboard,
  TextCursorInput,
  Table,
  ChartArea,
  Smile,
  Square as SquareSquare,
  MousePointer,
  Link,
  Mail,
  Files,
} from "lucide-react"

import { icons } from "lucide-react"
import type { LucideProps, LucideIcon } from "lucide-react"

const iconMap = {
  Bell,
  CheckCircle,
  Clock,
  Settings,
  Home,
  Search,
  FileText,
  Users,
  BarChart3,
  User,
  UserCog,
  LogOut,
  Expand: Maximize2,
  Shrink: Minimize2,
  ChartPie,
  ChartBar: BarChart,
  ShoppingCart,
  LayoutTemplate,
  CircleDollarSign,
  CreditCard,
  Headset,
  AtSign,
  MessageCircle,
  Calendar,
  Grid2x2,
  ListTodo,
  SwatchBook,
  Package,
  ShoppingBasket,
  LogIn,
  Replace,
  Type,
  LayoutGrid,
  LayoutDashboard,
  TextCursorInput,
  Table,
  ChartArea,
  Smile,
  SquareSquare,
  MousePointer,
  Link,
  Mail,
  Files,
}

interface DynamicIconProps extends LucideProps {
  name: keyof typeof icons
}

export function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const Icon = (iconMap as Partial<Record<keyof typeof icons, LucideIcon>>)[name] ?? icons[name]
  
  if (!Icon) {
    // eslint-disable-next-line no-console
    console.warn(`Icon ${name} not found`)
    return null
  }
  
  return <Icon {...props} />
} 