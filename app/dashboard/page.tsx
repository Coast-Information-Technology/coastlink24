"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getTokenFromCookies } from "@/lib/cookies";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import CardRenderer from "@/components/dashboard/CardRenderer";
import { DashboardCharts } from "@/components/DashboardChart/DashboardChart";
import { UserContext } from "@/components/Context/userContext";

const dashboardCards = ["Wallet", "Stats", "Chart", "Table", "Pie"] as const;

export default function Page() {
  const router = useRouter();
  const { user, loading } = useContext(UserContext) as any;

  useEffect(() => {
    const token = getTokenFromCookies(); // or however you retrieve it

    if (!token) {
      router.push("/auth/login");
    }
  }, [router]);

  return (
    <SidebarProvider>
      <SidebarInset>
        {!loading && user && (
          <>
            <h2 className="text-[24px] font-bold">
              Welcome,{" "}
              <span className="text-[18px] font-normal">
                {user.first_name} {user.last_name}
              </span>
            </h2>
            <div className="h-[2px] w-full bg-black mt-2 mb-4"></div>
          </>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {dashboardCards.map((cardType, index) => (
            <CardRenderer key={index} type={cardType} />
          ))}
        </div>
        <DashboardCharts />
      </SidebarInset>
    </SidebarProvider>
  );
}
