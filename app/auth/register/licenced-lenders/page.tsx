"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { AlertCircleIcon, Eye, EyeOff } from "lucide-react";
import { FaArrowCircleLeft } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import { signUpSchema } from "@/utils/zodDefinition";
import { postApiRequest } from "@/lib/apiRequest";
import "react-toastify/dist/ReactToastify.min.css";
import {
  MdOutlinePersonPin,
  MdOutlineEmail,
  MdOutlinePhone,
  MdOutlineDescription,
  MdOutlineBusinessCenter,
  MdOutlineAssignment,
} from "react-icons/md";
import { Input } from "@/components/ui/input";

const INITIAL_FORM_DATA = {
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
};

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [currentStep, setCurrentStep] = useState(1);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [bvn, setBVN] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [pending, setPending] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Add state for personal information fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [country, setCountry] = useState("");

  // Add state for business information fields
  const [businessName, setBusinessName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [businessCountry, setBusinessCountry] = useState("");
  const [cacDocument, setCacDocument] = useState<File | null>(null);
  const [licenseDocument, setLicenseDocument] = useState<File | null>(null);
  const [form7Document, setForm7Document] = useState<File | null>(null);
  const [directorDateOfBirth, setDirectorDateOfBirth] = useState("");
  const [businessBVN, setBusinessBVN] = useState("");
  const [bvnError, setBvnError] = useState("");
  const [description, setDescription] = useState("");
  // const maxChars = 1000;

  // Password requirement states
  const [hasMinLength, setHasMinLength] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);

  // Handler to go to the next step
  const nextStep = () => setCurrentStep(currentStep + 1);

  // Handler to go to the previous step
  const prevStep = () => setCurrentStep(currentStep - 1);

  // Handle form input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Password validation function
  const validatePassword = (value: string) => {
    // Check minimum length
    if (value.length >= 6) {
      setHasMinLength(true);
    } else {
      setHasMinLength(false);
    }

    // Check for uppercase
    if (/[A-Z]/.test(value)) {
      setHasUppercase(true);
    } else {
      setHasUppercase(false);
    }

    // Check for lowercase
    if (/[a-z]/.test(value)) {
      setHasLowercase(true);
    } else {
      setHasLowercase(false);
    }

    // Check for number
    if (/[0-9]/.test(value)) {
      setHasNumber(true);
    } else {
      setHasNumber(false);
    }

    // Check for special character
    if (/[!@#$%^&*?\\/]/.test(value)) {
      setHasSpecialChar(true);
    } else {
      setHasSpecialChar(false);
    }

    // Overall validation
    if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return false;
    } else if (!/[A-Z]/.test(value)) {
      setPasswordError("Password must contain at least one uppercase letter");
      return false;
    } else if (!/[a-z]/.test(value)) {
      setPasswordError("Password must contain at least one lowercase letter");
      return false;
    } else if (!/[0-9]/.test(value)) {
      setPasswordError("Password must contain at least one number");
      return false;
    } else if (!/[!@#$%^&*?\\/]/.test(value)) {
      setPasswordError("Password must contain at least one special character");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  // Confirm Password Validation
  const validateConfirmPassword = (value: string) => {
    if (value !== password) {
      setConfirmPasswordError("Passwords do not match");
      return false;
    } else {
      setConfirmPasswordError("");
      return true;
    }
  };

  // BVN validation function
  const validateBVN = (value: string) => {
    if (value.length !== 11) {
      setBvnError("BVN must be 11 digits");
      return false;
    } else if (!/^\d+$/.test(value)) {
      setBvnError("BVN must contain only numbers");
      return false;
    } else {
      setBvnError("");
      return true;
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
      await postApiRequest("/api/auth/resend-activation/", {
        email: formData.email,
      });
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

  // Validate step 1 (Requirements)
  const isStep1Valid = () => {
    // Step 1 is just information, no validation needed
    return true;
  };

  // Validate step 2 (Personal Info)
  const isStep2Valid = () => {
    return (
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      email.trim() !== "" &&
      phoneNumber.trim() !== "" &&
      dateOfBirth !== "" &&
      country !== "" &&
      bvn.trim() !== "" &&
      password.trim() !== "" &&
      confirmPassword.trim() !== "" &&
      !passwordError &&
      !confirmPasswordError &&
      !bvnError
    );
  };

  // Validate step 3 (Business Info)
  const isStep3Valid = () => {
    return (
      businessName.trim() !== "" &&
      businessEmail.trim() !== "" &&
      businessAddress.trim() !== "" &&
      businessPhone.trim() !== "" &&
      businessType !== "" &&
      businessCountry !== "" &&
      businessBVN.trim() !== "" &&
      !bvnError &&
      cacDocument !== null &&
      licenseDocument !== null &&
      form7Document !== null
    );
  };

  // Check if current step is valid
  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 1:
        return isStep1Valid();
      case 2:
        return isStep2Valid();
      case 3:
        return isStep3Valid();
      default:
        return false;
    }
  };

  return (
    <main className="flex m-0">
      {/* Sidebar */}
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
          {/* <h1 className="text-white font-semibold pr-20 text-[2.7rem]">
            Coastlink 24
          </h1> */}
        </div>
        <p className="text-white text-[14px] font-thin text-justify w-[33vw]">
          Revolutionizing Lending Services with Cutting-Edge Technology. Manage
          loan requests, disbursements, and repayments through our innovative,
          user-friendly platform for both USSD and web users.
        </p>
      </div>

      {/* Main section */}
      <section className="h-screen w-full flex justify-center items-center bg-white overflow-auto form-custom-scrollbar">
        <ToastContainer />
        <div className="space-y-2 p-4 md:p-8 m-auto w-full sm:w-[60vw] lg:w-[40vw]">
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
          <p className="text-gray-600 text-[14px] text-right">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-primary  font-bold underline"
            >
              Login
            </Link>
          </p>

          <form>
            {/* Step indicator */}
            <div className="flex justify-between py-6">
              <div
                className={`step flex flex-col items-center ${currentStep >= 1 ? "active" : ""}`}
              >
                <div
                  className={`step-number w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"}`}
                >
                  1
                </div>
                <div
                  className={`step-title text-xs mt-1 ${currentStep >= 1 ? "text-blue-600 font-medium" : "text-gray-500"}`}
                >
                  Requirements
                </div>
              </div>
              <div
                className={`step flex flex-col items-center ${currentStep >= 2 ? "active" : ""}`}
              >
                <div
                  className={`step-number w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"}`}
                >
                  2
                </div>
                <div
                  className={`step-title text-xs mt-1 ${currentStep >= 2 ? "text-blue-600 font-medium" : "text-gray-500"}`}
                >
                  Personal Info
                </div>
              </div>
              <div
                className={`step flex flex-col items-center ${currentStep >= 3 ? "active" : ""}`}
              >
                <div
                  className={`step-number w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"}`}
                >
                  3
                </div>
                <div
                  className={`step-title text-xs mt-1 ${currentStep >= 3 ? "text-blue-600 font-medium" : "text-gray-500"}`}
                >
                  Business Info
                </div>
              </div>
            </div>

            {/* Page ONE */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-[1.2rem] md:text-[1.5rem] text-black font-bold leading-tight pt-6">
                  Things to note before you <br />
                  commence
                </h2>
                <p className="text-gray-600 text-[14px] lg:w-[20vw] pt-2 pb-4">
                  To complete your business KYC (Know Your Customer) and account
                  setup, kindly have the following ready:
                </p>

                <div className="flex gap-2 mb-4 text-gray-600">
                  <MdOutlinePersonPin size={30} />
                  <div className="">
                    <h3 className="text-black">
                      You and Your Director{"'"}s BVN
                    </h3>
                    <p>
                      To verify identities in compliance with CBN regulations.
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 mb-4 text-gray-600">
                  <MdOutlinePersonPin size={30} />
                  <div className="">
                    <h3 className="text-black">
                      Director{"’"}s Valid Means of ID
                    </h3>
                    <p>
                      National ID Card, International Passport, Driver{"'"}s
                      License, or Voter{"’"}s Card .
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 mb-4 text-gray-600">
                  <MdOutlineEmail size={30} />
                  <div className="">
                    <h3 className="text-black">Valid Email Address</h3>
                    <p>For account activation and communication.</p>
                  </div>
                </div>

                <div className="flex gap-2 mb-4 text-gray-600">
                  <MdOutlinePhone size={30} />
                  <div className="">
                    <h3 className="text-black">Valid Phone Number</h3>
                    <p>Linked to your business.</p>
                  </div>
                </div>

                <div className="flex gap-2 mb-4 text-gray-600">
                  <MdOutlineDescription size={30} />
                  <div className="">
                    <h3 className="text-black">CAC Certificate</h3>
                    <p>Proof of company registration.</p>
                  </div>
                </div>

                <div className="flex gap-2 mb-4 text-gray-600">
                  <MdOutlineBusinessCenter size={30} />
                  <div className="">
                    <h3 className="text-black">
                      CBN License or Lending License
                    </h3>
                    <p>Proof of authority to operate as a lender.</p>
                  </div>
                </div>

                <div className="flex gap-2 mb-4 text-gray-600">
                  <MdOutlineAssignment size={30} />
                  <div className="">
                    <h3 className="text-black">Form7 or Status Report</h3>
                    <p>Current company information from CAC.</p>
                  </div>
                </div>

                {/* Navigation buttons */}
                <div className="flex justify-end mt-6">
                  <button
                    className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold p-6 rounded-md hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                    type="button"
                    onClick={nextStep}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Page TWO */}
            {currentStep === 2 && (
              <div className="flex flex-col">
                <h2 className="text-[1.2rem] md:text-[1.5rem] text-black font-bold leading-tight pt-6">
                  Personal Information (Account Admin)
                </h2>

                <p className="text-gray-600 text-[14px] pt-2 pb-4">
                  Fill in details for the primary account holder/admin:
                </p>

                <div className="flex space-x-4 mb-4">
                  {/* First Name Field */}
                  <div className="flex flex-col text-gray-700 w-full space-y-1 text-[13px]">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      id="firstName"
                      placeholder="Enter First Name"
                      className="text-gray-700 text-[14px] border-[1px] bg-white border-[#ccc] rounded-md p-3 w-full focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>

                  {/* Last Name Field */}
                  <div className="flex flex-col text-gray-700 w-full space-y-1 text-[13px]">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      id="lastName"
                      placeholder="Enter Last Name"
                      className="text-gray-700 text-[14px] border-[1px] bg-white border-[#ccc] rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="flex flex-col text-gray-700 w-full space-y-1 text-[13px] mb-4">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    placeholder="Email"
                    className="text-gray-700 text-[14px] border-[1px] bg-white border-[#ccc] rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
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
                      required
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
                    <p className="text-red-500 text-xs md:-mt-2 md:w-[30vw]">
                      {passwordError}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2 mt-2">
                    <span
                      className={`text-white ${password.length >= 6 ? "bg-green-500" : "bg-gray-500"} text-[10px] p-1 rounded-md transition-colors duration-300`}
                    >
                      Password must be at least 6 characters
                    </span>
                    <span
                      className={`text-white ${/[A-Z]/.test(password) ? "bg-green-500" : "bg-gray-500"} text-[10px] p-1 rounded-md transition-colors duration-300`}
                    >
                      Uppercase
                    </span>
                    <span
                      className={`text-white ${/[a-z]/.test(password) ? "bg-green-500" : "bg-gray-500"} text-[10px] p-1 rounded-md transition-colors duration-300`}
                    >
                      Lowercase
                    </span>
                    <span
                      className={`text-white ${/[0-9]/.test(password) ? "bg-green-500" : "bg-gray-500"} text-[10px] p-1 rounded-md transition-colors duration-300`}
                    >
                      Number
                    </span>
                    <span
                      className={`text-white ${/[!@#$%^&*?\\/]/.test(password) ? "bg-green-500" : "bg-gray-500"} text-[10px] p-1 rounded-md transition-colors duration-300`}
                    >
                      Special Character . $ % _ ! & * @ #
                    </span>
                  </div>
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
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
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
                    <p className="text-red-500 text-xs md:-mt-2">
                      {confirmPasswordError}
                    </p>
                  )}
                </div>

                <div className="flex flex-col md:flex-row md:space-x-4 mb-2">
                  {/* Phone Number Field */}
                  <div className="flex flex-col text-gray-700 w-full space-y-1 mb-2 text-[13px]">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                      id="phoneNumber"
                      placeholder="Enter Phone Number"
                      className="text-gray-700 text-[14px] border-[1px] bg-white border-[#ccc] rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                  </div>

                  {/* Gender Field */}
                  <div className="flex flex-col text-gray-700 w-full space-y-1 text-[13px]">
                    <label htmlFor="gender">Select a Gender</label>
                    <select
                      id="gender"
                      required
                      className="text-gray-700 text-[14px] border-[1px] bg-white border-[#ccc] rounded-md p-3 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                    >
                      <option value="">Select your Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>

                {/* Date of Birth Field */}
                <div className="flex flex-col text-gray-700 w-full space-y-1 text-[13px] mb-4">
                  <label htmlFor="dateOfBirth">Date of birth</label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    required
                    className="w-full text-gray-700 text-[14px] border-[1px] bg-white border-[#ccc] rounded-md p-3 py-4 md:py-3 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                  />
                </div>

                {/* Country Selection Field */}
                <div className="flex flex-col text-gray-700 w-full space-y-1 text-[13px] mb-4">
                  <label htmlFor="country">Country</label>
                  <select
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                    className="text-gray-700 text-[14px] border-[1px] bg-white border-[#ccc] rounded-md p-3 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
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
                    required
                  />
                  <span className="text-[12px] italic">
                    Dial *565*0# to check for your valid BVN
                  </span>
                  {bvnError && (
                    <p className="text-red-500 text-xs -mt-4 flex items-center gap-1">
                      <AlertCircleIcon size={15} className="text-red-500" />
                      {bvnError}
                    </p>
                  )}
                </div>

                {/* Navigation buttons */}
                <div className="flex justify-between mt-6">
                  <button
                    className="bg-gray-200 text-gray-700 font-bold p-6 rounded-md hover:bg-gray-300 transition ease-in-out duration-150"
                    type="button"
                    onClick={prevStep}
                  >
                    Previous
                  </button>
                  <button
                    className={`${
                      isStep2Valid()
                        ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white hover:bg-indigo-600 hover:to-blue-600"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    } font-bold p-6 rounded-md transition ease-in-out duration-150`}
                    type="button"
                    onClick={nextStep}
                    disabled={!isStep2Valid()}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Page THREE */}
            {currentStep === 3 && (
              <div className="flex flex-col">
                <h2 className="text-[1.2rem] md:text-[1.5rem] text-black font-bold leading-tight pt-6 mb-6">
                  Business Information
                </h2>

                <p className="text-gray-600 text-[14px] lg:w-[20vw] pt-2 pb-4">
                  Now complete your business profile:
                </p>

                <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
                  {/* Business Name Field */}
                  <div className="flex flex-col text-gray-700 w-full space-y-1 text-[13px]">
                    <label htmlFor="businessName">
                      Registered Business Name
                    </label>
                    <input
                      id="businessName"
                      placeholder="Enter Business Name"
                      className="text-gray-700 text-[14px] border-[1px] bg-white border-[#ccc] rounded-md p-3 w-full focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      required
                    />
                  </div>

                  {/* Business Email Field */}
                  <div className="flex flex-col text-gray-700 w-full space-y-1 text-[13px]">
                    <label htmlFor="businessEmail">
                      Business Email Address
                    </label>
                    <input
                      id="businessEmail"
                      placeholder="Enter Business Email"
                      className="text-gray-700 text-[14px] border-[1px] bg-white border-[#ccc] rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full"
                      type="email"
                      value={businessEmail}
                      onChange={(e) => setBusinessEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Business Address Field */}
                <div className="flex flex-col text-gray-700 w-full space-y-1 text-[13px] mb-4">
                  <label htmlFor="businessAddress">
                    Business Operating Address
                  </label>
                  <input
                    id="businessAddress"
                    placeholder="Enter Business Address"
                    className="text-gray-700 text-[14px] border-[1px] bg-white border-[#ccc] rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                    type="text"
                    value={businessAddress}
                    onChange={(e) => setBusinessAddress(e.target.value)}
                    required
                  />
                </div>

                <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
                  {/* Business Phone Number Field */}
                  <div className="flex flex-col text-gray-700 w-full space-y-1 text-[13px]">
                    <label htmlFor="businessPhone">
                      Official Business Phone Number
                    </label>

                    <div className="flex items-center border-[1px] bg-white border-[#ccc] rounded-md w-full focus-within:ring-1 focus-within:ring-blue-500 transition ease-in-out duration-150">
                      {/* Country Code Select */}
                      <select
                        className="text-gray-700 text-[14px] border-r-[1px] bg-white border-[#ccc] p-3 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                        required
                      >
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
                        id="businessPhone"
                        placeholder="Enter Business Phone Number"
                        className="text-gray-700 text-[14px] mb-0 p-3 w-full outline-none bg-transparent"
                        type="text"
                        required
                      />
                    </div>
                  </div>

                  {/* Business Type Field */}
                  <div className="flex flex-col text-gray-700 w-full space-y-1 text-[13px]">
                    <label htmlFor="businessType">Purpose of Sign Up</label>
                    <select
                      className="text-gray-700 text-[14px] border-[1px] bg-white border-[#ccc] rounded-md p-3 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                      id="businessType"
                      required
                    >
                      <option value="">Select Purpose of Sign Up</option>
                      <option value="sole-proprietorship">
                        Lending to SMEs
                      </option>
                      <option value="partnership">Personal Loans</option>
                      <option value="corporation">Salary Loans</option>
                    </select>
                  </div>
                </div>

                {/* Director's BVN Field */}
                <div className="flex flex-col text-gray-700 w-full space-y-1 text-[13px] mb-4">
                  <label htmlFor="businessBvn">Director{"'"}s BVN</label>
                  <input
                    id="businessBvn"
                    placeholder="Enter your Business BVN"
                    className="text-gray-700 text-[14px] border-[1px] bg-white border-[#ccc] rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                    type="text"
                    value={businessBVN}
                    onChange={(e) => {
                      setBusinessBVN(e.target.value);
                      validateBVN(e.target.value);
                    }}
                    required
                  />
                  <span className="text-[12px] italic">
                    Dial *565*0# to check for your valid BVN
                  </span>
                  {bvnError && (
                    <p className="text-red-500 text-xs -mt-4 flex items-center gap-1">
                      <AlertCircleIcon size={15} className="text-red-500" />
                      {bvnError}
                    </p>
                  )}
                </div>

                {/* Director's Date of Birth Field */}
                <div className="flex flex-col text-gray-700 w-full space-y-1 text-[13px] mb-4">
                  <label htmlFor="directorDateOfBirth">Date of birth</label>
                  <input
                    type="date"
                    id="directorDateOfBirth"
                    name="directorDateOfBirth"
                    value={directorDateOfBirth}
                    onChange={(e) => setDirectorDateOfBirth(e.target.value)}
                    required
                    className="w-full text-gray-700 text-[14px] border-[1px] bg-white border-[#ccc] rounded-md p-3 py-4 md:py-3 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                  />
                </div>

                {/* Business Country Field */}
                <div className="flex flex-col text-gray-700 w-full space-y-1 text-[13px] mb-4">
                  <label htmlFor="businessCountry">Country</label>
                  <select
                    id="businessCountry"
                    value={businessCountry}
                    onChange={(e) => setBusinessCountry(e.target.value)}
                    required
                    className="text-gray-700 text-[14px] border-[1px] bg-white border-[#ccc] rounded-md p-3 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
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

                {/* Business Employee Size Field */}
                <div className="flex flex-col text-gray-700 w-full space-y-1 text-[13px] mb-4">
                  <label htmlFor="businessCountry">
                    Business Employee Size
                  </label>
                  <select
                    id="businessCountry"
                    required
                    className="text-gray-700 text-[14px] border-[1px] bg-white border-[#ccc] rounded-md p-3 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                  >
                    <option value="">Select Employee Size</option>
                    <option value="one">1 - 10</option>
                    <option value="Eleven">11 - 50</option>
                    <option value="fiftyOne">51 - 200</option>
                    <option value="hundredPlus">200+</option>
                  </select>
                </div>

                {/* Primary Industry Sector Field */}
                <div className="flex flex-col text-gray-700 w-full space-y-1 text-[13px] mb-4">
                  <label htmlFor="industrySector">
                    Primary Industry Sector
                  </label>
                  <select
                    id="industrySector"
                    required
                    className="text-gray-700 text-[14px] border-[1px] bg-white border-[#ccc] rounded-md p-3 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                  >
                    <option value="">Select Industry Sector</option>
                    <option value="agriculture">Agriculture</option>
                    <option value="automotive">Automotive</option>
                    <option value="banking">
                      Banking & Financial Services
                    </option>
                    <option value="construction">Construction</option>
                    <option value="consumerGoods">Consumer Goods</option>
                    <option value="education">Education</option>
                    <option value="energy">Energy & Utilities</option>
                    <option value="engineering">Engineering</option>
                    <option value="entertainment">Entertainment & Media</option>
                    <option value="environmental">
                      Environmental Services
                    </option>
                    <option value="fashion">Fashion & Apparel</option>
                    <option value="food">Food & Beverage</option>
                    <option value="government">Government</option>
                    <option value="healthcare">
                      Healthcare & Pharmaceuticals
                    </option>
                    <option value="hospitality">Hospitality & Tourism</option>
                    <option value="insurance">Insurance</option>
                    <option value="it">Information Technology (IT)</option>
                    <option value="legal">Legal Services</option>
                    <option value="logistics">
                      Logistics & Transportation
                    </option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="marketing">Marketing & Advertising</option>
                    <option value="mining">Mining & Metals</option>
                    <option value="nonprofit">Nonprofit & NGOs</option>
                    <option value="realEstate">Real Estate</option>
                    <option value="retail">Retail</option>
                    <option value="science">Scientific Research</option>
                    <option value="security">Security & Investigation</option>
                    <option value="sports">Sports & Recreation</option>
                    <option value="telecommunications">
                      Telecommunications
                    </option>
                    <option value="transportation">
                      Transportation Services
                    </option>
                    <option value="wholesale">Wholesale</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Brief Business Description */}
                <div className="flex flex-col text-gray-700 w-full space-y-1 text-[13px] mb-4">
                  <label
                    htmlFor="businessDescription"
                    className="text-gray-700 font-medium"
                  >
                    Brief Business Description
                  </label>
                  <textarea
                    id="businessDescription"
                    name="businessDescription"
                    placeholder="Write a brief description about your business..."
                    rows={5}
                    // maxLength={maxChars}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="resize-none text-gray-500 text-[14px] border-[1px] bg-white border-[#ccc] rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ease-in-out duration-300"
                  ></textarea>
                  {/* <div className="flex justify-between text-[12px] text-gray-400 mt-1">
                    <span>
                      {description.length} / {maxChars} characters
                    </span>
                    {description.length >= maxChars && (
                      <span className="text-red-500">
                        Character limit reached
                      </span>
                    )}
                  </div> */}
                </div>

                {/* Document Upload Fields */}
                <div className="flex flex-col text-gray-700 w-full space-y-1 text-[13px] mb-4">
                  <label htmlFor="cacDocument">CAC Document</label>
                  <div className="relative">
                    <input
                      id="cacDocument"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={(e) =>
                        setCacDocument(
                          e.target.files ? e.target.files[0] : null
                        )
                      }
                      required
                    />
                    <div className="border-[1px] border-[#ccc] border-dashed rounded-md p-4 flex flex-col items-center justify-center bg-white hover:bg-gray-50 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-gray-400 mb-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p className="text-sm text-gray-500 text-center">
                        Drag and drop your file here or{" "}
                        <span className="text-blue-500 font-medium">
                          browse / take photo
                        </span>
                      </p>
                      {cacDocument && (
                        <p className="text-xs text-green-600 mt-2 flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {cacDocument.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col text-gray-700 w-full space-y-1 text-[13px] mb-4">
                  <label htmlFor="licenseDocument">
                    CBN or Lending License
                  </label>
                  <div className="relative">
                    <input
                      id="licenseDocument"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={(e) =>
                        setLicenseDocument(
                          e.target.files ? e.target.files[0] : null
                        )
                      }
                      required
                    />
                    <div className="border-[1px] border-[#ccc] border-dashed rounded-md p-4 flex flex-col items-center justify-center bg-white hover:bg-gray-50 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-gray-400 mb-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p className="text-sm text-gray-500 text-center">
                        Drag and drop your file here or{" "}
                        <span className="text-blue-500 font-medium">
                          browse / take photo
                        </span>
                      </p>
                      {licenseDocument && (
                        <p className="text-xs text-green-600 mt-2 flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {licenseDocument.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col text-gray-700 w-full space-y-1 text-[13px] mb-4">
                  <label htmlFor="form7Document">Form7 or Status Report</label>
                  <div className="relative">
                    <input
                      id="form7Document"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={(e) =>
                        setForm7Document(
                          e.target.files ? e.target.files[0] : null
                        )
                      }
                      required
                    />
                    <div className="border-[1px] border-[#ccc] border-dashed rounded-md p-4 flex flex-col items-center justify-center bg-white hover:bg-gray-50 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-gray-400 mb-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p className="text-sm text-gray-500 text-center">
                        Drag and drop your file here or{" "}
                        <span className="text-blue-500 font-medium">
                          browse / take photo
                        </span>
                      </p>
                      {form7Document && (
                        <p className="text-xs text-green-600 mt-2 flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {form7Document.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Navigation buttons */}
                <div className="flex justify-between mt-6">
                  <button
                    className="bg-gray-200 text-gray-700 font-bold p-6 rounded-md hover:bg-gray-300 transition ease-in-out duration-150"
                    type="button"
                    onClick={prevStep}
                  >
                    Previous
                  </button>
                  <button
                    className={`${
                      isStep3Valid()
                        ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white hover:bg-indigo-600 hover:to-blue-600"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    } font-bold p-6 rounded-md transition ease-in-out duration-150`}
                    type="submit"
                    disabled={!isStep3Valid()}
                  >
                    Register
                  </button>
                </div>
              </div>
            )}
          </form>

          <p className="text-[10px] hidden lg:inline-block fixed bottom-8 left-14 text-white font-light">
            © 2024 Coastlink24. All rights reserved.
          </p>
        </div>
      </section>
    </main>
  );
};

export default SignUpPage;
