"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { SpiralLoader } from "@/components/LoaderSpiral";
import { getTokenFromCookies } from "@/lib/cookies";
import {
  getAllApiRequest,
  getAllApiRequestWithPagination,
} from "@/lib/apiRequest";
import LoansDataTable from "./LoanData";
import { useLoan } from "@/app/component/loanContext/loanContext";

export default function LoansPage() {
  const router = useRouter();
  const searchParamsObj = useSearchParams();
  const {
    loans,
    setLoans,
    loading,
    setLoading,
    downloadLoading,
    setDownloadLoading,
    loansDownload,
    setLoansDownload,
    pageNo,
    setPageNo,
    pageSize,
    setPageSize,
    totalCount,
    setTotalCount,
    searchQuery,
    setSearchQuery,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = useLoan();

  const [error, setError] = useState<string | null>(null);
  const token = getTokenFromCookies();

  // Fetch loans whenever pagination, search, or date range changes
  useEffect(() => {
    if (!token) {
      setError("Authentication token not available. Please log in.");
      setLoading(false);
      return;
    }

    const fetchLoans = async () => {
      setLoading(true);
      setError(null);
      try {
        if (startDate && endDate) {
          const endpoint = `/api/loans_by_date/?start_date=${startDate}&end_date=${endDate}`;
          const loanData = await getAllApiRequest(endpoint, token);
          const paginated = loanData["Loans"].slice(
            (pageNo - 1) * pageSize,
            pageNo * pageSize
          );
          setLoans(paginated);
          setTotalCount(loanData["Loans"].length);
        } else {
          const endpoint = searchQuery ? `/api/search_loans/` : `/api/loans/`;
          const loanData = await getAllApiRequestWithPagination(
            endpoint,
            pageSize,
            pageNo,
            token,
            searchQuery
          );
          setLoans(loanData.results || []);
          setTotalCount(loanData.count || 0);
        }
      } catch (err: any) {
        console.error("Error fetching loans:", err);
        setError(err?.message || "Failed to fetch loans.");
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, [pageNo, pageSize, startDate, endDate, searchQuery, token]);

  // Fetch full download list
  useEffect(() => {
    if (!token) return;

    const fetchLoansDownload = async () => {
      setDownloadLoading(true);
      try {
        let endpoint = "/api/loans/download/";
        if (startDate && endDate) {
          endpoint = `/api/loans_by_date/?start_date=${startDate}&end_date=${endDate}`;
        } else if (searchQuery) {
          endpoint = `/api/search_loans/download/?q=${encodeURIComponent(searchQuery)}`;
        }

        const response = await getAllApiRequest(endpoint, token);
        const data =
          startDate && endDate
            ? response["Loans"] || []
            : response.results || response || [];

        setLoansDownload(data);
      } catch (err) {
        console.error("Error fetching loans for download:", err);
      } finally {
        setDownloadLoading(false);
      }
    };

    fetchLoansDownload();
  }, [startDate, endDate, searchQuery, token]);

  // Sync URL parameters
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (startDate) params.set("startDate", startDate);
    if (endDate) params.set("endDate", endDate);

    router.replace(
      params.toString() ? `?${params.toString()}` : "/dashboard/loans",
      { scroll: false }
    );
  }, [searchQuery, startDate, endDate, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <SpiralLoader size={80} speed={1.5} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-red-500 text-lg font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <div className="p-4">
        <LoansDataTable
          downloadData={loansDownload}
          data={loans}
          pageNo={pageNo}
          pageSize={pageSize}
          totalCount={totalCount}
          setPageNo={setPageNo}
          setPageSize={setPageSize}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
      </div>
    </>
  );
}
