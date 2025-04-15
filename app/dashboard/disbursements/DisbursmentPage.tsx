"use client";

import React, { useEffect, useState, useMemo } from "react";
import { getTokenFromCookies } from "@/lib/cookies";
import {
  getAllApiRequest,
  getAllApiRequestWithPagination,
} from "@/lib/apiRequest";
import { SpiralLoader } from "@/components/LoaderSpiral";
import { DisbursementsDataTable } from "./DisbursementData";
import { useRouter, useSearchParams } from "next/navigation";
import { IDisbursement, IDisbursementsPageProps } from "@/lib/types";

const DisbursementPage = () => {
  const router = useRouter();
  const searchParamsObj = useSearchParams();
  const [disbursements, setDisbursements] = useState<IDisbursement[]>([]);
  const [disbursementsDownload, setDisbursementsDownload] = useState<IDisbursement[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(100);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState<string>(searchParamsObj.get("q") ?? "");
  const [startDate, setStartDate] = useState<string>(searchParamsObj.get("startDate") ?? "");
  const [endDate, setEndDate] = useState<string>(searchParamsObj.get("endDate") ?? "");

  const token = getTokenFromCookies();

  const filteredByDate = useMemo(
    () => startDate && endDate,
    [startDate, endDate]
  );

  // Update URL when search parameters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (startDate) params.set("startDate", startDate);
    if (endDate) params.set("endDate", endDate);
    
    const queryString = params.toString();
    const newUrl = queryString ? `/dashboard/disbursements?${queryString}` : "/dashboard/disbursements";
    
    router.push(newUrl, { scroll: false });
  }, [searchQuery, startDate, endDate, router]);

  useEffect(() => {
    if (!token) {
      return;
    }

    const fetchLoans = async () => {
      setLoading(true);
      try {
        if (filteredByDate) {
          const endpoint = `/api/payments_by_date/?start_date=${startDate}&end_date=${endDate}`;
          const paymentsData = await getAllApiRequest(endpoint, token);

          const allPayments = paymentsData["Payments"] || [];
          const paginatedData = allPayments.slice(
            (pageNo - 1) * pageSize,
            pageNo * pageSize
          );
          setDisbursements(paginatedData);
          setTotalCount(allPayments.length);
        } else {
          const endpoint = searchQuery
            ? `/api/search_payments/`
            : `/api/payments/`;
          const paymentsData = await getAllApiRequestWithPagination(
            endpoint,
            pageSize,
            pageNo,
            token,
            searchQuery
          );
          setDisbursements(paymentsData.results || []);
          setTotalCount(paymentsData.count || 0);
        }
      } catch (error) {
        console.error("Error fetching loans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, [searchQuery, pageNo, pageSize, token, startDate, endDate, filteredByDate]);

  // Fetch disbursement for download
  useEffect(() => {
    if (!token) {
      return;
    }

    const fetchDisbursementsDownload = async () => {
      setDownloadLoading(true);
      try {
        let endpoint = "/api/payments/download/";

        if (filteredByDate) {
          endpoint = `/api/payments_by_date/?start_date=${startDate}&end_date=${endDate}`;
        } else if (searchQuery) {
          endpoint = `/api/search_payments/download/?q=${encodeURIComponent(searchQuery)}`;
        }

        const response = await getAllApiRequest(endpoint, token);
        const data = filteredByDate
          ? response["Payments"] || []
          : response.results || response || [];

        setDisbursementsDownload(data);
      } catch (error) {
        console.error("Error fetching Payments", error);
      } finally {
        setDownloadLoading(false);
      }
    };

    fetchDisbursementsDownload();
  }, [searchQuery, token, startDate, endDate, filteredByDate]);

  return loading ? (
    <div className="flex justify-center items-center h-screen">
      <SpiralLoader size={80} speed={1.5} />
    </div>
  ) : (
    <DisbursementsDataTable
      downloadData={disbursementsDownload}
      data={disbursements}
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
  );
};

export default DisbursementPage;