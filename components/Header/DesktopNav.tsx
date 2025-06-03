// DesktopNav.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
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
  pathname: string;
  hasToken: boolean;
}

export const DesktopNav = ({ pathname }: Props) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [activeMegaMenuSection, setActiveMegaMenuSection] = useState<
    string | null
  >(null);

  const isActive = (href: string) => pathname === href;

  return (
    <div className="hidden lg:flex items-center gap-6 text-white text-md relative">
      {INavLinks.map((item) => {
        if (isMegaMenuLink(item)) {
          return (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => {
                setOpenDropdown(item.label);
                setActiveMegaMenuSection(Object.keys(item.megaMenu)[0]);
              }}
              onMouseLeave={() => {
                setOpenDropdown(null);
                setActiveMegaMenuSection(null);
              }}
            >
              <button className="flex items-center gap-1 hover:text-blue-200 capitalize">
                {item.label} <ChevronDown size={16} />
              </button>
              {openDropdown === item.label && (
                <nav className="absolute left-0 top-4 mt-1 w-[600px] h-auto bg-white text-gray-800 shadow-lg rounded-lg flex z-50 capitalize border-4 border-blue-400">
                  <div className="w-1/4 border-r-4 border-gray-200">
                    {Object.keys(item.megaMenu).map((groupTitle) => (
                      <button
                        key={groupTitle}
                        className={`block text-left text-[1rem] px-6 py-6 w-full uppercase ${
                          activeMegaMenuSection === groupTitle
                            ? "bg-blue-100 text-blue-600 font-semibold border-r-4 border-r-blue-400"
                            : ""
                        }`}
                        onMouseEnter={() =>
                          setActiveMegaMenuSection(groupTitle)
                        }
                      >
                        {groupTitle}
                      </button>
                    ))}
                  </div>
                  <div className="w-3/4 pl-6">
                    <ul className="space-y-4 text-md py-4">
                      {activeMegaMenuSection &&
                        item.megaMenu[activeMegaMenuSection]?.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              className="hover:text-blue-600 hover:font-semibold transition-all duration-100 ease-in-out"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                </nav>
              )}
            </div>
          );
        }

        if (isDropdownLink(item)) {
          return (
            <div key={item.label} className="relative">
              <button
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
                className="flex items-center gap-1 hover:text-blue-200"
              >
                {item.label} <ChevronDown size={16} />
              </button>
              {openDropdown === item.label && (
                <div
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                  className="absolute left-0 top-full mt-1 w-[200px] border-4 border-blue-400 bg-white text-gray-800 shadow-md rounded-md py-3 px-4 z-50"
                >
                  <ul className="space-y-2 text-[1rem] px-4">
                    {item.subLinks.map((sub) => (
                      <li key={sub.href}>
                        <Link
                          href={sub.href}
                          className="hover:text-blue-600 hover:font-semibold transition-all duration-100 ease-in-out"
                        >
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href!}
            className={`hover:text-blue-300 ${
              isActive(item.href!) ? "text-blue-300 font-medium" : ""
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
};
