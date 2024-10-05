import React from "react";
import styles from "@/app/styles/landingNav.module.css";
import Link from "next/link";
import Image from "next/image";

export const LandingNav = () => {
  return (
    <div className={`${styles.landingNavCont} `}>
      <span className="logoBox flex items-center">
        <Image src='/CoastlinkLogo.png' alt="CoastLink24" width={90} height={90} />
        {/* <h2 className="text-blue-900 text-xl text-primary font-bold">CoastLink24</h2> */}
      </span>
      
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

      <span className="cTa flex gap-2">
      <Link
        href="/"
        className={`${styles.btnHover} bg-primary text-white p-2 rounded text-sm `}
      >
        Sign Up Now
      </Link>
      <Link
        href="/"
        className={`${styles.btnHover} bg-primary text-white p-2 rounded text-sm `}
      >
        Get Started Today ($0)
      </Link>
      </span>
      
    </div>
  );
};
