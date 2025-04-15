"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { SpiralLoader } from "@/components/LoaderSpiral";
import { getTokenFromCookies } from "@/lib/cookies";
import { getAllApiRequest, getAllApiRequestWithPagination } from "@/lib/apiRequest";
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

  const token = getTokenFromCookies();

  useEffect(() => {
    if (!token) {
      return;
    }

    const fetchLoans = async () => {
      setLoading(true);
      try {
        if (startDate && endDate) {
          const endpoint = `/api/loans_by_date/?start_date=${startDate}&end_date=${endDate}`;
          const loanData = await getAllApiRequest(endpoint, token);
          const paginatedData = loanData["Loans"].slice(
            (pageNo - 1) * pageSize,
            pageNo * pageSize
          );
          setLoans(paginatedData);
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
      } catch (error) {
        console.error("Error fetching loans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, [searchQuery, pageNo, loading, loans, totalCount, loansDownload, downloadLoading, pageSize, token, startDate, endDate]);

  useEffect(() => {
    if (!token) {
      return;
    }

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
        const data = startDate && endDate ? response["Loans"] || [] : response.results || response || [];
        setLoansDownload(data);
      } catch (error) {
        console.error("Error fetching loans for download:", error);
      } finally {
        setDownloadLoading(false);
      }
    };

    fetchLoansDownload();
  }, [searchQuery, loading, loans, totalCount, downloadLoading, loansDownload, pageSize, token, startDate, endDate]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (startDate) params.set("startDate", startDate);
    if (endDate) params.set("endDate", endDate);
    
    const newUrl = params.toString() ? `?${params.toString()}` : "/dashboard/loans";
    router.replace(newUrl, { scroll: false });
  }, [searchQuery, startDate, endDate, router]);

  return (
    <>
      <ToastContainer />
      <div>
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <SpiralLoader size={80} speed={1.5} />
          </div>
        ) : (
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
        )}
      </div>
    </>
  );
}