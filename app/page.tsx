"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const items = [
  {
    title: "FOR BORROWERS",
    desc: "Access loans from anywhere — even without internet. Use our shortcode or mobile/web app to apply, get scored, and receive disbursement instantly.",
    quote: "Dial. Apply. Receive. Repay. Done.",
    img: "/happy-borrower.jpg",
  },
  {
    title: "FOR LENDERS",
    desc: "Launch a loan product with zero tech overhead. Manage your borrowers, repayments, and scoring from a smart dashboard or mobile app. Need custom UI or API-only integration? You’re covered.",
    quote: "Plug in and lend. Coast Link24 handles the rest.",
    img: "/lenders.avif",
  },
  {
    title: "FOR INVESTORS",
    desc: "Invest in vetted lenders and portfolios. Track your money, returns, and performance from a clean dashboard. We offer transparency, risk tagging, and insights.",
    quote: "Don’t build a loan app — fund the one that powers them all.",
    img: "/investors.jpg",
  },
];

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section
        className="relative section-padding-block section-padding-block-start pt-2 overflow-hidden bg-cover bg-no-repeat bg-bottom"
        style={{
          backgroundImage: "url('/hero-bg.png')",
          backgroundPosition: "bottom center",
          height: "100vh",
        }}
      >
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-blue-500/70 z-10" />

        {/* Hero Content */}
        <div className="relative z-20 grid lg:grid-cols-2 items-center text-white text-center lg:text-left gap-8 px-4">
          <div>
            <h1 className="primary-heading text-white">
              Africa{"'"}s Unified Loan Infrastructure Engine
            </h1>
            <p className="text-[1.2rem] italic pt-2">
              - Borrow Smarter. Lend Faster. Invest Confidently.
            </p>
            <p className="pt-6">
              We{"'"}re building the future of credit — accessible via USSD,
              Web, and Mobile, powered by automation and Backend-as-a-Service
              (BaaS).
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start pt-6 gap-4">
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

          {/* Optional Image or illustration */}
          <div className="relative z-20 pt-6">
            <Image
              src="/africa-unified-image.png"
              alt="Fintech Illustration"
              width={700}
              height={600}
              className="rounded-2xl shadow-xl mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Intro Section */}
      {/* <section className="text-center py-16 px-6 bg-white text-gray-600">
        <h2 className="text-3xl font-bold mb-4 text-black">
          Africa{"'"}s Unified Loan Infrastructure Engine
        </h2>
        <p className="text-xl max-w-3xl mx-auto mb-6">
          Borrow Smarter. Lend Faster. Invest Confidently.
        </p>
        <p className="text-md max-w-2xl mx-auto">
          We{"'"}re building the future of credit — accessible via USSD, Web,
          and Mobile, powered by automation and Backend-as-a-Service (BaaS).
        </p>
      </section> */}

      {/* Why Coast Link24 */}
      <section
        className="py-20 bg-gray-50 text-center text-gray-600"
        // style={{
        //   backgroundImage: "url('/ecosystems.webp')",
        //   backgroundRepeat: "no-repeat",
        //   backgroundSize: "cover",
        //   backgroundPosition: "center center",
        // }}
      >
        <h2 className="text-3xl font-bold mb-10 text-black">
          Why Coast Link24?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 md:px-28">
          {[
            [
              "Multi-Lender Marketplace",
              "Borrowers get matched with best-fit lenders instantly.",
            ],
            [
              "BaaS for Lenders",
              "Build & scale your digital lending system in days, not months.",
            ],
            [
              "Funding for Growth",
              "Investors track returns while fueling financial inclusion.",
            ],
            [
              "Omni-channel Access",
              "A seamless experience via USSD, API, Web & Mobile.",
            ],
          ].map(([title, desc], index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2 text-black">{title}</h3>
              <p className="text-gray-700">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white text-gray-600">
        <h2 className="text-3xl font-bold text-center mb-12 text-black">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-10 px-6 max-w-7xl mx-auto">
          {items.map(({ title, desc, quote, img }, i) => (
            <motion.div
              key={i}
              whileHover="hover"
              initial="rest"
              animate="rest"
              className="relative rounded-xl overflow-hidden shadow-md transition-transform duration-300 hover:scale-[1.02]"
            >
              {/* Image */}
              <div className="h-80 w-full">
                <Image
                  src={img}
                  alt={title}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlay content */}
              <motion.div
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
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 text-center text-gray-600">
        <h2 className="text-3xl font-bold mb-10 text-black">Key Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
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
            ], // fixed path typo
          ].map(([title, icon], index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow text-center"
            >
              <Image
                src={icon}
                alt={title}
                width={80}
                height={80}
                className="mx-auto mb-4"
              />
              <p className="text-gray-700 text-sm">{title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Built For Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-indigo-600 text-center text-white">
        <h2 className="text-4xl font-extrabold mb-6 text-white">Built For:</h2>
        <div className="flex flex-wrap justify-center gap-8 px-6">
          {[
            { label: "Microfinance Lenders & Digital Banks", icon: "🏦" },
            { label: "Fintech Startups & Cooperatives", icon: "💡" },
            { label: "Employers with Large Workforces", icon: "👥" },
            { label: "Angel Investors & Impact Funds", icon: "💼" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white text-gray-700 p-10 font-bold uppercase rounded-md shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <div className="text-xl mb-2">{item.icon}</div>
              {item.label}
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-800 text-white text-center">
        <h2 className="text-3xl font-bold mb-6 text-white">
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
              className="bg-white text-indigo-600 font-semibold py-2 px-6 rounded-full shadow hover:bg-gray-100"
            >
              {text}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
