// MobileNav.tsx
"use client";

import React from "react";
import Link from "next/link";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { INavLinks } from "@/lib/data";
import { INavLink } from "@/lib/types";

function isDropdownLink(item: INavLink): item is INavLink & {
  subLinks: Array<{ label: string; href: string }>;
} {
  return !!item.subLinks && item.subLinks.length > 0;
}

function isMegaMenuLink(item: INavLink): item is INavLink & {
  megaMenu: Record<string, Array<{ label: string; href: string }>>;
} {
  return !!item.megaMenu;
}

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  pathname: string;
  hasToken: boolean;
}

export const MobileNav = ({ isOpen, setIsOpen, pathname }: Props) => {
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);
  const [openSubMenu, setOpenSubMenu] = React.useState<string | null>(null);

  const closeMenu = () => {
    setIsOpen(false);
    setOpenDropdown(null);
    setOpenSubMenu(null);
  };

  const isActive = (href: string) => pathname === href;

  return (
    <nav
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

      {isOpen && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
        />
      )}

      <ul className="uppercase text-[16px] text-white flex flex-col px-6 my-4">
        {INavLinks.map((item, index) => {
          const isLastItem = index === INavLinks.length - 1;

          if (isMegaMenuLink(item)) {
            return (
              <li
                key={`mobile-mega-${item.label}`}
                className="py-3 border-b border-gray-300"
              >
                <div className="flex items-center justify-between w-full">
                  <Link
                    href={`/${item.label.toLowerCase()}`}
                    onClick={closeMenu}
                    className="uppercase block hover:text-blue-400 font-semibold"
                  >
                    {item.label}
                  </Link>
                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === item.label ? null : item.label
                      )
                    }
                    aria-label="Toggle submenu"
                    className="ml-2"
                  >
                    {openDropdown === item.label ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </button>
                </div>

                {openDropdown === item.label && (
                  <div className="pl-4 mt-2 space-y-4 text-[14px] text-gray-300">
                    {Object.entries(item.megaMenu).map(
                      ([groupTitle, links]) => (
                        <div key={groupTitle}>
                          <div className="flex justify-between items-center">
                            <Link
                              href={`/${groupTitle.toLowerCase()}`}
                              onClick={closeMenu}
                              className="text-blue-200 font-semibold hover:text-blue-400"
                            >
                              {groupTitle}
                            </Link>
                            <button
                              onClick={() =>
                                setOpenSubMenu(
                                  openSubMenu === groupTitle ? null : groupTitle
                                )
                              }
                              aria-label="Toggle sublinks"
                            >
                              {openSubMenu === groupTitle ? (
                                <ChevronUp size={16} />
                              ) : (
                                <ChevronDown size={16} />
                              )}
                            </button>
                          </div>

                          {openSubMenu === groupTitle && (
                            <ul className="pl-3 mt-1 space-y-1">
                              {links.map((link) => (
                                <li key={link.href}>
                                  <Link
                                    href={link.href}
                                    onClick={closeMenu}
                                    className="block hover:text-blue-400"
                                  >
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )
                    )}
                  </div>
                )}
              </li>
            );
          }

          if (isDropdownLink(item)) {
            return (
              <li
                key={`mobile-dropdown-${item.label}`}
                className="py-3 border-b border-gray-300"
              >
                <div className="flex items-center justify-between w-full">
                  <Link
                    href={item.href!}
                    onClick={closeMenu}
                    className="uppercase hover:text-blue-400"
                  >
                    {item.label}
                  </Link>
                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === item.label ? null : item.label
                      )
                    }
                    aria-label="Toggle dropdown"
                    className="ml-2"
                  >
                    {openDropdown === item.label ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </button>
                </div>

                {openDropdown === item.label && (
                  <ul className="pl-4 mt-2 space-y-2 text-[14px] text-gray-300">
                    {item.subLinks.map((sub) => (
                      <li key={sub.href}>
                        <Link
                          href={sub.href}
                          onClick={closeMenu}
                          className="block hover:text-blue-400"
                        >
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          }

          return (
            <li
              key={item.href}
              className={`py-3 ${!isLastItem ? "border-b border-gray-300" : ""}`}
            >
              <Link
                href={item.href!}
                onClick={closeMenu}
                className={`block uppercase ${
                  isLastItem ? "text-blue-400 font-bold" : "hover:text-blue-400"
                } ${isActive(item.href!) ? "text-blue-400 font-medium" : ""}`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
