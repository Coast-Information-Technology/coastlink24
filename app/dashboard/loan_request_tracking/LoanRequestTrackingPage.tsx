"use client";

import React, { useEffect, useState } from "react";
import { SpiralLoader } from "@/components/LoaderSpiral";
import { getTokenFromCookies } from "@/lib/cookies";
import {
  getAllApiRequest,
  getAllApiRequestWithPagination,
} from "@/lib/apiRequest";
import LoanReqTrackingDataTable from "./LoanRequestTrackingData";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ISearchParams } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoanReqTrackingPage() {
  const router = useRouter();
  const searchParamsObj = useSearchParams();
  const [loans, setLoans] = useState([]);
  const [LoanTrackingDownload, setLoanTrackingDownload] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token = getTokenFromCookies();
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(100);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState(
    searchParamsObj.get("q") || ""
  );
  const [startDate, setStartDate] = useState(
    searchParamsObj.get("startDate") || ""
  );
  const [endDate, setEndDate] = useState(searchParamsObj.get("endDate") || "");

  // Update URL when search parameters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (startDate) params.set("startDate", startDate);
    if (endDate) params.set("endDate", endDate);

    const queryString = params.toString();
    const newUrl = queryString
      ? `/dashboard/loan_request_tracking?${queryString}`
      : "/dashboard/loan_request_tracking";

    router.push(newUrl, { scroll: false });
  }, [searchQuery, startDate, endDate, router]);

  // Fetch loans data
  useEffect(() => {
    if (!token) {
      setError("Token not available. Please log in.");
      setLoading(false);
      return;
    }

    const fetchLoans = async () => {
      setLoading(true);
      setError(null);
      try {
        if (startDate && endDate) {
          const endpoint = `/api/session_tracking_by_date/?start_date=${startDate}&end_date=${endDate}`;
          const loanData = await getAllApiRequest(endpoint, token);

          if (!loanData || !loanData["Session Tracking"]) {
            throw new Error("Invalid response format");
          }

          const paginatedData = loanData["Session Tracking"].slice(
            (pageNo - 1) * pageSize,
            pageNo * pageSize
          );
          setLoans(paginatedData);
          setTotalCount(loanData["Session Tracking"].length);
        } else {
          const endpoint = searchQuery
            ? `/api/search_session_tracking/`
            : `/api/session_tracking/`;
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
      } catch (error) {
        console.error("Error fetching loans:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch loans"
        );
        toast.error("Failed to fetch loan requests");
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, [searchQuery, pageNo, pageSize, token, startDate, endDate]);

  // Fetch download data
  useEffect(() => {
    if (!token) {
      setError("Token not available. Please log in.");
      setDownloadLoading(false);
      return;
    }

    const fetchLoanTrackingDownload = async () => {
      setDownloadLoading(true);
      try {
        let endpoint = "/api/session_tracking/download/";

        if (startDate && endDate) {
          endpoint = `/api/session_tracking_by_date/?start_date=${startDate}&end_date=${endDate}`;
        } else if (searchQuery) {
          endpoint = `/api/search_session_tracking/download/?q=${encodeURIComponent(
            searchQuery
          )}`;
        }

        const response = await getAllApiRequest(endpoint, token);

        if (!response) {
          throw new Error("Invalid response format");
        }

        const data =
          startDate && endDate
            ? response["Session Tracking"] || []
            : response.results || response || [];

        setLoanTrackingDownload(data);
      } catch (error) {
        console.error("Error fetching Loan Request:", error);
        toast.error("Failed to fetch download data");
      } finally {
        setDownloadLoading(false);
      }
    };

    fetchLoanTrackingDownload();
  }, [searchQuery, token, startDate, endDate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <SpiralLoader size={80} speed={1.5} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="border-0 shadow-none">
      <LoanReqTrackingDataTable
        downloadData={LoanTrackingDownload}
        data={loans}
        pageNo={pageNo}
        pageSize={pageSize}
        totalCount={totalCount}
        setPageNo={setPageNo}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
    </div>
  );
}
