import React from "react";
import styles from "./styles/landing.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
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
            Revolutionizing Lending Services with Cutting-Edge Technology.
            Manage loan requests, disbursements, and repayments through our
            innovative, user-friendly platform for both USSD and web users.
          </p>

          <div className="flex items-center justify-center pt-4 gap-4">
            <Link
              href="/auth/register"
              className="cta primary-cta rounded-md transition transform hover:scale-105 hover:shadow-lg"
            >
              Sign Up Now
            </Link>

            <Link
              href="/"
              className="cta secondary-cta transition transform hover:scale-105 hover:shadow-lg rounded-md"
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

      {/* Intro Section */}
      <section className="text-center py-16 px-6 bg-white text-gray-600">
        <h2 className="text-3xl font-bold mb-4 text-black">
          Africa’s Unified Loan Infrastructure Engine
        </h2>
        <p className="text-xl max-w-3xl mx-auto mb-6">
          Borrow Smarter. Lend Faster. Invest Confidently.
        </p>
        <p className="text-md max-w-2xl mx-auto">
          We’re building the future of credit — accessible via USSD, Web, and
          Mobile, powered by automation and Backend-as-a-Service (BaaS).
        </p>
      </section>

      {/* Why Coast Link24 */}
      <section
        className="py-20 bg-gray-50 text-center text-gray-600"
        style={{
          backgroundImage: "url('/ecosystems.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <h2 className="text-3xl font-bold mb-10 text-white">
          Why Coast Link24?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
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
        <div className="relative px-6 max-w-6xl mx-auto space-y-16">
          {/* Vertical connecting line */}
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-1 bg-gray-200 transform -translate-x-1/2 z-0" />

          {[
            [
              "FOR BORROWERS",
              "Access loans from anywhere — even without internet. Use our shortcode or mobile/web app to apply, get scored, and receive disbursement instantly.",
              "Dial. Apply. Receive. Repay. Done.",
              "/happy-borrower.jpg",
            ],
            [
              "FOR LENDERS",
              "Launch a loan product with zero tech overhead. Manage your borrowers, repayments, and scoring from a smart dashboard or mobile app. Need custom UI or API-only integration? You’re covered.",
              "Plug in and lend. Coast Link24 handles the rest.",
              "/partners.jpg",
            ],
            [
              "FOR INVESTORS",
              "Invest in vetted lenders and portfolios. Track your money, returns, and performance from a clean dashboard. We offer transparency, risk tagging, and insights.",
              "Don’t build a loan app — fund the one that powers them all.",
              "/investors.jpg",
            ],
          ].map(([title, desc, quote, img], i) => {
            const isEven = i % 2 !== 0;

            return (
              <div
                key={i}
                className={`relative z-10 flex flex-col md:flex-row items-center ${
                  isEven ? "md:flex-row-reverse" : ""
                } gap-8`}
              >
                {/* Connector dot */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-blue-600 rounded-full z-20" />

                {/* Text */}
                <div className="md:w-1/2">
                  <h3 className="text-xl font-bold mb-2 text-black">{title}</h3>
                  <p className="mb-4">{desc}</p>
                  <blockquote className="italic text-gray-600">
                    “{quote}”
                  </blockquote>
                </div>

                {/* Image */}
                <div className="md:w-1/2">
                  <Image
                    src={img}
                    alt={title}
                    width={600}
                    height={400}
                    className="w-full rounded-xl object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 text-center text-gray-600">
        <h2 className="text-3xl font-bold mb-10 text-black">Key Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
          {[
            "Automated KYC + Credit Scoring",
            "Real-time Disbursement & Repayment Tracking",
            "USSD-as-a-Service (Lenders create & launch menus via app)",
            "Mobile Admin App + Web Dashboard",
            "Loan History Check Across Multiple Lenders",
            "Multi-tenant Segregation with API Keys & Rate Limiting",
            "Role-based Data Downloads",
            "Fully Embedded White-label UI or API Access",
          ].map((feature, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <p className="text-gray-700">{feature}</p>
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
              className="bg-white text-gray-700 py-4 px-8 rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <div className="text-xl mb-2">{item.icon}</div>
              {item.label}
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-indigo-600 text-white text-center">
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
