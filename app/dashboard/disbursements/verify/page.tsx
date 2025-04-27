"use client";

import React, { useState, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import debounce from "lodash/debounce";
import { getTokenFromCookies } from "@/lib/cookies";
import { postApiRequest } from "@/lib/apiRequest";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { TableModal } from "@/components/TableModal/TableModal";
import { DisbursementVerificationDataTablePage } from "./DisbursementVerificationData";

const DisbursementVerificationPage = () => {
  const [mandateReferences, setMandateReferences] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationResults, setVerificationResults] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isCleaning, setIsCleaning] = useState(false);
  const token = useMemo(() => getTokenFromCookies(), []); // Memoize token to avoid recalculation

  // Helper function to clean mandate references
  const cleanMandateReferences = debounce(() => {
    setIsCleaning(true);

    // Ensure the string is always split into an array of non-empty trimmed items
    const cleanedContent = mandateReferences
      .split(/[\s,]+/) // Split by commas, spaces, or both
      .map((item) => item.trim())
      .filter((item) => item !== "")
      .join(", "); // Join the cleaned items with commas and spaces

    setMandateReferences(cleanedContent);
    setIsCleaning(false);
  }, 300); // Debounce the cleaning function

  // Helper function to handle verification
  const handleVerification = async (mandateArray: string[]) => {
    setLoading(true);
    try {
      const payload = { mandate_references: mandateArray };
      const response = await postApiRequest("/api/verify-payment/", payload, {
        Authorization: `Bearer ${token}`,
      });

      if (response.status) {
        setVerificationResults(response.data);
        toast.success("Verification successful.");
        setShowModal(true);
      } else {
        toast.error(response.message || "Verification failed.");
      }
    } catch (error) {
      console.error("Verification error:", error);
      toast.error("An error occurred during verification. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!mandateReferences) {
      toast.error("Please enter mandate references.");
      return;
    }

    if (!token) {
      toast.error("Authorization token not found.");
      return;
    }

    const mandateArray = mandateReferences
      .split(",")
      .map((ref) => ref.trim())
      .filter((ref) => ref !== "");

    if (mandateArray.length === 0) {
      toast.error("Please provide at least one valid mandate reference.");
      return;
    }

    if (mandateArray.length > 20) {
      toast.error("You can only submit up to 20 mandate references.");
      return;
    }

    handleVerification(mandateArray);
  };

  return (
    <section className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={5000} />

      <div className="max-w-3xl mx-auto">
        <div className="p-6 sm:p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-200">
              Payments Verification
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Verify up Payments by entering their mandate references
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="mandateReference"
                  className="block text-lg font-medium text-gray-700 dark:text-gray-200"
                >
                  Maximum of 20 Mandate Reference (comma-separated for multiple)
                </label>
                <Button
                  type="button"
                  onClick={cleanMandateReferences}
                  disabled={isCleaning}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {isCleaning ? "Cleaning..." : "Clean Up Content"}
                </Button>
              </div>
              <textarea
                rows={6}
                id="mandateReference"
                value={mandateReferences}
                onChange={(e) => setMandateReferences(e.target.value)}
                className="w-full px-4 py-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Example: 141136937738, 291136930680, 271136871552, 351137865667"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? <Spinner className="h-5 w-5" /> : "Submit"}
            </Button>
          </form>
        </div>

        {showModal && verificationResults && (
          <TableModal isOpen={showModal} onClose={() => setShowModal(false)}>
            <h2 className="text-xl font-semibold">Verification Results</h2>
            <DisbursementVerificationDataTablePage
              data={verificationResults}
              pageNo={1}
              pageSize={verificationResults.length}
              setPageNo={() => {}}
            />
          </TableModal>
        )}
      </div>
    </section>
  );
};

export default DisbursementVerificationPage;
