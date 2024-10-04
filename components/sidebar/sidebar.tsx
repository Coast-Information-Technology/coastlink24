"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // Importing from next/router instead of next/navigation
import React from "react";
import {
  BellIcon,
  BellRingIcon,
  HomeIcon,
  ListMusicIcon,
  PieChartIcon,
  SettingsIcon,
  TrendingUpIcon,
  User,
  VideoIcon,
  YoutubeIcon,
} from "lucide-react";
import { Button } from "../ui/button";

interface NavLink {
  href: string;
  icon: JSX.Element;
  text: string;
}

const navLinks: NavLink[] = [
  { href: "/dashboard", icon: <HomeIcon size={17} />, text: "Dashboard" },
  { href: "/users", icon: <User size={17} />, text: "Users" },
  {
    href: "/settings",
    icon: <SettingsIcon size={17} />,
    text: "Settings",
  },
];

const SidebarPage: React.FC = () => {
  const pathName = usePathname();

  return (
    <div className="hidden h-full border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center px-6">
          <Link
            href="/dashboard"
            passHref
            className="flex items-center gap-2 font-semibold"
          >
            <span>Coast-Link24</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-4">
          <nav className="grid items-start text-sm font-medium">
            {navLinks.map(({ href, icon, text }, index) => (
              <Link
                href={href}
                key={index}
                passHref
                className={`flex items-center gap-2 px-8 py-2 ${
                  pathName === href
                    ? "text-purple-800 border-l-4 border-l-purple-800 font-bold hover:text-gray-300"
                    : "text-gray-500"
                } transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50`}
              >
                {icon}
                {text}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SidebarPage;
