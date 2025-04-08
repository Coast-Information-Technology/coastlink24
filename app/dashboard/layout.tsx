import NavbarPage from "@/components/navbar/navbar";
import { Sidebar } from "@/components/Sidebar";
import React, { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider>
      <div className="grid min-h-screen w-full lg:grid-cols-[200px_1fr]">
        <div className="flex-1">
          <Sidebar />
        </div>
        <div>
          <NavbarPage />
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
