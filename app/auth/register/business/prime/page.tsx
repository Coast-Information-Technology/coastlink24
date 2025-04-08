"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { AlertCircleIcon, Eye, EyeOff, Lock, Mail, Phone } from "lucide-react";
import { FaArrowCircleLeft } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import { signUpSchema } from "@/utils/zodDefinition";
import { emailPasswordResetLink, postApiRequest } from "@/lib/apiRequest";
import "react-toastify/dist/ReactToastify.min.css";

const INITIAL_FORM_DATA = {
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
};

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [bvn, setBVN] = useState("");
  const [bvnError, setBVNError] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [pending, setPending] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Password validation function
  const validatePassword = (value: string) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regex.test(value)) {
      setPasswordError(
        "Password must contain at least 8 characters, including uppercase, lowercase, number, and special character."
      );
    } else {
      setPasswordError("");
    }
  };

  // Confirm Password Validation
  const validateConfirmPassword = (value: string) => {
    if (value !== password) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }
  };

  // BVN validation function
  const validateBVN = (value: string) => {
    if (!/^\d{10}$/.test(value)) {
      setBVNError("BVN must be exactly 10 digits.");
    } else {
      setBVNError("");
    }
  };

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
          backgroundImage: "url('/bg.png')",
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
        <p className="text-white text-[12px] font-thin text-justify w-[33vw]">
          Revolutionizing Lending Services with Cutting-Edge Technology. Manage
          loan requests, disbursements, and repayments through our innovative,
          user-friendly platform for both USSD and web users.
        </p>
      </div>

      {/* Main section */}
      <section className="h-screen w-full flex justify-center items-center bg-white overflow-auto form-custom-scrollbar">
        <ToastContainer />
        <div className="space-y-2 p-6 md:p-8 rounded-md shadow-lg lg:shadow-none m-auto md:min-w-[35vw]">
          <Link
            href="/"
            className="lg:hidden flex items-center justify-center p-4 text-white text-2xl font-bold gap-2 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500"
          >
            <Image
              src="/coastlink-brandlogo.png"
              alt="coast link logo"
              height={150}
              width={150}
            />
            {/* <p>Coastlink 24</p> */}
          </Link>
          <div className="flex items-center justify-between pb-10">
            <h2 className="text-2xl font-bold text-black">Ready👌</h2>
            <p className="text-gray-600 text-[12px]">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-primary  font-bold underline"
              >
                Login
              </Link>
            </p>
          </div>

          {/* Form ONE */}
          <form className="flex flex-col">
            <div className="flex space-x-4 mb-4">
              {/* First Name Field */}
              <div className="flex flex-col text-gray-700 w-full space-y-1 text-[13px]">
                <label htmlFor="">First Name</label>
                <input
                  placeholder="Enter First Name"
                  className="text-gray-700 text-[14px] border-[1px] bg-white border-[#ccc] rounded-md p-3 w-full focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                  type="text"
                />
              </div>

              {/* Last Name Field */}
              <div className="flex flex-col text-gray-700 w-full space-y-1 text-[13px]">
                <label htmlFor="">Last Name</label>
                <input
                  placeholder="Enter Last Name"
                  className="text-gray-700 text-[14px] border-[1px] bg-white border-[#ccc] rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full"
                  type="text"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="flex flex-col text-gray-700 w-full space-y-1 text-[13px] mb-4">
              <label htmlFor="">Email</label>
              <input
                placeholder="Email"
                className="text-gray-700 text-[14px] border-[1px] bg-white border-[#ccc] rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="email"
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col text-gray-700 w-full text-[13px] mb-2">
              <label htmlFor="password">Password</label>
              <div className="relative">
                <input
                  id="password"
                  placeholder="Enter Password"
                  className="text-gray-700 text-[14px] border-[1px] bg-white border-[#ccc] rounded-md p-3 w-full focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validatePassword(e.target.value);
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 pb-3 flex items-center text-gray-500 hover:text-blue-500 transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {passwordError && (
                <p className="text-red-500 text-xs -mt-2 w-[30vw]">
                  {passwordError}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="flex flex-col text-gray-700 w-full text-[13px] mb-2">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  className="text-gray-700 text-[14px] border-[1px] bg-white border-[#ccc] rounded-md p-3 w-full focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    validateConfirmPassword(e.target.value);
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-3 pb-3 flex items-center text-gray-500 hover:text-blue-500 transition"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
              {confirmPasswordError && (
                <p className="text-red-500 text-xs -mt-2">
                  {confirmPasswordError}
                </p>
              )}
            </div>

            <div className="flex space-x-4 mb-4">
              {/* Phone Number Field */}
              <div className="flex flex-col text-gray-700 w-full space-y-1 text-[13px]">
                <label htmlFor="phone">Phone Number</label>

                <div className="flex items-center border-[1px] bg-white border-[#ccc] rounded-md w-full focus-within:ring-1 focus-within:ring-blue-500 transition ease-in-out duration-150">
                  {/* Country Code Select */}
                  <select className="bg-transparent text-gray-700 text-[14px] pl-2 py-3 border-r-[1px] border-[#ccc] outline-none focus:ring-0">
                    <option value="+234">+234</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    <option value="+91">+91</option>
                    <option value="+27">+27</option>
                    <option value="+61">+61</option>
                    <option value="+49">+49</option>
                  </select>

                  {/* Phone Number Input */}
                  <input
                    id="phone"
                    placeholder="Enter Phone Number"
                    className="text-gray-700 text-[14px] mb-0 p-3 w-full outline-none bg-transparent"
                    type="text"
                  />
                </div>
              </div>

              {/* Gender Field */}
              <div className="flex flex-col text-gray-700 w-full space-y-1 text-[13px]">
                <label htmlFor="gender">Select a Gender</label>
                <select
                  className="text-gray-500 text-[14px] border-[1px] bg-white border-[#ccc] rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                  id="gender"
                >
                  <option value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            {/* Date of Birth Field */}
            <div className="flex flex-col text-gray-700 w-full space-y-1 text-[13px] mb-4">
              <label htmlFor="">Date of Birth</label>
              <input
                placeholder="mm/dd/yyyy"
                className="text-gray-500 text-[14px] border-[1px] bg-white border-[#ccc] rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="date"
              />
            </div>

            {/* Country Selction Field */}
            <div className="flex flex-col text-gray-700 w-full space-y-1 text-[13px] mb-4">
              <label htmlFor="country">Country</label>
              <select
                id="country"
                className="text-gray-500 text-[14px] border-[1px] bg-white border-[#ccc] rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              >
                <option value="">Select your Country</option>
                <option value="Australia">Australia</option>
                <option value="Brazil">Brazil</option>
                <option value="Canada">Canada</option>
                <option value="France">France</option>
                <option value="Germany">Germany</option>
                <option value="India">India</option>
                <option value="Nigeria">Nigeria</option>
                <option value="South Africa">South Africa</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
              </select>
            </div>

            {/* BVN Field */}
            <div className="flex flex-col text-gray-700 w-full space-y-1 text-[13px] mb-4">
              <label htmlFor="bvn">Bank Verification Number (BVN)</label>
              <input
                id="bvn"
                placeholder="Enter your BVN"
                className="text-gray-700 text-[14px] border-[1px] bg-white border-[#ccc] rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
                value={bvn}
                onChange={(e) => {
                  setBVN(e.target.value);
                  validateBVN(e.target.value);
                }}
              />
              {bvnError && (
                <p className="text-red-500 text-xs -mt-4 flex items-center gap-1">
                  <AlertCircleIcon size={15} className="text-red-500" />
                  {bvnError}
                </p>
              )}
            </div>

            {/* Submit Field */}
            <button
              className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-6 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
              type="submit"
            >
              Continue
            </button>
          </form>

          {/* Form TWO */}
          <form className="flex flex-col">
            <div className="flex space-x-4 mb-4">
              {/* First Name Field */}
              <div className="flex flex-col text-gray-700 w-full space-y-1 text-[13px]">
                <label htmlFor="">First Name</label>
                <input
                  placeholder="Enter First Name"
                  className="text-gray-700 text-[14px] border-[1px] bg-white border-[#ccc] rounded-md p-3 w-full focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                  type="text"
                />
              </div>

              {/* Last Name Field */}
              <div className="flex flex-col text-gray-700 w-full space-y-1 text-[13px]">
                <label htmlFor="">Last Name</label>
                <input
                  placeholder="Enter Last Name"
                  className="text-gray-700 text-[14px] border-[1px] bg-white border-[#ccc] rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full"
                  type="text"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="flex flex-col text-gray-700 w-full space-y-1 text-[13px] mb-4">
              <label htmlFor="">Email</label>
              <input
                placeholder="Email"
                className="text-gray-700 text-[14px] border-[1px] bg-white border-[#ccc] rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="email"
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col text-gray-700 w-full text-[13px] mb-2">
              <label htmlFor="password">Password</label>
              <div className="relative">
                <input
                  id="password"
                  placeholder="Enter Password"
                  className="text-gray-700 text-[14px] border-[1px] bg-white border-[#ccc] rounded-md p-3 w-full focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validatePassword(e.target.value);
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 pb-3 flex items-center text-gray-500 hover:text-blue-500 transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {passwordError && (
                <p className="text-red-500 text-xs -mt-2 w-[30vw]">
                  {passwordError}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="flex flex-col text-gray-700 w-full text-[13px] mb-2">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  className="text-gray-700 text-[14px] border-[1px] bg-white border-[#ccc] rounded-md p-3 w-full focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    validateConfirmPassword(e.target.value);
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-3 pb-3 flex items-center text-gray-500 hover:text-blue-500 transition"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
              {confirmPasswordError && (
                <p className="text-red-500 text-xs -mt-2">
                  {confirmPasswordError}
                </p>
              )}
            </div>

            <div className="flex space-x-4 mb-4">
              {/* Phone Number Field */}
              <div className="flex flex-col text-gray-700 w-full space-y-1 text-[13px]">
                <label htmlFor="phone">Phone Number</label>

                <div className="flex items-center border-[1px] bg-white border-[#ccc] rounded-md w-full focus-within:ring-1 focus-within:ring-blue-500 transition ease-in-out duration-150">
                  {/* Country Code Select */}
                  <select className="bg-transparent text-gray-700 text-[14px] pl-2 py-3 border-r-[1px] border-[#ccc] outline-none focus:ring-0">
                    <option value="+234">+234</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    <option value="+91">+91</option>
                    <option value="+27">+27</option>
                    <option value="+61">+61</option>
                    <option value="+49">+49</option>
                  </select>

                  {/* Phone Number Input */}
                  <input
                    id="phone"
                    placeholder="Enter Phone Number"
                    className="text-gray-700 text-[14px] mb-0 p-3 w-full outline-none bg-transparent"
                    type="text"
                  />
                </div>
              </div>

              {/* Gender Field */}
              <div className="flex flex-col text-gray-700 w-full space-y-1 text-[13px]">
                <label htmlFor="gender">Select a Gender</label>
                <select
                  className="text-gray-500 text-[14px] border-[1px] bg-white border-[#ccc] rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                  id="gender"
                >
                  <option value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            {/* Date of Birth Field */}
            <div className="flex flex-col text-gray-700 w-full space-y-1 text-[13px] mb-4">
              <label htmlFor="">Date of Birth</label>
              <input
                placeholder="mm/dd/yyyy"
                className="text-gray-500 text-[14px] border-[1px] bg-white border-[#ccc] rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="date"
              />
            </div>

            {/* Country Selction Field */}
            <div className="flex flex-col text-gray-700 w-full space-y-1 text-[13px] mb-4">
              <label htmlFor="country">Country</label>
              <select
                id="country"
                className="text-gray-500 text-[14px] border-[1px] bg-white border-[#ccc] rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              >
                <option value="">Select your Country</option>
                <option value="Australia">Australia</option>
                <option value="Brazil">Brazil</option>
                <option value="Canada">Canada</option>
                <option value="France">France</option>
                <option value="Germany">Germany</option>
                <option value="India">India</option>
                <option value="Nigeria">Nigeria</option>
                <option value="South Africa">South Africa</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
              </select>
            </div>

            {/* BVN Field */}
            <div className="flex flex-col text-gray-700 w-full space-y-1 text-[13px] mb-4">
              <label htmlFor="bvn">Bank Verification Number (BVN)</label>
              <input
                id="bvn"
                placeholder="Enter your BVN"
                className="text-gray-700 text-[14px] border-[1px] bg-white border-[#ccc] rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
                value={bvn}
                onChange={(e) => {
                  setBVN(e.target.value);
                  validateBVN(e.target.value);
                }}
              />
              {bvnError && (
                <p className="text-red-500 text-xs -mt-4 flex items-center gap-1">
                  <AlertCircleIcon size={15} className="text-red-500" />
                  {bvnError}
                </p>
              )}
            </div>

            {/* Submit Field */}
            <button
              className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-6 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
              type="submit"
            >
              Register
            </button>
          </form>

          <p className="text-[10px] fixed bottom-8 left-14 text-white font-light">
            © 2024 Coastlink24. All rights reserved.
          </p>
        </div>
      </section>
    </main>
  );
};

export default SignUpPage;
