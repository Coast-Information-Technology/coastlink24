"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { postApiRequest } from "@/lib/apiRequest";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "react-toastify/dist/ReactToastify.min.css";
import { saveTokenToCookies } from "@/lib/cookies";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setErrors({});

    try {
      const data = await postApiRequest("/auth/jwt/create/", {
        email,
        password,
      });

      if (saveTokenToCookies(data.user.access_token)) {
        toast.success("Logged in successfully!");
        router.push("/dashboard");
      } else {
        throw new Error("Token could not be saved");
      }
    } catch (error: any) {
      console.error("Login Error:", error);

      let errorMessage = "An error occurred during login. Please try again.";
      try {
        const errorData = JSON.parse(error.message);
        errorMessage = errorData.detail || errorMessage;
      } catch {
        if (error.message) errorMessage = error.message;
      }

      setErrors({ general: errorMessage });
    } finally {
      setPending(false);
    }
  };

  return (
    <main className="flex m-0">
      {/* Sidebar */}
      <aside
        className="hidden lg:flex flex-col justify-center w-full h-screen gap-8 px-14 bg-primary"
        style={{
          backgroundImage: "url('/auth-bg.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "bottom right",
        }}
      >
        <Link href="/" className="flex gap-2 items-center text-white">
          <FaArrowCircleLeft /> <span>Go to Home</span>
        </Link>
        <Image
          src="/coastlink-brandlogo.png"
          alt="Coastlink logo"
          height={200}
          width={200}
        />
        <p className="text-white text-sm font-light w-[33vw]">
          Revolutionizing Lending Services with Cutting-Edge Technology. Manage
          loan requests, disbursements, and repayments through our innovative,
          user-friendly platform for both USSD and web users.
        </p>
      </aside>

      {/* Main Login Form */}
      <section className="h-screen w-full flex justify-center items-center bg-white">
        <ToastContainer />
        <div className="space-y-2 p-4 md:p-8 m-auto sm:w-[60vw] lg:w-[40vw]">
          <Link
            href="/"
            className="lg:hidden flex justify-center mb-6 p-4 bg-gradient-to-r from-indigo-500 to-blue-500 rounded"
          >
            <Image
              src="/coastlink-brandlogo.png"
              alt="Coastlink logo"
              height={100}
              width={100}
            />
          </Link>

          <div>
            <h2 className="text-lg text-black pb-3">Welcome back!</h2>
            <h1 className="text-2xl font-bold text-black">
              Login to Your Account
            </h1>
            <p className="text-[14px] text-gray-600 pt-1">
              Don’t have an account?{" "}
              <Link
                href="/auth/register"
                className="text-primary underline font-bold"
              >
                Sign Up
              </Link>
            </p>
          </div>

          {errors.general && (
            <div className="text-sm text-red-600 bg-red-100 p-3 rounded-md">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 pt-10">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                placeholder="Enter your email"
                className="w-full px-3 py-5 border border-gray-300 rounded-md dark:bg-white"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="w-full px-3 py-5 border border-gray-300 rounded-md pr-10 dark:bg-white"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={pending}
              className="w-full py-4 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white rounded-md"
            >
              {pending ? "Logging in..." : "Login"}
            </Button>
          </form>

          <p className="text-[10px] fixed bottom-8 left-14 text-white font-light">
            © 2024 Coast link24. All rights reserved.
          </p>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
