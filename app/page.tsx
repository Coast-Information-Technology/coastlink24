import React from "react";
import styles from "./styles/landing.module.css";
import { LandingNav } from "@/components/landingNav/LandingNav";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <LandingNav />
      <div className={`${styles.landingCont} `}>
        <div className={`${styles.heroSect} `}>
          <div className={`${styles.heroTextBox} `}>
            <h1 className={`${styles.mainText} `}>
              Elevate Your Lending Process With Our Seamless Money Conversion
            </h1>
            <p className="pt-4 text-justify">
              Say goodbye to the hassle of traditonal lending process - with our
              streamlined process, you can navigate international transactions
              with ease.
            </p>
          </div>

          <div className={`${styles.imgBox} `}>
            <div className="imgHolder flex flex-col items-center justify-center">
              <Image
                src="/coastSegun.png"
                alt="chart"
                width={60}
                height={100}
                className={`${styles.imageOne} `}
              />
              <Image
                src="/coastSegun.png"
                alt="chart"
                width={50}
                height={40}
                className={`${styles.imageOne} `}
              />
            </div>
            <Image src="/coastSegun.png" alt="chart" width={100} height={100} />
          </div>
        </div>
      </div>
    </div>
  );
}
