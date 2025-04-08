"use client";

import React, { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { postApiRequest } from "@/lib/apiRequest";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";
import { FaArrowCircleLeft } from "react-icons/fa";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(300); // 5 minutes countdown
  const [errors, setErrors] = useState<any>({});
  const router = useRouter();

  // Countdown logic for resending the email
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (emailSent && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }

    if (countdown === 0 && interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [emailSent, countdown]);

  // Handle sending forgot password email
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await postApiRequest("/api/borrowers/forgot-password/", {
        email,
      });
      // console.log("Response data:", data);
      toast.success("Password recovery email sent successfully!");
      setEmailSent(true); // Set emailSent to true when email is sent successfully
      setCountdown(300); // Reset the countdown to 5 minutes (300 seconds)
    } catch (error: any) {
      console.error("Login error:", error.message);
      toast.error(error.message || "Failed to send password recovery email");
    } finally {
      setLoading(false);
    }
  };

  // Handle resending the email after cooldown
  const handleResendEmail = async () => {
    try {
      const data = await postApiRequest("/api/resend_activation_email/", {
        email,
      });
      toast.success("Activation email resent successfully!");
      setCountdown(300); // Reset the countdown to 5 minutes after resend
    } catch (error: any) {
      toast.error("Failed to resend the activation email");
    }
  };

  // Format the countdown as MM:SS
  const formatCountdown = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <main className="flex m-0">
      <ToastContainer />
      {/* Left section */}
      <div
        className="hidden lg:flex flex-col pl-14 pr-24 justify-center w-full h-[100vh] gap-8 bg-primary"
        style={{
          backgroundImage: "url('/shape.png')",
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
            alt="coastlink 24 brand logo"
            height={60}
            width={60}
          />
          <h1 className="text-white font-semibold pr-20 text-[2.7rem]">
            Coastlink 24
          </h1>
        </div>
        <p className="text-white text-[1rem] font-extralight text-justify w-[33vw]">
          Revolutionizing Lending Services with Cutting-Edge Technology. Manage
          loan requests, disbursements, and repayments through our innovative,
          user-friendly platform for both USSD and web users.
        </p>
      </div>

      {/* Right section */}
      <section className="w-full h-[100vh] flex items-center justify-center bg-background dark:bg-[#222222] overflow-hidden">
        <form
          onSubmit={handleLogin}
          className="space-y-4 shadow-xl lg:shadow-none mx-auto min-w-[90vw] md:min-w-[35vw] p-10 rounded-md dark:bg-[#272727]"
          aria-label="login-form"
        >
          <Link href="/" aria-label="homepage">
            <div className="flex lg:hidden items-center justify-center p-4 rounded-md text-white font-bold text-2xl gap-2 bg-gradient-to-r from-orange-300 via-orange-400 to-red-600 dark:from-indigo-500 dark:via-sky-500 dark:to-emerald-500">
              <Image
                src="/assets/sharp_credit.webp"
                alt="Coastlink24 brand logo"
                height={50}
                width={50}
              />
              <p>Coastlink24</p>
            </div>
          </Link>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold dark:text-foreground">
              Forgot Your Password!
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Enter your email to reset your password.
            </p>
          </div>

          {emailSent ? (
            <div>
              <p className="text-black dark:text-white text-center text-base max-w-full px-6 md:px-0 md:max-[50vw] lg:text-lg lg:max-w-[40vw]">
                A password recovery email has been sent to your email. Please
                check your inbox folder.
              </p>
              <Button
                onClick={handleResendEmail}
                disabled={countdown > 0}
                className="w-full primary-button dark:bg-emerald-500"
              >
                {countdown > 0
                  ? `Resend in ${formatCountdown(countdown)}`
                  : "Resend Activation Email"}
              </Button>
            </div>
          ) : (
            <div>
              <div className="dark:text-foreground pt-7">
                <div className="border-b border-gray-300 flex items-center gap-2">
                  <Mail size={22} color="#bbb" />
                  <Input
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    type="email"
                    className="border-b-0 border-gray-300 bg-transparent"
                  />
                </div>
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>

              {errors.general && (
                <p className="text-red-500">{errors.general}</p>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full primary-button dark:bg-emerald-500"
              >
                {loading ? (
                  <span className="flex items-center">
                    Sending...{" "}
                    <span className="mx-2 w-4 h-4 border-2 border-t-2 border-white rounded-full spin"></span>
                  </span>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </div>
          )}

          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Remember your password?{" "}
            <span className="text-primary dark:text-emerald-500 font-bold underline">
              <Link href="/login">Login</Link>
            </span>
          </p>
        </form>

        <p className="text-[10px] fixed bottom-8 left-14 text-white pt-6 font-light">
          © 2024 Coastlink24. All rights reserved.
        </p>
      </section>
    </main>
  );
};

export default ForgotPasswordPage;
