"use client";

import React, { useState, useEffect } from "react";
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
  subLinks: Array<{ label: string; href: string }>
} {
  return !!item.subLinks && item.subLinks.length > 0;
}

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const token = getTokenFromCookies();
    if (token) setHasToken(true);
  }, []);

  const toggleMenu = () => setIsOpen((prev) => !prev);
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
      <nav
  className={`fixed top-0 left-0 h-screen w-[35vw] bg-black bg-opacity-80 backdrop-blur-sm z-40 transition-all duration-500 ease-in-out overflow-y-auto ${
    isOpen ? "left-0" : "-left-[35vw]"
  }`}
>

        <div className="flex justify-between items-center px-6 py-4">
          <Image src="/Coastlink-brandlogo.png" width={150} height={50} alt="Logo" />
          <button onClick={toggleMenu} aria-label="Close menu">
            <X size={30} className="text-white" />
          </button>
        </div>

        <ul className="uppercase text-[16px] text-white flex flex-col gap-6 px-6 mt-2 mb-8">
          {INavLinks.map((item, index) =>
            isDropdownLink(item) ? (
              <li key={`mobile-dropdown-${index}`}>
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
                  <ul className="uppercase mt-2 ml-4 space-y-2 border-l border-gray-600 pl-4 text-[14px] text-gray-300">
                    {item.subLinks.map((sub) => (
                      <li key={sub.href}>
                        <Link
                          href={sub.href}
                          onClick={() => {
                            setIsOpen(false);
                            setOpenDropdown(null);
                          }}
                          className={`block hover:text-blue-500 ${
                            isActive(sub.href) ? "text-blue-500 font-medium" : ""
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
              <li key={item.href}>
                <Link
                  href={item.href!}
                  onClick={() => {
                    setIsOpen(false);
                    setOpenDropdown(null);
                  }}
                  className={`block uppercase hover:text-blue-500 ${
                    isActive(item.href!) ? "text-blue-500 font-medium" : ""
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* <div className="absolute bottom-10 left-0 w-full flex justify-center">
          <Link
            href="/auth/login"
            className="secondary-cta px-6 py-3 rounded-full text-[14px]"
            onClick={() => setIsOpen(false)}
          >
            Sign In
          </Link>
        </div> */}
      </nav>
    </header>
  );
};
