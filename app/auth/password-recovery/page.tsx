/**
 * PasswordRecoveryPage Component
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
import { getTokenFromCookies, saveTokenToCookies } from "@/lib/cookies";
import { useSearchParams, useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

// Component to handle email and OTP verification
const PasswordRecoveryPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const token = getTokenFromCookies();

  useEffect(() => {
    const email = searchParams.get("email");
    const otp = searchParams.get("otp");

    // Check for missing email or OTP
    if (!email || !otp) {
      const errorMessage = "Email or OTP is missing.";
      setError(errorMessage);
      setLoading(false);
      toast.error(errorMessage);
      return;
    }

    // Function to verify the email and OTP
    const verifyEmailAndOtp = async () => {
      try {
        const response = await postApiRequest(
          "/api/borrowers/password-recovery/verify-otp",
          { otp, email }
        );

        // If OTP verification succeeds
        if (response.message === "OTP verified successfully.") {
          saveTokenToCookies(response.token); // Store token in cookies
          toast.success("Email verified successfully!");
          router.push("/create-new-password"); // Redirect to reset password
        } else {
          // If the server response contains a failure message
          throw new Error(response.message || "Verification failed.");
        }
      } catch (err: any) {
        let errorMessage = "An error occurred during verification.";

        // Handle throttling error (e.g., "Request was throttled. Expected available in ... seconds.")
        if (err.message.includes("Request was throttled")) {
          const match = err.message.match(/(\d+) seconds/);
          const waitTime = match ? match[1] : "a few";
          errorMessage = `You have tried too many times. Please try again in ${waitTime} seconds.`;
        } else if (err.message.includes("OTP has expired")) {
          errorMessage = "Your OTP has expired. Please request a new one.";
        } else if (err.message.includes("Invalid email or OTP")) {
          errorMessage = "Invalid email or OTP. Please try again.";
        }

        // Display the appropriate error message
        toast.error(errorMessage);

        // Redirect to the forgot-password page after showing the error
        router.push("/forgot-password/");
      }
    };
    verifyEmailAndOtp();
  }, [searchParams, router, token]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <ToastContainer />
      {loading ? (
        <p>Verifying email...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>Redirecting...</p>
      )}
    </div>
  );
};

// Fallback component to be shown while loading
const FallbackLoader = () => (
  <div className="flex justify-center items-center min-h-screen">
    <p>Verifying, please wait...</p>
  </div>
);

// Suspense-wrapped component
const PasswordRecoveryWrapper: React.FC = () => {
  return (
    <Suspense fallback={<FallbackLoader />}>
      <PasswordRecoveryPage />
    </Suspense>
  );
};

export default PasswordRecoveryWrapper;
