"use client";

import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { getTokenFromCookies } from "@/lib/cookies";
import { extractMandateReference } from "@/lib/utils";
import { TableModal } from "@/components/TableModal/TableModal";
import { MultipleDisbursementsDataTable } from "./MultipleDisbursementsData";
import { postApiRequest } from "@/lib/apiRequest";
import { Button } from "@/components/ui/button";

export default function MultipleDisbursementsPage() {
  const [mandateRef, setMandateRef] = useState("");
  const [mandateRefsFromFile, setMandateRefsFromFile] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tableData, setTableData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 100;

  const token = getTokenFromCookies(); // no need for extra state

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMandateRef(e.target.value);
    setError(null);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const payload = await extractMandateReference(file);
      setMandateRefsFromFile(payload.mandate_references);
      setMandateRef(payload.mandate_references.join(", "));
      toast.success("Mandate references extracted successfully.");
    } catch (err) {
      console.error("Error extracting mandate references:", err);
      toast.error("Failed to extract mandate references.");
    } finally {
      setLoading(false);
    }
  };

  const handleBulkSubmit = async () => {
    if (!mandateRef.trim()) {
      setError("Please upload a file or enter mandate references.");
      return;
    }
    if (!token) {
      setError("Authentication token missing.");
      return;
    }

    const mandateReferences = mandateRef
      .split(",")
      .map((ref) => ref.trim())
      .filter((ref) => ref.length === 12);

    if (!mandateReferences.length) {
      setError("No valid mandate references found.");
      return;
    }

    setLoading(true);
    setError(null);
    toast.info(`Searching ${mandateReferences.length} references...`);

    try {
      const payload = { mandate_references: mandateReferences };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payments/by-mandate-references/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      if (response.ok) {
        if (data.length) {
          setTableData(data);
          setShowModal(true);
          toast.success("Mandate references found.");
        } else {
          toast.warn("No data found for the provided references.");
        }
      } else {
        toast.error(data.detail || "Something went wrong.");
      }
    } catch (err) {
      console.error("Error checking mandate references:", err);
      toast.error("Error checking mandate references.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleBulkSubmit();
  };

  return (
    <section className="min-h-screen p-6 flex flex-col items-center justify-center">
      <ToastContainer />
      <div className="w-full max-w-3xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
          Search Multiple Disbursements
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">
              Upload Excel File (.xls, .xlsx)
            </label>
            <input
              type="file"
              accept=".xls,.xlsx"
              onChange={handleFileUpload}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm border-[1px] p-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">
              Extracted Mandate References
            </label>
            <textarea
              value={mandateRef}
              onChange={handleChange}
              rows={6}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-2 border-[1px]"
              placeholder="Mandate references will appear here..."
              disabled
            />
          </div>

          {error && (
            <div className="text-sm text-red-500 font-semibold">{error}</div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <Button
              type="submit"
              disabled={loading || !mandateRef}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-md transition duration-200 w-full sm:w-auto"
            >
              {loading ? "Searching..." : "Search Disbursements"}
            </Button>

            <Link
              href="/mandate_reference.xlsx"
              download
              className="text-indigo-600 hover:underline text-sm"
            >
              Download Sample File
            </Link>
          </div>
        </form>
      </div>

      <TableModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <MultipleDisbursementsDataTable
          data={tableData}
          pageNo={pageNo}
          pageSize={pageSize}
          totalCount={totalCount}
          setPageNo={setPageNo}
        />
      </TableModal>
    </section>
  );
}
