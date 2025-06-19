"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { INavLinks } from "@/lib/data";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { disableHeaderWithFooter } from "@/utils/disableHeaderWithFooter";
import { usePathname } from "next/navigation";

export const Footer = () => {
  const pathname = usePathname();

  const shouldHideHeader = disableHeaderWithFooter.some((path) => {
    const pattern = path.replace(/\[.*\]/g, "[^/]+");
    const regex = new RegExp(`^${pattern}$`);
    return regex.test(pathname);
  });

  if (shouldHideHeader) return null;

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Logo + Contact */}
        <div>
          <Image
            src="/Coastlink-brandlogo-blue.png"
            alt="Coast Link24 Logo"
            width={150}
            height={150}
            className="mr-2"
          />
          <p className="text-[12px] mb-4">
            Let{"'"}s Power Africa{"'"}s Credit <br />
            Revolution — Together.
          </p>
          <div className="space-y-1 text-sm">
            <p className="flex items-center gap-1">
              <Image
                src="/icons/gmail.png"
                alt="gmail icon"
                width={30}
                height={30}
              />
              <Link
                href="mailto:hello@coastlink24.com"
                className="hover:underline"
              >
                hello@coastlink24.com
              </Link>
            </p>
            <p className="flex items-center gap-1">
              <Image
                src="/icons/whatsapp.png"
                alt="Whatsapp icon"
                width={30}
                height={30}
              />{" "}
              +234 913 686 0226
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {INavLinks.slice(0, 4).map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="hover:text-gray-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Explore</h4>
            <ul className="space-y-2 text-sm">
              {INavLinks.slice(4)
                .filter((_, i, arr) => i !== 1 && i !== arr.length - 1)
                .map((link, i) => (
                  <li key={i}>
                    <Link href={link.href} className="hover:text-gray-300">
                      {link.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-semibold mb-3">Stay Updated</h4>
          <p className="text-sm mb-4">Subscribe to our newsletter</p>
          <form className="flex flex-col sm:flex-row gap-2">
            <Input
              type="email"
              placeholder="Your email"
              className="p-4 rounded text-white w-full sm:w-auto"
            />
            <Button
              type="submit"
              className="primary-cta hover:bg-blue-700 p-4 rounded"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      <div className="flex items-center justify-between text-center text-sm text-gray-400 mt-10">
        &copy; {new Date().getFullYear()} Coast Link24. All rights reserved.
        <div className="mt-4 space-x-4">
          <Link href="/privacy" className="text-xs hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-xs hover:underline">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
};
