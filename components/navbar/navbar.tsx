"use client";

import React, { useEffect, useState } from "react";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "../ui/button";
import { useTheme } from "../Context/ThemeContext";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getTokenFromCookies } from "@/lib/cookies";
import { getSingleApiRequest } from "@/lib/apiRequest";
import { IUser } from "@/lib/types";

const NavbarPage: React.FC = () => {
  const { theme } = useTheme();
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = getTokenFromCookies();
      if (!token) return;

      try {
        const userData = await getSingleApiRequest<IUser>(
          "/auth/users/me/",
          token
        );
        setUser(userData);
      } catch (err) {
        console.error("Failed to load user info", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <header
      className="flex items-center justify-between h-[8vh] gap-4 px-6 shrink-0 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
      }}
    >
      <SidebarTrigger className="-ml-1" />

      <DropdownMenu>
        <div className="flex justify-between items-center gap-4">
          {user && (
            <h2
              className="text-[20px] font-bold"
              style={{ color: theme.textColor }}
            >
              Welcome, <span className="text-[12px]">{user.designation}</span>
            </h2>
          )}
          <DropdownMenuTrigger asChild>
            <Button
              className="rounded-full border w-8 h-8"
              size="icon"
              variant="ghost"
              style={{ borderColor: theme.secondaryColor }}
            >
              <Avatar>
                <AvatarImage
                  src={user?.img || "/noavatar.png"}
                  alt={`${user?.first_name} ${user?.last_name}`}
                />
                <AvatarFallback className="bg-gray-100 text-gray-600 rounded-full">
                  {user?.first_name?.charAt(0).toUpperCase()}
                  {user?.last_name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="text-primary">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                href="/dashboard/settings"
                style={{ color: theme.primaryColor }}
              >
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem style={{ color: theme.primaryColor }}>
              Support
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem style={{ color: theme.primaryColor }}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </div>
      </DropdownMenu>
    </header>
  );
};

export default NavbarPage;
