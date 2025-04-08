/**
 * EmailAddressVerificationPage Component
 *
 * This component handles the verification of a user's email and OTP
 * (One-Time Password) through URL query parameters. It also manages the state
 * for loading, error messages, and email verification.
 *
 * Flow:
 * 1. Extracts the "email" and "otp" query parameters from the URL.
 * 2. If either parameter is missing, an error message is displayed.
 * 3. Sends a verification request with the email and OTP to the server.
 * 4. Displays success or failure messages based on the server response.
 * 5. Handles expired token scenarios by showing a specific error and redirecting
 *    the user back to the "/forgot-password" page.
 *
 * Error Handling:
 * - If the token has expired, the user is notified with a toast, and they are
 *   redirected to the "/forgot-password" page to request a new token.
 * - General errors are handled by displaying an error message both in the UI and via
 *   toast notifications.
 *
 * Dependencies:
 * - `react-toastify` for displaying toast notifications.
 * - `next/navigation` for handling URL query parameters and routing.
 * - `verifyBorrower` from `@/lib/apiRequest` for making API requests to verify the user.
 *
 * Author: Adeleke Michael Segun
 * Date: 2024-10-14
 */

"use client";

import { Suspense, useEffect, useState } from "react";
import { postApiRequest } from "@/lib/apiRequest";
import { useSearchParams, useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Loader2 } from "lucide-react";

const EmailAddressVerificationPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const email = searchParams.get("email");
    const otp = searchParams.get("otp");

    if (!email || !otp) {
      const errorMessage = "Email or OTP is missing. Please try again.";
      setError(errorMessage);
      setLoading(false);
      toast.error(errorMessage);
      setTimeout(() => router.push("/register"), 3000);
      return;
    }

    const verifyEmailAddress = async () => {
      try {
        const response = await postApiRequest("/api/borrower/verify_email/", {
          otp,
          email,
        });

        if (response.success) {
          toast.success("Email verified successfully! Redirecting to login...");
          setTimeout(() => router.push("/login"), 2000);
        } else {
          throw new Error(response.message || "Verification failed.");
        }
      } catch (err: any) {
        let errorMessage = "An error occurred during verification.";
        let redirectDelay = 3000;

        if (err.message.includes("Request was throttled")) {
          const match = err.message.match(/(\d+) seconds/);
          const waitTime = match ? match[1] : "a few";
          errorMessage = `Too many attempts. Please try again in ${waitTime} seconds.`;
          redirectDelay = 5000;
        } else if (err.message.includes("OTP has expired")) {
          errorMessage = "Your verification code has expired. Please request a new one.";
        } else if (err.message.includes("Invalid email or OTP")) {
          errorMessage = "Invalid verification details. Please try again.";
        }

        toast.error(errorMessage);
        setError(errorMessage);
        setTimeout(() => router.push("/register"), redirectDelay);
      } finally {
        setLoading(false);
      }
    };

    verifyEmailAddress();
  }, [searchParams, router]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="light"
      />
      <div className="flex flex-col justify-center items-center min-h-screen p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          {loading ? (
            <div className="space-y-4">
              <Loader2 className="animate-spin h-8 w-8 mx-auto text-blue-500" />
              <p className="text-gray-600">Verifying your email address...</p>
            </div>
          ) : error ? (
            <div className="space-y-4">
              <div className="text-red-500 text-lg">{error}</div>
              <p className="text-gray-500">Redirecting you shortly...</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-green-500 text-lg">Verification successful!</div>
              <p className="text-gray-500">Redirecting to login page...</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

const FallbackLoader = () => (
  <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <Loader2 className="animate-spin h-8 w-8 mx-auto text-blue-500" />
      <p className="mt-4 text-gray-600">Loading verification page...</p>
    </div>
  </div>
);

const EmailAddressVerificationWrapper: React.FC = () => {
  return (
    <Suspense fallback={<FallbackLoader />}>
      <EmailAddressVerificationPage />
    </Suspense>
  );
};

export default EmailAddressVerificationWrapper;
