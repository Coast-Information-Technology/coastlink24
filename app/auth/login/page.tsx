"use client";

import React, { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import { Eye, EyeOff, Phone, Lock } from "lucide-react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { postApiRequest } from "@/lib/apiRequest";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<{
    phoneNumber?: string;
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
          Revolutionizing Lending Services with Cutting-Edge Technology. Manage
          loan requests, disbursements, and repayments through our innovative,
          user-friendly platform for both USSD and web users.
        </p>
      </div>

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
          <h1 className="text-2xl font-bold">Login to Your Account</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm pb-6">
            Don{"'"}t have an account?{" "}
            <Link
              href="/auth/register"
              className="text-primary dark:text-emerald-500 font-bold underline"
            >
              Sign Up
            </Link>
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
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

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={pending}
              className="w-full primary-button dark:bg-emerald-500"
            >
              {pending ? "Logging in..." : "Login"}
            </Button>
          </form>

          <p className="text-[10px] fixed bottom-8 left-14 text-white font-light">
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
