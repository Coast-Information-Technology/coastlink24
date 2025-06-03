// Header.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";
import { getTokenFromCookies } from "@/lib/cookies";
import { disableHeaderWithFooter } from "@/utils/disableHeaderWithFooter";
import { INavLinks } from "@/lib/data";
import { MobileNav } from "./MobileNav";
import { DesktopNav } from "./DesktopNav";

export const Header = () => {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => (document.body.style.overflow = "unset");
  }, [isOpen, mounted]);

  useEffect(() => {
    if (!mounted) return;
    const token = getTokenFromCookies();
    if (token) setHasToken(true);
  }, [mounted]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const shouldHideHeader = disableHeaderWithFooter.some((path) => {
    const pattern = path.replace(/\[.*\]/g, "[^/]+");
    const regex = new RegExp(`^${pattern}$`);
    return regex.test(pathname);
  });

  if (shouldHideHeader) return null;

  return (
    <header
      className={`fixed top-0 w-full z-30 px-4 md:px-16 h-[12vh] flex justify-between items-center transition-all duration-300 ${
        isScrolled
          ? "bg-blue-600 shadow-md backdrop-blur-[15px] bg-opacity-90"
          : "bg-transparent"
      }`}
    >
      <Link href="/">
        <Image
          src="/Coastlink-brandlogo.png"
          alt="CoastLink24"
          width={150}
          height={130}
        />
      </Link>

      <DesktopNav pathname={pathname} hasToken={hasToken} />

      <div className="flex items-center gap-4">
        <Link
          href={hasToken ? "/dashboard" : "/auth/register"}
          className="text-[14px] primary-cta px-4 py-2 rounded-full"
        >
          {hasToken ? "Dashboard" : "Get Started"}
        </Link>
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Toggle navigation menu"
          className="lg:hidden"
        >
          <MenuIcon size={30} className="text-white" />
        </button>
      </div>

      {mounted && (
        <MobileNav
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          pathname={pathname}
          hasToken={hasToken}
        />
      )}
    </header>
  );
};
