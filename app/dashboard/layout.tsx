import NavbarPage from "@/components/navbar/navbar";
import { Sidebar } from "@/components/Sidebar";
import React, { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { UserProvider } from "@/components/Context/userContext";
import { LoanProvider } from "@/app/component/loanContext/loanContext";
import { DashboardProvider } from "@/components/Context/DashboardContext";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <DashboardProvider>
    <LoanProvider>
      <UserProvider>
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <NavbarPage />
              <main className="flex-1 p-4">{children}</main>
            </div>
          </div>
        </SidebarProvider>
      </UserProvider>
    </LoanProvider>
    </DashboardProvider>
  );
};

export default Layout;
