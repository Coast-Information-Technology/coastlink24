import React from "react";
import styles from "./styles/landing.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section
      className={`${styles.heroSection} | section-padding-block section-padding-block-start relative even-columns text-center items-center justify-center`}
    >
      <div
        className={`${styles.heroTextBox} relative z-20 flex flex-col lg:items-start items-center lg:text-left text-center`}
      >
        <h1 className={`${styles.mainText} primary-heading text-white`}>
          Welcome to Coastlink24 – Your Trusted{" "}
          <span className="text-grey">Fintech Solution for Lenders</span>
        </h1>
        <p className="p-3 text-white max-w-full">
          Revolutionizing Lending Services with Cutting-Edge Technology. Manage
          loan requests, disbursements, and repayments through our innovative,
          user-friendly platform for both USSD and web users.
        </p>

        <div className="flex items-center justify-center pt-4 gap-4">
          <Link href="/auth/register" className="cta primary-cta rounded-md">
            Sign Up Now
          </Link>
          <Link
            href="/"
            className="cta secondary-cta hover:shadow-xl rounded-md"
          >
            Learn More
          </Link>
        </div>
      </div>

      <Image
        src="/hero.jpg"
        alt="coastlink24 dashboard ui"
        width={900}
        height={800}
        className="max-w-full h-auto rounded-lg heroSectImage flex self-center justify-center relative z-20 pt-8 lg:pt-0"
      />

      <Image
        src="/shape-2.png"
        alt="clip art illustration"
        width={1000}
        height={1000}
        className="absolute top-0 right-0"
      />
    </section>
  );
}
