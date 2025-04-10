"use client";

import React from "react";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { SearchIcon, YoutubeIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
import { useTheme } from "../Context/ThemeContext"; // Access the theme
import {
  SidebarTrigger
} from "@/components/ui/sidebar"

const NavbarPage: React.FC = () => {
  const { theme } = useTheme(); // Get the theme values

  return (
    <header
      className="flex items-center justify-between h-14 lg:h-[60px] gap-4 px-6 shrink-0 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
      style={{
        backgroundColor: theme.backgroundColor, // Use theme's background color
        color: theme.textColor, // Use theme's text color
      }}
    >
      <SidebarTrigger className="-ml-1" />
      <DropdownMenu>
        <div className="flex justify-between items-center gap-2">
        <h2
          className="text-[20px] font-bold"
          style={{ color: theme.textColor }}
        >
          Welcome, User
        </h2>
        <DropdownMenuTrigger asChild>
          <Button
            className="rounded-full border w-8 h-8"
            size="icon"
            variant="ghost"
            style={{
              borderColor: theme.secondaryColor, // Button border using theme
            }}
          >
            <Image
              alt="Avatar"
              className="rounded-full"
              height="32"
              src="/placeholder.svg"
              style={{
                aspectRatio: "32/32",
                objectFit: "cover",
              }}
              width="32"
            />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel style={{ color: theme.textColor }}>
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
