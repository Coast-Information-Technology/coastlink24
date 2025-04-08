"use client";

import { useState, ChangeEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { getTokenFromCookies } from "@/lib/cookies";
import { updateApiRequest } from "@/lib/apiRequest";

export default function ResetPasswordPage() {
  // Password visibility states
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  
  // Password values
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  
  // Error states
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  
  // Password requirement states
  const [hasMinLength, setHasMinLength] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  
  const [loading, setLoading] = useState(false);

  // Validate new password
  const validateNewPassword = (value: string) => {
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
      setNewPasswordError("Password must be at least 6 characters long");
      return false;
    } else if (!/[A-Z]/.test(value)) {
      setNewPasswordError("Password must contain at least one uppercase letter");
      return false;
    } else if (!/[a-z]/.test(value)) {
      setNewPasswordError("Password must contain at least one lowercase letter");
      return false;
    } else if (!/[0-9]/.test(value)) {
      setNewPasswordError("Password must contain at least one number");
      return false;
    } else if (!/[!@#$%^&*?\\/]/.test(value)) {
      setNewPasswordError("Password must contain at least one special character");
      return false;
    } else {
      setNewPasswordError("");
      return true;
    }
  };

  // Validate confirm password
  const validateConfirmPassword = (value: string) => {
    if (value !== newPassword) {
      setConfirmPasswordError("Passwords do not match");
      return false;
    } else {
      setConfirmPasswordError("");
      return true;
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    if (!oldPassword) {
      setOldPasswordError("Old password is required");
      return;
    }
    
    if (!validateNewPassword(newPassword)) {
      return;
    }
    
    if (!validateConfirmPassword(confirmNewPassword)) {
      return;
    }
    
    if (oldPassword === newPassword) {
      toast.error("New password cannot be the same as the old password");
      return;
    }

    setLoading(true);

    try {
      const token = getTokenFromCookies(); // Get token from cookies
      if (!token) {
        toast.error("User is not authenticated");
        return;
      }

      const response = await updateApiRequest(
        "/api/borrowers/change-password/",
        token,
        {
          old_password: oldPassword,
          new_password: newPassword,
        }
      );

      toast.success("Password updated successfully");
      
      // Reset form
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setOldPasswordError("");
      setNewPasswordError("");
      setConfirmPasswordError("");
      
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "Failed to update password");
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="relative items-center w-full px-3 pb-8 max-w-7xl">
        <div className="w-full max-w-md md:max-w-sm md:px-0 md:w-96 sm:px-4">
          <ToastContainer />
          <form onSubmit={handleSubmit}>
            <div className="mt-4 space-y-6">
              {/* Old Password */}
              <div className="flex flex-col text-gray-700 w-full text-[13px] mb-2">
                <label htmlFor="oldPassword">Old Password</label>
                <div className="relative">
                  <input
                    id="oldPassword"
                    placeholder="Enter Old Password"
                    className="text-gray-700 text-[14px] border-[1px] bg-white border-[#ccc] rounded-md p-3 w-full focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                    type={showOldPassword ? "text" : "password"}
                    value={oldPassword}
                    onChange={(e) => {
                      setOldPassword(e.target.value);
                      if (e.target.value) {
                        setOldPasswordError("");
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="absolute inset-y-0 right-3 pb-3 flex items-center text-gray-500 hover:text-blue-500 transition"
                  >
                    {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {oldPasswordError && (
                  <p className="text-red-500 text-xs -mt-2">
                    {oldPasswordError}
                  </p>
                )}
              </div>

              {/* New Password */}
              <div className="flex flex-col text-gray-700 w-full text-[13px] mb-2">
                <label htmlFor="newPassword">New Password</label>
                <div className="relative">
                  <input
                    id="newPassword"
                    placeholder="Enter New Password"
                    className="text-gray-700 text-[14px] border-[1px] bg-white border-[#ccc] rounded-md p-3 w-full focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      validateNewPassword(e.target.value);
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-3 pb-3 flex items-center text-gray-500 hover:text-blue-500 transition"
                  >
                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {newPasswordError && (
                  <p className="text-red-500 text-xs -mt-2">
                    {newPasswordError}
                  </p>
                )}
                
                {/* Password Requirements */}
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className={`text-white ${hasMinLength ? 'bg-green-500' : 'bg-gray-500'} text-[10px] p-1 rounded-md transition-colors duration-300`}>
                    Password must be at least 6 characters
                  </span> 
                  <span className={`text-white ${hasUppercase ? 'bg-green-500' : 'bg-gray-500'} text-[10px] p-1 rounded-md transition-colors duration-300`}>
                    Uppercase
                  </span> 
                  <span className={`text-white ${hasLowercase ? 'bg-green-500' : 'bg-gray-500'} text-[10px] p-1 rounded-md transition-colors duration-300`}>
                    Lowercase
                  </span> 
                  <span className={`text-white ${hasNumber ? 'bg-green-500' : 'bg-gray-500'} text-[10px] p-1 rounded-md transition-colors duration-300`}>
                    Number
                  </span> 
                  <span className={`text-white ${hasSpecialChar ? 'bg-green-500' : 'bg-gray-500'} text-[10px] p-1 rounded-md transition-colors duration-300`}>
                    Special Character . $ % _ ! & * @ #
                  </span>
                </div>
              </div>

              {/* Confirm New Password */}
              <div className="flex flex-col text-gray-700 w-full text-[13px] mb-2">
                <label htmlFor="confirmNewPassword">Confirm New Password</label>
                <div className="relative">
                  <input
                    id="confirmNewPassword"
                    placeholder="Confirm New Password"
                    className="text-gray-700 text-[14px] border-[1px] bg-white border-[#ccc] rounded-md p-3 w-full focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                    type={showConfirmNewPassword ? "text" : "password"}
                    value={confirmNewPassword}
                    onChange={(e) => {
                      setConfirmNewPassword(e.target.value);
                      validateConfirmPassword(e.target.value);
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                    className="absolute inset-y-0 right-3 pb-3 flex items-center text-gray-500 hover:text-blue-500 transition"
                  >
                    {showConfirmNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {confirmPasswordError && (
                  <p className="text-red-500 text-xs -mt-2">
                    {confirmPasswordError}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="col-span-full">
                <button
                  type="submit"
                  className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-[#B91C1C] border-2 border-[#B91C1C] rounded-full inline-flex hover:bg-gray-500 hover:border-gray-500 hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center">
                      Resetting Password{" "}
                      <span className="spin mx-2 w-4 h-4 border-2 border-t-2 border-white rounded-full"></span>
                    </span>
                  ) : (
                    "Reset"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
