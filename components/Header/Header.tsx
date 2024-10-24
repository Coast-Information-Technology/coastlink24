"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MenuIcon, X } from "lucide-react";
import { disableHeaderWithFooter } from "@/utils/disableHeaderWithFooter";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (href: string) => pathname === href;

  return (
    <div>
      {!disableHeaderWithFooter.includes(pathname) && (
        <header className="bg-transparent absolute w-full z-30 top-0 px-6 flex justify-between items-center h-[15vh]">
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

          {/* Hamburger icon for mobile view */}
          <div
            className="mobile-nav-toggle cursor-pointer relative z-50 lg:hidden"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            {!isOpen && (
              <MenuIcon size={30} className="text-white relative z-30" />
            )}
          </div>

          <nav className={`nav ${isOpen ? "open" : ""} lg:flex lg:static`}>
            {/* X icon inside nav */}
            {isOpen && (
              <div
                className="close-menu cursor-pointer absolute top-6 right-6"
                onClick={toggleMenu}
                aria-label="Close navigation menu"
              >
                <X size={30} className="text-white" />
              </div>
            )}

            <ul
              role="list"
              className="nav-lists font-bold text-[14px] gap-5 text-white flex flex-col lg:flex-row justify-center items-center h-screen lg:h-auto"
            >
              <li>
                <Link
                  href="/"
                  role="listitem"
                  className={`nav-list-items ${
                    isActive("/") ? "text-green-400" : ""
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  role="listitem"
                  className={`nav-list-items ${
                    isActive("/about") ? "text-green-400" : ""
                  }`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/product-info"
                  role="listitem"
                  className={`nav-list-items ${
                    isActive("/product-info") ? "text-green-400" : ""
                  }`}
                >
                  Product Info
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  role="listitem"
                  className={`nav-list-items ${
                    isActive("/blog") ? "text-green-400" : ""
                  }`}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  role="listitem"
                  className={`nav-list-items ${
                    isActive("/resources") ? "text-green-400" : ""
                  }`}
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  role="listitem"
                  className={`nav-list-items ${
                    isActive("/contact") ? "text-green-400" : ""
                  }`}
                >
                  Contact Us
                </Link>
              </li>
            </ul>

            {/* CTA buttons for mobile */}
            <span className="gap-2 md:hidden text-[12px] flex flex-col items-center">
              <Link
                href="/signup"
                className="secondary-cta px-4 py-2 rounded-full cursor-pointer"
              >
                Sign Up Now
              </Link>
              <Link
                href="/get-started"
                className="secondary-cta px-4 py-2 rounded-full cursor-pointer"
              >
                Get Started Now
              </Link>
            </span>
          </nav>

          {/* CTA buttons for desktop */}
          <span className="cta gap-2 hidden lg:flex text-[12px]">
            <Link
              href="/signup"
              className="tertiary-cta px-3 py-2 rounded-full cursor-pointer"
            >
              Sign Up Now
            </Link>
            <Link
              href="/get-started"
              className="tertiary-cta px-3 py-2 rounded-full cursor-pointer"
            >
              Get Started Now
            </Link>
          </span>
        </header>
      )}
    </div>
  );
};
