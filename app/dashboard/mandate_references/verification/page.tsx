"use client";

import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getTokenFromCookies } from "@/lib/cookies";
import { postApiRequest } from "@/lib/apiRequest";
import { Button } from "@/components/ui/button";

interface ModalData {
  success?: boolean;
  mandate_reference?: string;
  message?: string;
}

const MandateRefVerificationPage = () => {
  const [requestId, setRequestId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState<ModalData | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const token = getTokenFromCookies();
    const requestBody = {
      request_id: requestId,
      phone_number: phoneNumber,
    };

    try {
      const responseData = await postApiRequest(
        "/api/loans/skipped-loan-without-payment/",
        requestBody,
        token ? { Authorization: `Bearer ${token}` } : {}
      );

      setModalData(responseData);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalData(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      
      <div className="max-w-md w-full mx-auto space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Mandate Reference Verification
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter the request ID and phone number to verify
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow">
          <div className="space-y-6">
            <div>
              <label htmlFor="requestId" className="block text-sm font-medium text-gray-700">
                Request ID
              </label>
              <div className="mt-1">
                <input
                  id="requestId"
                  name="requestId"
                  type="text"
                  required
                  value={requestId}
                  onChange={(e) => setRequestId(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter Request ID"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter Phone Number"
                />
              </div>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center bg-primary py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                loading 
                  ? "bg-indigo-200 cursor-not-allowed" 
                  : "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              }`}
            >
              {loading ? "Verifying..." : "Verify"}
            </Button>
          </div>
        </form>
      </div>

      {/* Modal */}
      {modalData && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Verification Result
                  </h3>
                  <div className="mt-2">
                    {modalData.success && modalData.mandate_reference ? (
                      <div className="text-sm text-gray-700">
                        <p>Mandate Reference:</p>
                        <p className="font-mono bg-gray-50 p-2 rounded mt-1">
                          {modalData.mandate_reference}
                        </p>
                      </div>
                    ) : (
                      <p className="text-sm text-red-600">
                        {modalData.message || "Verification failed. Please try again."}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MandateRefVerificationPage;
