import type { ReactNode } from "react"
import { getDictionary } from "@/lib-shadboard-new/get-dictionary"
import { Layout } from "@/components-shadboard-new/layout"

interface DashboardLayoutProps {
  children: ReactNode
  params: Promise<{ lang: string }>
}

export default async function DashboardLayout({ 
  children, 
  params 
}: DashboardLayoutProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as any);
  
  return (
    <Layout dictionary={dictionary}>
      {children}
    </Layout>
  )
} 