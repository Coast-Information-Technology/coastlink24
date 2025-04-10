"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { getTokenFromCookies } from "@/lib/cookies"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset, 
  SidebarProvider} from "@/components/ui/sidebar"
  import CardRenderer from "@/components/dashboard/CardRenderer";

const dashboardCards = [
  "Wallet",
  "Stats",
  "Chart",
  "Table",
  "Pie"
] as const;

export default function Page() {
  const router = useRouter()

  useEffect(() => {
    const token = getTokenFromCookies() // or however you retrieve it

    if (!token) {
      router.push("/auth/login")
    }
  }, [router])

  return (
    <SidebarProvider>
      <SidebarInset>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {dashboardCards.map((cardType, index) => (
          <CardRenderer key={index} type={cardType} />
        ))}
      </div>
    </SidebarInset>
    </SidebarProvider>
  )
}
