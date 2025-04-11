import NavbarPage from "@/components/navbar/navbar";
import { Sidebar } from "@/components/Sidebar";
import React, { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { UserProvider } from "@/components/Context/userContext";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
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
  );
};

export default Layout;
