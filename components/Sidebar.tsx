// components/Sidebar.tsx
"use client";

import * as React from "react";
import {
  Sidebar as BaseSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { sidebarData } from "@/lib/data";
import { ILogoProps } from "@/lib/types.js";
import { LogOutIcon } from "lucide-react";
import { MainMenus } from "./MainMenus";
import { OtherMenus } from "./OtherMenus";

export function Sidebar(props: React.ComponentProps<typeof BaseSidebar>) {
  const sidebar = useSidebar();
  
  // Use the state property which can be "expanded" or "collapsed"
  const isCollapsed = sidebar.state === "collapsed";

  return (
    <BaseSidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Logo isCollapsed={isCollapsed} />
      </SidebarHeader>
      <SidebarContent className="custom-scrollbar">
        <MainMenus items={sidebarData.mainMenu} />
        <OtherMenus projects={sidebarData.projects} />
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-2 px-6 py-4 text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
          <LogOutIcon size={20} />
          <span>Logout</span>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </BaseSidebar>
  );
}

function Logo({ isCollapsed }: ILogoProps) {
  return (
    <div className="flex h-[60px] items-center px-6">
      <Link href="/dashboard" passHref className="flex items-center gap-2 font-semibold">
        <Image
          src="/coastlink24.png"
          alt="Coastlink24 logo"
          width={isCollapsed ? 30 : 40}
          height={isCollapsed ? 30 : 40}
          className={isCollapsed ? "px-0" : ""}
        />
        {!isCollapsed && <span>Coastlink24</span>}
      </Link>
    </div>
  );
}