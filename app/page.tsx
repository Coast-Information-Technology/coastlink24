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
            <p className="pt-2 text-justify">
              Say goodbye to the hassle of traditonal lending<br /> process - with our
              streamlined process, you can<br />navigate international transactions
              with ease.
            </p>

            <div className={`${styles.inputGroup} pt-8 `}>
              <input type="email" className={`${styles.input} `} id="Email" name="Email" placeholder="Enter your email" autoComplete="on" />
              <input className={`${styles.buttonSubmit} `} value="Subscribe" type="submit" />
            </div>
          </div>

          <div className={`${styles.imgBox} `}>
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
          </div>
        </div>
      </div>

      {/* Cients logo */}
      <div className={`${styles.clientLogoCont} p-12 flex items-center `}>
        <p className="text-bold">Shh Our clints Logo are coming up..........Watch Out!</p>
        <div className="logoCaurosel">

        </div>
      </div>
    </div>
  );
}
