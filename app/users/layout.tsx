import NavbarPage from "@/components/navbar/navbar";
import SidebarPage from "@/components/sidebar/sidebar";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[200px_1fr]">
      <div className="flex-1">
        <SidebarPage />
      </div>
      <div>
        <NavbarPage />
        {children}
      </div>
    </div>
  );
};

export default Layout;
