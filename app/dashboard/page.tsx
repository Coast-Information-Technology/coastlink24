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
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-slate-100/50 dark:bg-slate-800/50" />
          <div className="aspect-video rounded-xl bg-slate-100/50 dark:bg-slate-800/50" />
          <div className="aspect-video rounded-xl bg-slate-100/50 dark:bg-slate-800/50" />
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-slate-100/50 md:min-h-min dark:bg-slate-800/50" />
      </div>
    </SidebarInset>
    </SidebarProvider>
  )
}
