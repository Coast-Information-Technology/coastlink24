"use client";

import React, { useState } from "react";
import styles from "@/app/styles/landingNav.module.css";
import Link from "next/link";
import Image from "next/image";
import { MenuIcon, X } from "lucide-react";

export const LandingNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
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
      <div className={styles.hamburger} onClick={toggleMenu}>
        {isOpen ? (
          <X size={40} className="text-white relative z-50" />
        ) : (
          <MenuIcon size={40} className="text-white" />
        )}
      </div>

      {/* Navigation menu */}
      <div className={`${styles.nav} ${isOpen ? "flex" : "hidden lg:flex"}`}>
        <ul
          role="list"
          className={`${styles.navList} flex font-bold text-[14px] gap-6 text-white`}
        >
          <li role="listitem" >
          <Link href="/" className={`${styles.navListItem}`}>
            Home</Link>
          </li>

          <li role="listitem">
          <Link href="#" className={`${styles.navListItem}`}>
            Features</Link>
          </li>

          <li role="listitem">
          <Link href="#"  className={`${styles.navListItem}`}>
            How It Works</Link>
          </li>

          <li role="listitem" >
          <Link href="#" className={`${styles.navListItem}`}>
            Pricing</Link>
          </li>

          <li role="listitem" >
          <Link href="#" className={`${styles.navListItem}`}>
            About Us</Link>
          </li>

          <li role="listitem">
          <Link href="#"  className={`${styles.navListItem}`}>
            Contact</Link>
          </li>
        </ul>

        {/* CTA buttons for mobile */}
        <span className={`${styles.ctaMobile} gap-2 md:hidden text-[12px]`}>
          <Link
            href="/"
            className={`${styles.btnHover} secondary-cta px-4 py-2 rounded-full`}
          >
            Sign Up Now
          </Link>
          <Link
            href="/"
            className={`${styles.btnHover} secondary-cta px-4 py-2 rounded-full`}
          >
            Get Started Now
          </Link>
        </span>
      </div>

      {/* CTA buttons for desktop */}
      <span className="cta gap-2 hidden lg:flex text-[12px]">
        <Link
          href="/"
          className={`${styles.btnHover} tertiary-cta px-3 py-2 rounded-full`}
        >
          Sign Up Now
        </Link>
        <Link
          href="/"
          className={`${styles.btnHover} tertiary-cta px-3 py-2 rounded-full`}
        >
          Get Started Now
        </Link>
      </span>
    </header>
  );
};
