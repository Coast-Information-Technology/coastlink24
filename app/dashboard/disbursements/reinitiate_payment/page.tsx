"use client";

import React, { useState, useMemo, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getTokenFromCookies } from "@/lib/cookies";
import { postApiRequest } from "@/lib/apiRequest";
import { TableModal } from "@/components/TableModal/TableModal";
import { DisbursementResponseDataTablePage } from "./DisbursementResponseData";
import { Spinner } from "@/components/ui/spinner";
import { debounce } from "lodash";
import { Button } from "@/components/ui/button";

const ManualDisbursementPage = () => {
  const [mandateReferences, setMandateReferences] = useState("");
  const [loading, setLoading] = useState(false);
  const [disbursementResults, setDisbursementResults] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isCleaning, setIsCleaning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const token = useMemo(() => getTokenFromCookies(), []);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (loading) {
      setElapsedTime(0);
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [loading]);

  const cleanMandateReferences = debounce(() => {
    setIsCleaning(true);
    const cleanedContent = mandateReferences
      .split(/[\s,]+/)
      .map((item) => item.trim())
      .filter((item) => item !== "")
      .join(", ");
    setMandateReferences(cleanedContent);
    setIsCleaning(false);
  }, 300);

  const handleVerification = async (mandateArray: string[]) => {
    const startTime = performance.now();

    try {
      const payload = { mandate_references: mandateArray };
      const response = await postApiRequest(
        "/api/process-transfers/",
        payload,
        { Authorization: `Bearer ${token}` }
      );

      const endTime = performance.now();
      const executionTime = ((endTime - startTime) / 1000).toFixed(2);

      if (response) {
        setDisbursementResults(response.results);
        toast.success(`Disbursement successful. Time taken: ${executionTime}s`);
        setShowModal(true);
      } else {
        toast.error(response.message || "Disbursement failed.");
      }
    } catch (error) {
      console.error("Disbursement error:", error);
      toast.error("An error occurred during Disbursement. Please try again.");
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

    if (mandateArray.length > 3) {
      toast.error("You can only submit up to 3 mandate references at a time.");
      return;
    }

    setLoading(true);
    handleVerification(mandateArray);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={5000} />
      
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Manual Disbursement for Failed Payments
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Process up to 3 failed payments by entering their mandate references
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label 
                  htmlFor="mandateReference"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mandate References
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
                id="mandateReference"
                rows={6}
                value={mandateReferences}
                onChange={(e) => setMandateReferences(e.target.value)}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-6"
                placeholder="Enter up to 3 mandate references, separated by commas&#10;Example: 141136937738, 291136930680, 271136871552"
                required
              />
              <p className="mt-2 text-sm text-gray-500">
                Separate multiple references with commas
              </p>
            </div>

            <div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center space-x-2">
                    <Spinner className="h-5 w-5" />
                    <span>Processing... {elapsedTime}s</span>
                  </span>
                ) : (
                  "Process Disbursements"
                )}
              </Button>
            </div>
          </form>
        </div>

        {showModal && disbursementResults && (
          <TableModal isOpen={showModal} onClose={() => setShowModal(false)}>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Disbursement Results
              </h2>
              <DisbursementResponseDataTablePage
                data={disbursementResults}
                pageNo={1}
                pageSize={disbursementResults.length}
                setPageNo={() => {}}
              />
            </div>
          </TableModal>
        )}
      </div>
    </div>
  );
};

export default ManualDisbursementPage;