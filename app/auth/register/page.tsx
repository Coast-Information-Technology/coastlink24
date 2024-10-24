"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Eye, EyeOff, Lock, Mail, Phone } from "lucide-react";
import { FaArrowCircleLeft } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import { signUpSchema } from "@/utils/zodDefinition";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { emailPasswordResetLink, postApiRequest } from "@/lib/apiRequest";
import "react-toastify/dist/ReactToastify.min.css";
import { ZodError } from "zod";

const INITIAL_FORM_DATA = {
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
};

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [pending, setPending] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Input change handler
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setPending(true);
    setErrors({});

    const validationResult = signUpSchema.safeParse(formData);
    if (!validationResult.success) {
      const formErrors = validationResult.error.errors.reduce(
        (acc, error) => ({ ...acc, [error.path[0] as string]: error.message }),
        {}
      );
      setErrors(formErrors);
      setPending(false);
      return;
    }

    try {
      const response = await postApiRequest("/api/signup/", {
        email: formData.email,
        phone_number: formData.phoneNumber,
        password: formData.password,
      });

      if (response.data) {
        toast.success("Signup successful, please verify your email address");
        setCountdown(180); // Start 3-minute countdown for resending the link
      } else {
        throw new Error(response.message || "An unexpected error occurred");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      setErrors({ general: errorMessage });
      toast.error(errorMessage);
    } finally {
      setPending(false);
    }
  };

  // Countdown logic
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  // Handle resend activation link
  const handleResendActivationLink = async () => {
    try {
      await emailPasswordResetLink(formData.email);
      setCountdown(180);
      toast.success("Activation link resent. Please check your email.");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to resend activation link";
      setErrors({ general: errorMessage });
      toast.error(errorMessage);
    }
  };

  return (
    <main className="flex m-0">
      {/* Sidebar */}
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
            alt="coast link logo"
            height={250}
            width={250}
          />
          {/* <h1 className="text-white font-semibold pr-20 text-[2.7rem]">
            Coastlink 24
          </h1> */}
        </div>
        <p className="text-white text-[1rem] font-extralight text-justify w-[33vw]">
          Get instant access to instant cash loans for emergency and personal
          loan within the next 24hrs. Service is available to federal and state
          civil servants under the remita payroll.
        </p>
      </div>

      {/* Main section */}
      <section className="h-screen w-full flex justify-center items-center bg-background dark:bg-[#222222]">
        <ToastContainer />
        <div className="space-y-2 p-6 md:p-8 rounded-md shadow-lg lg:shadow-none m-auto md:min-w-[35vw] dark:bg-[#272727]">
          <Link
            href="/"
            className="lg:hidden flex items-center justify-center p-4 text-white text-2xl font-bold gap-2 bg-gradient-to-r from-orange-300 to-red-600 dark:from-indigo-500 dark:via-sky-500 dark:to-emerald-500"
          >
            <Image
              src="/coastlink-brandlogo.png"
              alt="coast link logo"
              height={150}
              width={150}
            />
            {/* <p>Coastlink 24</p> */}
          </Link>
          <h1 className="text-2xl font-bold">Create a New Account</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm pb-6">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-primary dark:text-emerald-500 font-bold underline"
            >
              Login
            </Link>
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              id="email"
              type="email"
              placeholder="m@example.com"
              icon={<Mail size={22} color="#bbb" />}
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
            />
            <InputField
              id="phoneNumber"
              type="tel"
              placeholder="080xxxxxxxx"
              icon={<Phone size={22} color="#bbb" />}
              value={formData.phoneNumber}
              onChange={handleInputChange}
              error={errors.phoneNumber}
            />
            <PasswordField
              id="password"
              placeholder="Password"
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
            />
            <PasswordField
              id="confirmPassword"
              placeholder="Confirm Password"
              showPassword={showConfirmPassword}
              onTogglePassword={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              value={formData.confirmPassword}
              onChange={handleInputChange}
              error={errors.confirmPassword}
            />

            {/* Submit Button */}
            <Button
              disabled={pending || countdown > 0}
              onClick={countdown > 0 ? handleResendActivationLink : undefined}
              className="w-full primary-button dark:bg-emerald-500"
            >
              {countdown > 0
                ? `Resend Activation Link in ${Math.floor(countdown / 60)
                    .toString()
                    .padStart(2, "0")}:${(countdown % 60)
                    .toString()
                    .padStart(2, "0")}`
                : pending
                ? "Resend Activation Link"
                : "Sign Up"}
            </Button>
          </form>

          <p className="text-[10px] fixed bottom-8 left-14 text-white font-light">
            © 2024 Sharp Credit. All rights reserved.
          </p>
        </div>
      </section>
    </main>
  );
};

export default SignUpPage;

// Reusable InputField component
const InputField: React.FC<{
  id: string;
  type: string;
  placeholder: string;
  icon: React.ReactNode;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}> = ({ id, type, placeholder, icon, value, onChange, error }) => (
  <div className="relative">
    <Input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      className="pl-10"
      placeholder={placeholder}
    />
    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
      {icon}
    </div>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

// Reusable PasswordField component
const PasswordField: React.FC<{
  id: string;
  placeholder: string;
  showPassword: boolean;
  onTogglePassword: () => void;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}> = ({
  id,
  placeholder,
  showPassword,
  onTogglePassword,
  value,
  onChange,
  error,
}) => (
  <div className="relative">
    <Input
      id={id}
      type={showPassword ? "text" : "password"}
      value={value}
      onChange={onChange}
      className="pl-10 pr-10"
      placeholder={placeholder}
    />
    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
      <Lock size={22} color="#bbb" />
    </div>
    <div
      className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
      onClick={onTogglePassword}
    >
      {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
    </div>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);
