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
import { ILogoProps } from "@/lib/types";
import { LogOutIcon } from "lucide-react";
import { MainMenus } from "./MainMenus";
import { OtherMenus } from "./OtherMenus";
import { postApiRequest } from "@/lib/apiRequest";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { deleteTokenFromCookies, getTokenFromCookies } from "@/lib/cookies";

export function Sidebar(props: React.ComponentProps<typeof BaseSidebar>) {
  const sidebar = useSidebar();
  const isCollapsed = sidebar.state === "collapsed";
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const handleLogout = async (): Promise<void> => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);

    try {
      const token = getTokenFromCookies();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/token/logout/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        deleteTokenFromCookies();
        toast.success("Logged out successfully.");
      } else {
        console.warn("Server logout failed. Proceeding with local logout.");
        toast.warn("Could not logout from server. Logging out locally.");
      }
    } catch (error) {
      console.error("Server-side logout failed:", error);
      toast.error("Network error. Logging out locally.");
    } finally {
      // Always clean up
      deleteTokenFromCookies();
      router.push("/auth/login");
      setIsLoggingOut(false);
    }
  };

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
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className={`flex items-center gap-2 px-2 py-4 text-sm font-medium transition-colors ${
            isLoggingOut
              ? "opacity-50 cursor-not-allowed"
              : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          }`}
        >
          <LogOutIcon size={20} />
          {!isCollapsed && "Logout"}
        </button>
      </SidebarFooter>

      <SidebarRail />
    </BaseSidebar>
  );
}

function Logo({ isCollapsed }: ILogoProps) {
  return (
    <div className="flex h-[60px] items-center px-1">
      <Link
        href="/dashboard"
        passHref
        className="flex items-center gap-2 font-semibold"
      >
        <Image
          src={
            isCollapsed ? "/coastlink24.png" : "/Coastlink-brandlogo-blue.png"
          }
          alt="Coastlink24 logo"
          width={isCollapsed ? 30 : 150}
          height={isCollapsed ? 30 : 150}
          className={isCollapsed ? "px-0" : ""}
        />
        {/* {!isCollapsed && <span>Coastlink24</span>} */}
      </Link>
    </div>
  );
}
