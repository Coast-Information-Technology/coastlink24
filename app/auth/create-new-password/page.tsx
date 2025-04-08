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
import { Eye, EyeOff, Lock, CheckCircle, XCircle } from "lucide-react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { deleteTokenFromCookies, getTokenFromCookies } from "@/lib/cookies";

// Define the form error interface
interface LoginFormErrors {
  newPassword?: string;
  confirmPassword?: string;
  general?: string;
}

// Password requirement interface
interface PasswordRequirement {
  id: string;
  label: string;
  regex: RegExp;
  met: boolean;
}

const CreateNewPasswordPage: React.FC = () => {
  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Password values
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Error states
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  
  // Password requirements
  const [passwordRequirements, setPasswordRequirements] = useState<PasswordRequirement[]>([
    { id: "length", label: "At least 8 characters", regex: /.{8,}/, met: false },
    { id: "uppercase", label: "At least one uppercase letter", regex: /[A-Z]/, met: false },
    { id: "lowercase", label: "At least one lowercase letter", regex: /[a-z]/, met: false },
    { id: "number", label: "At least one number", regex: /[0-9]/, met: false },
    { id: "special", label: "At least one special character", regex: /[!@#$%^&*?\\/]/, met: false },
  ]);
  
  // Loading state
  const [loading, setLoading] = useState(false);
  
  // Password strength indicator
  const [passwordStrength, setPasswordStrength] = useState(0);
  
  const router = useRouter();

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

  // Calculate password strength
  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 20;
    if (password.length >= 12) strength += 10;
    
    // Character type checks
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[a-z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 20;
    if (/[!@#$%^&*?\\/]/.test(password)) strength += 10;
    
    return Math.min(strength, 100);
  };

  // Update password requirements
  const updatePasswordRequirements = (password: string) => {
    setPasswordRequirements(prev => 
      prev.map(req => ({
        ...req,
        met: req.regex.test(password)
      }))
    );
    
    setPasswordStrength(calculatePasswordStrength(password));
  };

  // Validate new password
  const validateNewPassword = (value: string): boolean => {
    // Update requirements
    updatePasswordRequirements(value);
    
    // Check if all requirements are met
    const allRequirementsMet = passwordRequirements.every(req => req.met);
    
    if (!allRequirementsMet) {
      setNewPasswordError("Password does not meet all requirements");
      return false;
    }
    
    setNewPasswordError("");
    return true;
  };

  // Validate confirm password
  const validateConfirmPassword = (value: string): boolean => {
    if (!value) {
      setConfirmPasswordError("Please confirm your password");
      return false;
    }
    
    if (value !== newPassword) {
      setConfirmPasswordError("Passwords do not match");
      return false;
    }
    
    setConfirmPasswordError("");
    return true;
  };

  // Validate entire form
  const validateForm = (): boolean => {
    const isNewPasswordValid = validateNewPassword(newPassword);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);
    
    return isNewPasswordValid && isConfirmPasswordValid;
  };

  // Handle form submission
  const handleNewPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGeneralError("");

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
        token,
      };

      await postApiRequest("/api/borrowers/password-reset/", payload);

      toast.success("Password created successfully!");

      // Delete token from cookies after successful password reset
      deleteTokenFromCookies();

      setTimeout(() => {
        router.push("/dashboard");
      }, 500);
    } catch (error: any) {
      console.error("Error creating password:", error.message);
      setGeneralError(error.message || "Failed to create new password");
      toast.error(error.message || "Failed to create new password");
    } finally {
      setLoading(false);
    }
  };

  // Get strength color based on percentage
  const getStrengthColor = (strength: number): string => {
    if (strength < 40) return "bg-red-500";
    if (strength < 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <main className="flex m-0">
      <ToastContainer />
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
            alt="coastlink 24 brand logo"
            height={60}
            width={60}
          />
        </div>
        <p className="text-white text-[14px] font-extralight text-justify w-[33vw]">
          Revolutionizing Lending Services with Cutting-Edge Technology. Manage
          loan requests, disbursements, and repayments through our innovative,
          user-friendly platform for both USSD and web users.
        </p>
      </div>
      <section className="w-full h-[100vh] flex items-center justify-center bg-background dark:bg-[#222222]">
        <form
          onSubmit={handleNewPassword}
          className="space-y-6 shadow-xl lg:shadow-none mx-auto w-[90vw] md:w-[35vw] p-10 rounded-md dark:bg-[#272727]"
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

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="newPassword" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              New Password
            </label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  validateNewPassword(e.target.value);
                }}
                className="pr-10"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-blue-500 transition"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {newPasswordError && (
              <p className="text-red-500 text-xs">{newPasswordError}</p>
            )}
            
            {/* Password Strength Indicator */}
            {newPassword && (
              <div className="mt-2">
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-gray-500">Password Strength</span>
                  <span className="text-xs font-medium">{passwordStrength}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div 
                    className={`h-2.5 rounded-full ${getStrengthColor(passwordStrength)}`} 
                    style={{ width: `${passwordStrength}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            {/* Password Requirements */}
            <div className="mt-4 space-y-2">
              <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Password Requirements:</p>
              <ul className="space-y-1">
                {passwordRequirements.map((req) => (
                  <li key={req.id} className="flex items-center text-xs">
                    {req.met ? (
                      <CheckCircle className="mr-2 text-green-500" size={16} />
                    ) : (
                      <XCircle className="mr-2 text-red-500" size={16} />
                    )}
                    <span className={req.met ? "text-green-700" : "text-gray-500"}>
                      {req.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirm Password
            </label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  validateConfirmPassword(e.target.value);
                }}
                className="pr-10"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-blue-500 transition"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {confirmPasswordError && (
              <p className="text-red-500 text-xs">{confirmPasswordError}</p>
            )}
          </div>

          {generalError && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
              {generalError}
            </div>
          )}

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

export default CreateNewPasswordPage;