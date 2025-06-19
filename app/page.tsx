"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Building2,
  TrendingUp,
  Smartphone,
  Landmark,
  Banknote,
  Users,
  Briefcase,
} from "lucide-react";
import { GiBank } from "react-icons/gi";

const items = [
  {
    title: "FOR BORROWERS",
    desc: "Access loans from anywhere — even without internet. Use our shortcode or mobile/web app to apply, get scored, and receive disbursement instantly.",
    quote: "Dial. Apply. Receive. Repay. Done.",
    img: "/happy-borrower.jpg",
    url: "/borrowers",
  },
  {
    title: "FOR LENDERS",
    desc: "Launch a loan product with zero tech overhead. Manage your borrowers, repayments, and scoring from a smart dashboard or mobile app. Need custom UI or API-only integration? You’re covered.",
    quote: "Plug in and lend. Coast Link24 handles the rest.",
    img: "/lenders.avif",
    url: "/lenders",
  },
  {
    title: "FOR INVESTORS",
    desc: "Invest in vetted lenders and portfolios. Track your money, returns, and performance from a clean dashboard. We offer transparency, risk tagging, and insights.",
    quote: "Don’t build a loan app — fund the one that powers them all.",
    img: "/investors.jpg",
    url: "/investors",
  },
];

const whyItems = [
  {
    icon: <GiBank size={50} className="text-blue-600 mb-4" />,
    title: "Multi-Lender Marketplace",
    desc: "Borrowers get matched with best-fit lenders instantly.",
  },
  {
    icon: <Building2 size={50} className="text-blue-600 mb-4" />,
    title: "BaaS for Lenders",
    desc: "Build & scale your digital lending system in days, not months.",
  },
  {
    icon: <TrendingUp size={50} className="text-blue-600 mb-4" />,
    title: "Funding for Growth",
    desc: "Investors track returns while fueling financial inclusion.",
  },
  {
    icon: <Smartphone size={50} className="text-blue-600 mb-4" />,
    title: "Omni-channel Access",
    desc: "A seamless experience via USSD, API, Web & Mobile.",
  },
];

import {} from "lucide-react";

const services = [
  {
    icon: <Landmark size={30} className="text-blue-700" aria-hidden="true" />,
    title: "Microfinance Lenders & Digital Banks",
  },
  {
    icon: <Banknote size={30} className="text-blue-700" aria-hidden="true" />,
    title: "Fintech Startups & Cooperatives",
  },
  {
    icon: <Users size={30} className="text-blue-700" aria-hidden="true" />,
    title: "Employers with Large Workforces",
  },
  {
    icon: <Briefcase size={30} className="text-blue-700" aria-hidden="true" />,
    title: "Angel Investors & Impact Funds",
  },
];

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative px-6 lg:px-16 py-20 h-screen w-full bg-[#005cfa] overflow-hidden text-white">
        {/* Grid Background */}
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:40px_40px]",
            "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
            "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
          )}
        />
        {/* Overlay for radial mask */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#005cfa] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,#1e3a8a)] dark:bg-blue-900"></div>
        {/* Blue overlay for contrast */}
        <div className="absolute inset-0 bg-blue-600/40 z-10" />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#005cfa] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,#1e3a8a)] dark:bg-blue-900"></div>

        {/* Grid Container */}
        <div className="relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-20">
          {/* Left: Text Content */}
          <div className="flex flex-col items-center lg:items-start gap-6 text-center lg:text-left max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-6xl font-semibold leading-tight">
              Africa{"'"}s Unified Loan Infrastructure Engine
            </h1>
            <p className="text-[1rem] italic px-4 py-2 bg-white text-blue-600 rounded-full self-center lg:self-start">
              - Borrow Smarter. Lend Faster. Invest Confidently.
            </p>
            <p className="pt-2 text-[1rem]">
              We{"'"}re building the future of credit — accessible via USSD,
              Web, and Mobile, powered by automation and Backend-as-a-Service
              (BaaS).
            </p>
            <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start pt-2">
              <Link
                href="/auth/register"
                className="cta primary-cta rounded-md transition transform hover:scale-105 hover:shadow-lg"
              >
                Sign Up Now
              </Link>
              <Link
                href="/"
                className="cta secondary-cta rounded-md transition transform hover:scale-105 hover:shadow-lg"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right: Image */}
          <div className="flex justify-center lg:justify-end">
            <Image
              src="/hero.jpg"
              alt="Fintech Illustration"
              width={500}
              height={350}
              className="rounded-[15px] shadow-xl w-full max-w-[500px] h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Why Coast Link24 */}
      <section className="py-20 bg-gray-100 text-center text-gray-600 px-6 md:px-16">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-700 pb-6">
            Why Coast Link24?
          </h2>
          <span className="h-1 w-32 bg-gray-700"></span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyItems.map(({ icon, title, desc }, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow text-left"
            >
              {icon}
              <h3 className="text-xl font-semibold mb-2 text-blue-600">
                {title}
              </h3>
              <p className="text-gray-700">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white text-gray-600 px-6 lg:px-16">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-12 text-gray-700 pb-6">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-6 px-6 md:px-16">
          {items.map(({ title, desc, quote, img, url }, i) => (
            <Link
              href={url}
              className="bg-white rounded-xl hover:shadow-lg px-6 py-4 flex flex-col h-full"
            >
              {/* Image */}
              <div className="h-[15rem] w-full">
                <Image
                  src={img}
                  alt={title}
                  width={600}
                  height={300}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Content */}
              <div className="flex-1 space-y-3 mt-4">
                <h3 className="text-xl font-bold text-black">{title}</h3>
                <p className="text-sm">{desc}</p>
                <blockquote className="italic text-gray-500 text-sm">
                  “{quote}”
                </blockquote>
              </div>

              {/* Button */}
              <button className="mt-4 py-5 rounded-md bg-primary hover:bg-blue-500 font-semibold text-white text-center w-full">
                Explore →
              </button>
            </Link>
          ))}
        </div>

        {/* <div className="grid md:grid-cols-3 gap-10 px-6 max-w-7xl mx-auto"> */}
        {/* {items.map(({ title, desc, quote, img }, i) => (
            <motion.div
              key={i}
              whileHover="hover"
              initial="rest"
              animate="rest"
              className="relative rounded-xl overflow-hidden shadow-md transition-transform duration-300 hover:scale-[1.02]"
            > */}
        {/* Image */}
        {/* <div className="h-80 w-full">
                <Image
                  src={img}
                  alt={title}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div> */}

        {/* Overlay content */}
        {/* <motion.div
                variants={{
                  rest: { height: "5rem", opacity: 0.9 },
                  hover: {
                    height: "auto",
                    opacity: 1,
                    transition: { duration: 0.4, ease: "easeInOut" },
                  },
                }}
                className="absolute bottom-0 w-full bg-white backdrop-blur-md p-5"
              >
                <motion.h3
                  variants={{
                    rest: { opacity: 0.4, y: 10 },
                    hover: { opacity: 1, y: 0, transition: { delay: 0.1 } },
                  }}
                  className="text-xl font-bold text-black mb-2"
                >
                  {title}
                </motion.h3>
                <motion.p
                  variants={{
                    rest: { opacity: 0.4, y: 10 },
                    hover: { opacity: 1, y: 0, transition: { delay: 0.15 } },
                  }}
                  className="text-sm mb-2"
                >
                  {desc}
                </motion.p>
                <motion.blockquote
                  variants={{
                    rest: { opacity: 0.3, y: 10 },
                    hover: { opacity: 1, y: 0, transition: { delay: 0.2 } },
                  }}
                  className="italic text-gray-500 text-sm"
                >
                  “{quote}”
                </motion.blockquote>
              </motion.div> */}
        {/* </motion.div> */}
        {/* ))}
        </div> */}
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 md:px-16 bg-gray-50 text-center text-gray-600">
        <h2 className="text-2xl md:text-4xl font-bold mb-10 text-gray-700 pb-6">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
          {[
            ["Automated KYC + Credit Scoring", "/icons/kyc.png"],
            [
              "Real-time Disbursement & Repayment Tracking",
              "/icons/payment-tracking.png",
            ],
            [
              "USSD-as-a-Service (Lenders create & launch menus via app)",
              "/icons/phone-service.png",
            ],
            ["Mobile Admin App + Web Dashboard", "/icons/dashboard.png"],
            [
              "Loan History Check Across Multiple Lenders",
              "/icons/records.png",
            ],
            [
              "Multi-tenant Segregation with API Keys & Rate Limiting",
              "/icons/api.png",
            ],
            ["Role-based Data Downloads", "/icons/role.png"],
            [
              "Fully Embedded White-label UI or API Access",
              "/icons/api-access.png",
            ],
          ].map(([title, icon], index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow text-center hover:scale-[1.05] hover:shadow-lg transition-all duration-200 ease-in-out"
            >
              <Image
                src={icon}
                alt={title}
                width={80}
                height={80}
                className="mx-auto mb-4 p-5 bg-gray-50 rounded-md"
              />
              <p className="text-gray-700 text-sm">{title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Built For Section */}
      <section className="py-20 bg-blue-800 text-center text-white px-6 md:px-16">
        <h2 className="text-2xl md:text-4xl text-left font-extrabold mb-12 text-white pb-6">
          Built For:
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {services.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 p-6 bg-[#2257BF] shadow-sm border border-[#2257BF]"
            >
              <div className="bg-blue-100 p-3" aria-hidden="true">
                {item.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-100 text-white text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-6 text-gray-700">
          Ready to Join the Future of Lending?
        </h2>
        <div className="flex flex-wrap justify-center gap-4 px-6">
          {[
            ["Apply Now", "/auth/register"],
            ["Get Started", "/auth/register"],
            ["Download Pitch Deck", "/pitch-deck.pdf"],
            ["Partner With Us", "/partner"],
          ].map(([text, href], index) => (
            <Link
              key={index}
              href={href}
              className="bg-white text-indigo-600 font-semibold py-2 px-6 rounded-full shadow hover:bg-gray-300"
            >
              {text}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
