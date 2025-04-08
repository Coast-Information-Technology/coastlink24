"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { postApiRequest } from "@/lib/apiRequest";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Lock } from "lucide-react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { TbEyeClosed } from "react-icons/tb";
import { deleteTokenFromCookies, getTokenFromCookies } from "@/lib/cookies";

// Define the form error interface
interface LoginFormErrors {
  newPassword?: string;
  confirmPassword?: string;
  general?: string;
}

const CreateNewPasswordPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const router = useRouter();

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  // Password validation regex
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[$/@%#!&?\\]).+$/;

  // Validate form inputs
  const validateForm = () => {
    const newErrors: LoginFormErrors = {};

    if (!passwordRegex.test(newPassword)) {
      newErrors.newPassword =
        "Password must start with a capital letter, include a number, and a symbol (e.g., $, /, @, %, #, !, &, ?).";
    }

    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  // Handle form submission
  const handleNewPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const token = getTokenFromCookies();

      if (!token) {
        throw new Error("Token not found. Please verify OTP again.");
      }

      const payload = {
        new_password: newPassword,
        confirm_password: confirmPassword,
        token, // Pass the token in the body instead of the headers
      };

      await postApiRequest("/api/borrowers/password-reset/", payload); // Token is now in the body

      toast.success("Password created successfully!");

      // Delete token from cookies after successful password reset
      deleteTokenFromCookies();

      setTimeout(() => {
        router.push("/dashboard");
      }, 500);
    } catch (error: any) {
      console.error("Error creating password:", error.message);
      toast.error(error.message || "Failed to create new password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex m-0">
      <ToastContainer />
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
      <section className="w-full h-[100vh] flex items-center justify-center bg-background dark:bg-[#222222]">
        <form
          onSubmit={handleNewPassword}
          className="space-y-4 shadow-xl lg:shadow-none mx-auto w-[90vw] md:w-[35vw] p-10 rounded-md dark:bg-[#272727]"
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
              Create New Password
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Set your new password below.
            </p>
          </div>

          <PasswordInput
            label="New Password"
            id="new-password"
            value={newPassword}
            onChange={setNewPassword}
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
            error={errors.newPassword}
          />

          <PasswordInput
            label="Confirm New Password"
            id="confirm-password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            showPassword={showConfirmPassword}
            togglePasswordVisibility={toggleConfirmPasswordVisibility}
            error={errors.confirmPassword}
          />

          {errors.general && <p className="text-red-500">{errors.general}</p>}

          <Button
            type="submit"
            disabled={loading}
            className="w-full primary-button dark:bg-emerald-500"
          >
            {loading ? (
              <span className="flex items-center">
                Creating New Password...
                <span className="spin mx-2 w-4 h-4 border-2 border-t-2 border-white rounded-full"></span>
              </span>
            ) : (
              "Create new password"
            )}
          </Button>
        </form>

        <footer className="fixed bottom-8 left-14 text-white font-light">
          © 2024 Coastlink24. All rights reserved.
        </footer>
      </section>
    </main>
  );
};

// Password Input component
interface PasswordInputProps {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
  error?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  id,
  value,
  onChange,
  showPassword,
  togglePasswordVisibility,
  error,
}) => (
  <div className="dark:text-foreground">
    <label htmlFor={id} className="sr-only">
      {label}
    </label>
    <div className="border-b border-gray-300 flex items-center gap-2">
      <Lock size={22} color="#bbb" />
      <Input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={label}
        required
        type={showPassword ? "text" : "password"}
        className="border-b-0 border-gray-300 bg-transparent"
      />
      {showPassword ? (
        <Eye
          size={22}
          onClick={togglePasswordVisibility}
          className="cursor-pointer"
        />
      ) : (
        <TbEyeClosed
          size={22}
          onClick={togglePasswordVisibility}
          className="cursor-pointer"
        />
      )}
    </div>
    {error && <p className="text-red-500">{error}</p>}
  </div>
);

export default CreateNewPasswordPage;
