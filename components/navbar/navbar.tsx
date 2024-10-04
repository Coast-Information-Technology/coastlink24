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

const NavbarPage: React.FC = () => {
  const { theme } = useTheme(); // Get the theme values

  return (
    <header
      className="flex h-14 lg:h-[60px] items-center gap-4 px-6"
      style={{
        backgroundColor: theme.backgroundColor, // Use theme's background color
        color: theme.textColor, // Use theme's text color
      }}
    >
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <SearchIcon
              className="absolute left-2.5 top-2.5 h-4 w-4"
              style={{
                color: theme.secondaryColor, // Use theme's secondary color
              }}
            />
            <Input
              className="w-full bg-white shadow-none rounded-full appearance-none pl-8 md:w-2/3 lg:w-1/3"
              placeholder="Search..."
              type="search"
              style={{
                backgroundColor: theme.backgroundColor, // Input background using theme
                color: theme.textColor, // Input text color using theme
              }}
            />
          </div>
        </form>
      </div>
      <DropdownMenu>
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
      </DropdownMenu>
    </header>
  );
};

export default NavbarPage;
