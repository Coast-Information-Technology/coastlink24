"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MenuIcon, X, ChevronDown, ChevronUp } from "lucide-react";
import { disableHeaderWithFooter } from "@/utils/disableHeaderWithFooter";
import { INavLinks } from "@/lib/data";
import { getTokenFromCookies } from "@/lib/cookies";
import { INavLink } from "@/lib/types";

// Type guard for dropdown items
function isDropdownLink(item: INavLink): item is INavLink & {
  subLinks: Array<{ label: string; href: string }>;
} {
  return !!item.subLinks && item.subLinks.length > 0;
}

export const Header = () => {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, mounted]);

  useEffect(() => {
    if (!mounted || !isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, mounted]);

  useEffect(() => {
    if (!mounted) return;

    const token = getTokenFromCookies();
    if (token) setHasToken(true);
  }, [mounted]);

  useEffect(() => {
    console.log("isOpen:", isOpen);
  }, [isOpen]);

  if (!mounted) return null;

  const closeMenu = () => {
    setIsOpen(false);
    setOpenDropdown(null);
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleDropdown = (label: string) =>
    setOpenDropdown(openDropdown === label ? null : label);
  const isActive = (href: string) => pathname === href;

  const shouldHideHeader = disableHeaderWithFooter.some((path) => {
    const pattern = path.replace(/\[.*\]/g, "[^/]+");
    const regex = new RegExp(`^${pattern}$`);
    return regex.test(pathname);
  });

  if (shouldHideHeader) return null;

  return (
    <header className="bg-transparent absolute w-full z-30 top-0 px-6 h-[15vh] flex justify-between items-center">
      {/* Logo */}
      <Link href="/">
        <Image
          className="w-[150px] md:w-[210px] mt-3"
          src="/Coastlink-brandlogo.png"
          alt="CoastLink24"
          width={210}
          height={180}
        />
      </Link>

      {/* CTA + Hamburger Icon (Always visible) */}
      <div className="flex items-center gap-4">
        <Link
          href={hasToken ? "/dashboard" : "/auth/register"}
          className="text-[14px] primary-cta px-4 py-2 rounded-full"
        >
          {hasToken ? "Dashboard" : "Get Started"}
        </Link>
        <button onClick={toggleMenu} aria-label="Toggle navigation menu">
          <MenuIcon size={30} className="text-white" />
        </button>
      </div>

      {/* Full-Screen Hamburger Navigation */}
      {mounted && (
        <nav
          ref={navRef}
          className={`fixed top-0 h-screen w-[75vw] md:w-[35vw] bg-opacity-95 backdrop:blur-lg bg-gray-700 z-20 transition-all duration-500 ease-in-out overflow-y-auto ${
            isOpen ? "right-0" : "-right-[75vw] md:-right-[35vw]"
          }`}
        >
          <button
            onClick={closeMenu}
            aria-label="Close menu"
            className="absolute top-6 right-6"
          >
            <X size={30} className="text-white" />
          </button>

          <ul className="uppercase text-[16px] text-white flex flex-col px-6 my-4">
            {INavLinks.map((item, index) => {
              const isLastItem = index === INavLinks.length - 1;

              return isDropdownLink(item) ? (
                <li
                  key={`mobile-dropdown-${index}`}
                  className={`py-3 ${!isLastItem ? "border-b border-gray-300" : ""}`}
                >
                  <button
                    className="uppercase flex items-center gap-2 w-full justify-between text-left"
                    onClick={() => toggleDropdown(item.label)}
                  >
                    {item.label}
                    {openDropdown === item.label ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </button>
                  {openDropdown === item.label && (
                    <ul className="uppercase mt-2 ml-4 space-y-2 pl-4 text-[14px] text-gray-300">
                      {item.subLinks.map((sub) => (
                        <li key={sub.href}>
                          <Link
                            href={sub.href}
                            onClick={closeMenu}
                            className={`block hover:text-blue-400 ${
                              isActive(sub.href)
                                ? "text-blue-400 font-medium"
                                : ""
                            }`}
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li
                  key={item.href}
                  className={`py-3 ${!isLastItem ? "border-b border-gray-300" : ""}`}
                >
                  <Link
                    href={item.href!}
                    onClick={closeMenu}
                    className={`block uppercase ${
                      isLastItem
                        ? "text-blue-400 font-bold"
                        : "hover:text-blue-400"
                    } ${isActive(item.href!) ? "text-blue-400 font-medium" : ""}`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
};
