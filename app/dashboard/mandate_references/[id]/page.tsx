"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getTokenFromCookies } from "@/lib/cookies";
import { getSingleApiRequest } from "@/lib/apiRequest";
import { SpiralLoader } from "@/components/LoaderSpiral";
import { Badge } from "@/components/ui/badge";

const SingleMandateReference = () => {
  const [mandateReference, setMandateReference] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const token = getTokenFromCookies();

  useEffect(() => {
    if (!token) return;

    const fetchMandateReference = async () => {
      try {
        const mandateData = await getSingleApiRequest(
          `/api/mandate_reference/${id}`,
          token
        );
        setMandateReference(mandateData);
      } catch (error: any) {
        console.error("Error fetching mandate reference:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMandateReference();
  }, [id, token]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? "Invalid Date"
      : date.toISOString().replace("T", " ").slice(0, 19);
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <SpiralLoader size={80} speed={1.5} />
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-4 text-red-500 bg-red-100 rounded-lg">{error}</div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Mandate Reference Details</h1>
        </div>

        {mandateReference && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(mandateReference).map(([key, value]) => {
                // Skip rendering if value is null or empty
                if (value === null || value === "") return null;

                // Special handling for status
                if (key === "status") {
                  return (
                    <div key={key} className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                        {key.replace(/_/g, " ")}
                      </label>
                      <Badge variant={value === "success" ? "default" : "destructive"}>
                        {value as string} 
                      </Badge>
                    </div>
                  );
                }

                // Special handling for JSON data
                if (key === "request_data" || key === "response_data") {
                  return (
                    <div key={key} className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                        {key.replace(/_/g, " ")}
                      </label>
                      <pre className="mt-1 block w-full px-3 py-2 bg-gray-50 text-gray-700 border rounded-md overflow-auto max-h-60">
                        {JSON.stringify(value, null, 2)}
                      </pre>
                    </div>
                  );
                }

                return (
                  <div key={key} className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 capitalize">
                      {key.replace(/_/g, " ")}
                    </label>
                    <input
                      type={typeof value === "number" ? "number" : "text"}
                      name={key}
                      value={key.includes("date") || key.includes("time") ? formatDate(value as string) : (value as string | number)}
                      readOnly
                      className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-700 shadow-sm focus:outline-none"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleMandateReference;