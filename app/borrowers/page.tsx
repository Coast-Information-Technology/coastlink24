"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const BorrowersPage = () => {
  return (
    <section className="space-y-28 py-16 px-6 md:px-20">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid md:grid-cols-2 items-center gap-12"
      >
        <div className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
            Access Loans in Minutes — Anytime, Anywhere.
          </h1>
          <p className="text-gray-600">
            Whether you{"'"}re a business owner, salary earner, student, or
            trader — Coast Link24 connects you to trusted lenders offering quick
            and affordable loans via USSD, web, or mobile app.
          </p>
        </div>
        <Image
          src="/images/loan-hero.png"
          alt="Loan access"
          width={500}
          height={500}
          className="mx-auto"
        />
      </motion.div>

      {/* Loan Methods */}
      <div className="space-y-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900">
          Multiple Ways to Apply for a Loan
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              title: "USSD – For Feature Phones or Offline Users",
              icon: "/images/ussd.png",
              desc: [
                "Dial our shortcode: *123#",
                "Apply for a loan instantly",
                "Check loan approval status",
                "Repay using your phone",
                "No data needed",
                "\nBuilt for: market traders, artisans, rural users, and low-bandwidth areas.",
              ],
            },
            {
              title: "Via Mobile App – Lender or Coast App",
              icon: "/images/mobile-app.png",
              desc: [
                "Download your lender’s app or Coast Link24 App",
                "Fill a quick form",
                "Get scored and approved instantly",
                "Track and repay your loan",
                "\nBuilt for: smartphone users, repeat borrowers, tech-savvy users.",
              ],
            },
            {
              title: "Through Web Portal",
              icon: "/images/web-portal.png",
              desc: [
                "Apply via your lender’s custom loan page or Coast Link24 portal",
                "View all available loan offers",
                "Compare repayment plans",
                "Accept the best deal",
                "Get disbursed in minutes",
              ],
            },
          ].map((method, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-white rounded-xl shadow-md p-6 space-y-4 text-center"
            >
              <Image
                src={method.icon}
                alt={method.title}
                width={60}
                height={60}
                className="mx-auto"
              />
              <h3 className="text-lg font-semibold text-gray-800">
                {method.title}
              </h3>
              <ul className="text-gray-600 text-sm space-y-1 text-left">
                {method.desc.map((d, j) => (
                  <li key={j}>• {d}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Automation Explanation */}
      <div className="grid md:grid-cols-2 items-center gap-12">
        <Image
          src="/images/automation.png"
          alt="Automation"
          width={500}
          height={500}
          className="mx-auto"
        />
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            No Middlemen. No Delays.
          </h2>
          <p className="text-gray-600">We use automated systems to:</p>
          <ul className="list-disc list-inside text-gray-600">
            <li>Verify your identity (BVN, NIN, phone number)</li>
            <li>Score your eligibility</li>
            <li>Match you with the best lender</li>
            <li>Disburse to your wallet or bank account fast</li>
          </ul>
        </div>
      </div>

      {/* What You Need */}
      <div className="bg-gray-50 py-12 px-6 rounded-xl shadow-inner">
        <h3 className="text-xl font-semibold text-center mb-4">
          What You Need to Apply
        </h3>
        <div className="grid md:grid-cols-4 gap-4 text-center">
          {[
            "Your BVN or NIN",
            "A valid phone number",
            "A mobile wallet or bank account",
            "(Optional) Utility bill or ID photo",
          ].map((req, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-lg border shadow-sm text-gray-700"
            >
              {req}
            </div>
          ))}
        </div>
      </div>

      {/* Repayment */}
      <div className="space-y-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Repayment is Easy
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Repay via USSD, auto-debit from wallet or bank, or click a paylink
          sent to your phone. You’ll get SMS/email reminders before due dates.
        </p>
      </div>

      {/* Score Benefit */}
      <div className="bg-blue-50 p-8 rounded-xl text-center space-y-4">
        <h3 className="text-xl font-semibold text-blue-900">
          Borrow Responsibly. Build Your Score.
        </h3>
        <p className="text-blue-800">
          The better you repay, the higher your next loan amount, the lower your
          interest, and the more trust you earn across lenders.
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-wrap justify-center gap-4 pt-6">
        <Button className="bg-primary text-white px-6 py-4 rounded-md">
          Dial *123#
        </Button>
        <Button variant="outline" className="px-6 py-4 rounded-md">
          <Link href="/apply">Apply Online</Link>
        </Button>
        <Button variant="secondary" className="px-6 py-4 rounded-md">
          <Link href="/download">Download the App</Link>
        </Button>
      </div>
    </section>
  );
};

export default BorrowersPage;
