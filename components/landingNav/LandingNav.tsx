import React from "react";
import styles from "@/app/styles/landingNav.module.css";
import Link from "next/link";
import Image from "next/image";

export const LandingNav = () => {
  return (
    <div className={`${styles.landingNavCont} `}>
      <h2 className="text-blue-900 font-bold">CoastLink24</h2>

      <div className={`${styles.nav}`}>
        <ul role="list" className={`${styles.navList} `}>
          <li role="listitem" className={`${styles.navListItem}`}>
            About
          </li>
          <li role="listitem" className={`${styles.navListItem}`}>
            Product
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
        className="bg-blue-700 text-white p-2 rounded text-sm hover:bg-purple-900"
      >
        Get Started ($0)
      </Link>
    </div>
  );
};
