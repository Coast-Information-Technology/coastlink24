import React from "react";
import styles from "@/app/styles/landingNav.module.css";
import Link from "next/link";
import Image from "next/image";

export const LandingNav = () => {
  return (
    <div className={`${styles.landingNavCont} `}>
      <h2 className="text-blue-900 text-xl font-bold">CoastLink24</h2>

      <div className={`${styles.nav}`}>
        <ul role="list" className={`${styles.navList} `}>
          <li role="listitem" className={`${styles.navListItem}`}>
            About
          </li>
          <li role="listitem" className={`${styles.navListItem}`}>
            Product Info
          </li>
          <li role="listitem" className={`${styles.navListItem}`}>
            Blog
          </li>
          <li role="listitem" className={`${styles.navListItem}`}>
            Resources
          </li>
          <li role="listitem" className={`${styles.navListItem}`}>
            Contact Us
          </li>
        </ul>
      </div>

      <Link
        href="/"
        className={`${styles.btnHover} bg-blue-700 text-white p-2 rounded text-sm `}
      >
        Get Started ($0)
      </Link>
    </div>
  );
};
