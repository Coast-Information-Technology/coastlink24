import React from "react";
import Link from "next/link";
import Image from "next/image";
import { INavLinks } from "@/lib/data";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function Footer() {
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
            Let’s Power Africa’s Credit <br />
            Revolution — Together.
          </p>
          <div className="space-y-1 text-sm">
            <p>
              Email:{" "}
              <Link
                href="mailto:hello@coastlink24.com"
                className="hover:underline"
              >
                hello@coastlink24.com
              </Link>
            </p>
            <p>WhatsApp: +234 xxx xxx xxxx</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {INavLinks.slice(0, 5).map((link, i) => (
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
              {INavLinks.slice(5).map((link, i) => (
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
              className="p-2 rounded text-white w-full sm:w-auto"
            />
            <Button
              type="submit"
              className="primary-cta hover:bg-blue-700 px-4 py-2 rounded"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      <div className="text-center text-sm text-gray-400 mt-10">
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
}
