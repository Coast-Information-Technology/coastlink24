import React from "react";
import styles from "./styles/landing.module.css";
import { LandingNav } from "@/components/landingNav/LandingNav";
import Image from "next/image";
import Link from "next/link";
// import Carousel  from '@/components/carousel/Carousel'

export default function Home() {
  return (
    <div>
      <LandingNav />
      <div className={`${styles.landingCont}`}>
        <div className={`${styles.heroSect} relative z-20`}>
          <div className={`${styles.heroTextBox} `}>
            <h1 className={`${styles.mainText} `}>
              Welcome to Coastlink24 – Your Trusted{" "}
              <span className="accent-color">Fintech Solution for Lenders</span>
            </h1>
            <p>
              Revolutionizing Lending Services with Cutting-Edge Technology.
              Manage loan requests, disbursements, and repayments through our
              innovative, user-friendly platform for both USSD and web users.
            </p>

            <div className={`${styles.inputGroup} pt-8 gap-4`}>
              <Link
                href="/"
                className={`plain-bg-color primary-color px-4 py-2 rounded-md font-bold`}
              >
                Sign Up Now
              </Link>
              <Link
                href="/"
                className={`accent-bg-color plain-color px-4 py-2 rounded-md font-bold `}
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
            className="w-[40%] rounded-lg"
          />

          {/* <div className={`${styles.imgBox} `}>
            <div className="imgHolder flex flex-col justify-center">
              <Image
                src="/piggybank.jpg"
                alt="chart"
                width={100}
                height={50}
                className={`${styles.imageOne} rounded p-2 `}
              />
              <Image
                src="/businessnews.jpg"
                alt="chart"
                width={100}
                height={50}
                className={`${styles.imageOne} rounded p-2`}
              />
            </div>
            <Image src="/BusinessPhone.jpg" alt="chart" width={100} height={100} className={`${styles.imageTwo} p-2`}/>
          </div> */}
        </div>
        <Image
          src="/shape-2.png"
          alt="clip art illustration"
          width={1000}
          height={1000}
          className="absolute top-0 right-0"
        />
      </div>

      {/* Cients logo */}
      {/* <div
        className={`${styles.clientLogoCont} p-12 flex items-center justify-center`}
      >
        <p className="font-bold text-xl">
          Shh Our clints Logo are coming up..........Watch Out!
        </p>
        {/* <Carousel /> */}
      {/* </div> */}
    </div>
  );
}
