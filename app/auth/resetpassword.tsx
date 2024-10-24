"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { TbEyeClosed } from "react-icons/tb";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { getTokenFromCookies } from "@/lib/cookies";
import { updateApiRequest } from "@/lib/apiRequest";

// Define the validation schema using Zod
const passwordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(6, "Old password must be at least 6 characters"),
    newPassword: z
      .string()
      .regex(
        /^[A-Z](?=.*[0-9])(?=.*[!@#$%^&*?\\/])[A-Za-z0-9!@#$%^&*?\\/]{5,}$/,
        "New password must start with a capital letter, include at least one number and one symbol ($, /, \\, @, %, #, !, &, ?)"
      )
      .min(6, "New password must be at least 6 characters"),
    confirmNewPassword: z
      .string()
      .min(6, "Confirm new password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

type PasswordFormInputs = z.infer<typeof passwordSchema>;

export default function ResetPasswordPage() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordFormInputs>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = async (data: PasswordFormInputs) => {
    if (data.oldPassword === data.newPassword) {
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
          old_password: data.oldPassword,
          new_password: data.newPassword,
        }
      );

      toast.success("Password updated successfully");
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4 space-y-6">
              {/* Old Password */}
              <div className="col-span-full">
                <label className="block mb-3 text-sm font-medium text-gray-600">
                  Old Password
                </label>
                <div className="relative">
                  <input
                    type={showOldPassword ? "text" : "password"}
                    placeholder="******"
                    className="block w-full px-6 py-3 text-black dark:text-white bg-transparent border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-[#B91C1C] focus:outline-none focus:ring-[#B91C1C] sm:text-sm"
                    {...register("oldPassword")}
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-black dark:text-white"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                  >
                    {showOldPassword ? (
                      <AiFillEye
                        size={20}
                        className="text-black dark:text-white"
                      />
                    ) : (
                      <TbEyeClosed
                        size={20}
                        className="text-black dark:text-white"
                      />
                    )}
                  </div>
                </div>
                {errors.oldPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.oldPassword.message}
                  </p>
                )}
              </div>

              {/* New Password */}
              <div className="col-span-full">
                <label className="block mb-3 text-sm font-medium text-gray-600">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="******"
                    className="block w-full px-6 py-3 text-black dark:text-white bg-transparent border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-[#B91C1C] focus:outline-none focus:ring-[#B91C1C] sm:text-sm"
                    {...register("newPassword")}
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-black dark:text-white"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <AiFillEye
                        size={20}
                        className="text-black dark:text-white"
                      />
                    ) : (
                      <TbEyeClosed
                        size={20}
                        className="text-black dark:text-white"
                      />
                    )}
                  </div>
                </div>
                {errors.newPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>

              {/* Confirm New Password */}
              <div className="col-span-full">
                <label className="block mb-3 text-sm font-medium text-gray-600">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmNewPassword ? "text" : "password"}
                    placeholder="******"
                    className="block w-full px-6 py-3 text-black dark:text-white bg-transparent border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-[#B91C1C] focus:outline-none focus:ring-[#B91C1C] sm:text-sm"
                    {...register("confirmNewPassword")}
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-black dark:text-white"
                    onClick={() =>
                      setShowConfirmNewPassword(!showConfirmNewPassword)
                    }
                  >
                    {showConfirmNewPassword ? (
                      <AiFillEye
                        size={20}
                        className="text-black dark:text-white"
                      />
                    ) : (
                      <TbEyeClosed
                        size={20}
                        className="text-black dark:text-white"
                      />
                    )}
                  </div>
                </div>
                {errors.confirmNewPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmNewPassword.message}
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
