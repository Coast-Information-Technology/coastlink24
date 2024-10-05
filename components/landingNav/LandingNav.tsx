import React from "react";
import styles from "@/app/styles/landingNav.module.css";
import Link from "next/link";
import Image from "next/image";

export const LandingNav = () => {
  return (
    <div
      className={`${styles.landingNavCont} bg-transparent absolute w-full z-30`}
    >
      <Link href="/" className="logoBox flex items-center">
        <Image
          src="/Coastlink-brandlogo.png"
          alt="CoastLink24"
          width={150}
          height={150}
        />
        {/* <h2 className="text-blue-900 text-xl text-primary font-bold">CoastLink24</h2> */}
      </Link>

      <div className={`${styles.nav}`}>
        <ul role="list" className={`${styles.navList} `}>
          <Link
            href="#"
            role="listitem"
            className={`${styles.navListItem} plain-color`}
          >
            About
          </Link>
          <Link
            href="#"
            role="listitem"
            className={`${styles.navListItem} plain-color`}
          >
            Product Info
          </Link>
          <Link
            href="#"
            role="listitem"
            className={`${styles.navListItem} plain-color`}
          >
            Blog
          </Link>
          <Link
            href="#"
            role="listitem"
            className={`${styles.navListItem} plain-color`}
          >
            Resources
          </Link>
          <Link
            href="#"
            role="listitem"
            className={`${styles.navListItem} plain-color`}
          >
            Contact Us
          </Link>
        </ul>
      </div>

      <span className="cTa flex gap-2">
        <Link
          href="/"
          className={`${styles.btnHover} plain-bg-color primary-color px-4 py-2 rounded-full`}
        >
          Sign Up Now
        </Link>
        <Link
          href="/"
          className={`${styles.btnHover} plain-bg-color primary-color px-4 py-2 rounded-full`}
        >
          Get Started Now
        </Link>
      </span>
    </div>
  );
};
