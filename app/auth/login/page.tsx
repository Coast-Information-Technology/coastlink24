"use client";

import React, { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { postApiRequest } from "@/lib/apiRequest";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "react-toastify/dist/ReactToastify.min.css";

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setErrors({});

    try {
      const response = await postApiRequest("/auth/login", formData);

      if (response.success) {
        toast.success("Login successful!");
        router.push("/dashboard");
      } else {
        setErrors(response.errors);
        toast.error(response.message || "Login failed!");
      }
    } catch (error) {
      toast.error("An error occurred while logging in.");
    } finally {
      setPending(false);
    }
  };

  return (
    <main className="flex m-0">
      {/* Left Sidebar - Hidden on mobile */}
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
        </div>
        <p className="text-white text-[14px] font-extralight text-justify w-[33vw]">
          Revolutionizing Lending Services with Cutting-Edge Technology. Manage
          loan requests, disbursements, and repayments through our innovative,
          user-friendly platform for both USSD and web users.
        </p>
      </div>

      {/* Right Content Section */}
      <section className="h-screen w-full flex justify-center items-center bg-white">
        <ToastContainer />
        <div className="space-y-4 p-6 md:p-8 rounded-md shadow-lg lg:shadow-none m-auto md:w-[35vw]">
          {/* Mobile Logo - Hidden on desktop */}
          <Link
            href="/"
            className="lg:hidden flex items-center justify-center p-4 text-white text-2xl font-bold gap-2 bg-gradient-to-r from-indigo-500 to-blue-500"
          >
            <Image
              src="/coastlink-brandlogo.png"
              alt="coastlink24 brand logo"
              height={150}
              width={150}
            />
          </Link>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-black">Login to Your Account</h1>
            <p className="text-gray-500 text-[12px]">
              Don{"'"}t have an account?{" "}
              <Link
                href="/auth/register"
                className="text-indigo-600 font-bold underline"
              >
                Sign Up
              </Link>
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5 mt-6">
            <InputField
              id="email"
              type="email"
              placeholder="Enter your email"
              icon={<Mail size={22} color="#bbb" />}
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
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

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={pending}
              className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white hover:bg-indigo-600 hover:to-blue-600 w-full py-6 rounded-md transition ease-in-out duration-150"
            >
              {pending ? "Logging in..." : "Login"}
            </Button>
          </form>

          <p className="text-[10px] fixed bottom-8 left-14 text-gray-500 font-light">
            © 2024 Coastlink24. All rights reserved.
          </p>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;

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
      className="pl-10 bg-white border-[1px] border-[#ccc] rounded-md p-3 w-full focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
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
      className="pl-10 pr-10 bg-white border-[1px] border-[#ccc] rounded-md p-3 w-full focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
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
