"use client";

import React from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineUser } from "react-icons/hi2";
import { IoBusinessSharp } from "react-icons/io5";
import { HiOutlineBadgeCheck, HiOutlineCurrencyDollar } from "react-icons/hi";
import { GiReceiveMoney } from "react-icons/gi";

const page = () => {
  return (
    <main className="flex m-0">
      {/* Sidebar */}
      <div
        className="hidden lg:flex flex-col pl-14 pr-24 justify-center w-full h-[100vh] gap-8 bg-primary"
        style={{
          backgroundImage: "url('/auth-bg.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "bottom right",
        }}
      >
        <Link href="/" className="flex gap-2 items-center text-white">
          <FaArrowCircleLeft /> <p className="hover:text-white">Go to Home</p>
        </Link>
        <div className="flex items-center gap-1">
          <Image
            src="/coastlink-brandlogo.png"
            alt="coast link logo"
            height={250}
            width={250}
          />
          {/* <h1 className="text-white font-semibold pr-20 text-[2.7rem]">
            Coastlink 24
          </h1> */}
        </div>
        <p className="text-white text-[14px] font-extralight text-justify w-[33vw]">
          Revolutionizing Lending Services with Cutting-Edge Technology. Manage
          loan requests, disbursements, and repayments through our innovative,
          user-friendly platform for both USSD and web users.
        </p>
      </div>

      {/* Main section */}
      <section className="h-screen w-full flex justify-center items-center bg-white md:px-10">
        <div className="space-y-2 p-4 md:p-8 m-auto sm:w-[60vw] lg:w-[40vw]">
          <Link
            href="/"
            className="lg:hidden flex items-center justify-center p-4 text-white text-2xl font-bold gap-2 bg-gradient-to-r from-indigo-500 to-blue-500 rounded"
          >
            <Image
              src="/coastlink-brandlogo.png"
              alt="coast link logo"
              height={150}
              width={150}
            />
            {/* <p>Coastlink 24</p> */}
          </Link>
          <p className="text-gray-500 dark:text-gray-400 text-[14px] text-right pb-6">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-primary font-bold underline"
            >
              Login
            </Link>
          </p>
          <h1 className="text-2xl text-black font-bold">Create an Account</h1>
          <p className="text-gray-500 text-[14px] pb-10">
            What do you want to use Coastlink24 Intelligence System for?
          </p>

          <Link
            href="/auth/register/licenced-lenders"
            className="flex items-center gap-4 p-6 border-2 border-gray-300 rounded-md hover:border-l-blue-500 hover:border-t-blue-500 hover:border-r-blue-700 hover:border-b-blue-700 transition duration-200 ease-in-out group"
          >
            <HiOutlineBadgeCheck
              size={60}
              className="text-black transition duration-200 group-hover:text-blue-500"
            />

            <div>
              <h3 className="text-black transition duration-200 group-hover:text-blue-500 text-[1.2rem] font-bold">
                Licenced Lending
              </h3>
              <p className="text-gray-500 text-[12px]">
                I have a lending license and I want to lend.
              </p>
            </div>
          </Link>

          <Link
            href="/auth/register/unlicenced-lenders"
            className="flex items-center gap-4 p-6 mt-8 border-2 border-gray-300 rounded-md hover:border-l-blue-500 hover:border-t-blue-500 hover:border-r-blue-700 hover:border-b-blue-700 transition duration-200 ease-in-out group"
          >
            <HiOutlineCurrencyDollar
              size={60}
              className="text-black transition duration-200 group-hover:text-blue-500"
            />
            <div>
              <h3 className="text-black transition duration-200 group-hover:text-blue-500 text-[1.2rem] font-bold">
                Unlicenced Lending
              </h3>
              <p className="text-gray-500 text-[12px]">
                I want to pledge my funds on Coastlink24 Intelligence System and
                earn.
              </p>
            </div>
          </Link>

          <Link
            href="/auth/register/investors"
            className="flex items-center gap-4 p-6 mt-8 border-2 border-gray-300 rounded-md hover:border-l-blue-500 hover:border-t-blue-500 hover:border-r-blue-700 hover:border-b-blue-700 transition duration-200 ease-in-out group"
          >
            <GiReceiveMoney
              size={60}
              className="text-black transition duration-200 group-hover:text-blue-500"
            />
            <div>
              <h3 className="text-black transition duration-200 group-hover:text-blue-500 text-[1.2rem] font-bold">
                Investors
              </h3>
              <p className="text-gray-500 text-[12px]">
                I want to pledge my funds on Coastink24 Intelligence System and
                earn
              </p>
            </div>
          </Link>

          <p className="text-[10px] fixed bottom-8 left-14 text-white font-light">
            © 2024 Coastlink24. All rights reserved.
          </p>
        </div>
      </section>
    </main>
  );
};

export default page;
