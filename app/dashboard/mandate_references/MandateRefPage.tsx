"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SpiralLoader } from "@/components/LoaderSpiral";
import { getAllApiRequest, getAllApiRequestWithPagination } from "@/lib/apiRequest";
import { getTokenFromCookies } from "@/lib/cookies";
import MandateRefDataTable from "./MandateRefData";

export default function MandateRefPage() {
  const router = useRouter();
  const searchParamsObj = useSearchParams();
  const [mandateRef, setMandateRef] = useState([]);
  const [mandateRefDownload, setMandateRefDownload] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(100);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState(searchParamsObj.get("q") || "");
  const token = getTokenFromCookies();
  const [startDate, setStartDate] = useState(searchParamsObj.get("startDate") || "");
  const [endDate, setEndDate] = useState(searchParamsObj.get("endDate") || "");

  // Update URL when filters change
  useEffect(() => {
    if (!token) return;

    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (startDate) params.set("startDate", startDate);
    if (endDate) params.set("endDate", endDate);

    const queryString = params.toString();
    const newUrl = queryString ? `/dashboard/mandate_references?${queryString}` : "/dashboard/mandate_references";

    router.push(newUrl, { scroll: false });
  }, [searchQuery, loading, mandateRef, totalCount, pageSize, token, startDate, endDate, router]);

  // Fetch mandate reference data
  useEffect(() => {
    if (!token) return;
    const fetchMandateRef = async () => {
      setLoading(true);
      try {
        if (startDate && endDate) {
          const endpoint = `/api/mandate_reference_by_date/?start_date=${startDate}&end_date=${endDate}`;
          const response = await getAllApiRequest(endpoint, token);
          const paginatedData = response["Mandate Reference"].slice(
            (pageNo - 1) * pageSize,
            pageNo * pageSize
          );
          setMandateRef(paginatedData);
          setTotalCount(response["Mandate Reference"].length);
        } else {
          const endpoint = searchQuery
            ? `/api/search_mandate_reference/`
            : `/api/mandate_reference/`;
          const response = await getAllApiRequestWithPagination(
            endpoint,
            pageSize,
            pageNo,
            token,
            searchQuery
          );
          setMandateRef(response.results || []);
          setTotalCount(response.count || 0);
        }
      } catch (error) {
        console.error("Error fetching Mandate Reference:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchMandateRef();
  }, [searchQuery, loading, pageNo, mandateRef, totalCount, pageSize, token, startDate, endDate]);

  // Fetch Mandate Reference for download
  useEffect(() => {
    if (!token) return;

    const fetchMandateRefDownload = async () => {
      setDownloadLoading(true);
      try {
        let endpoint = "/api/mandate_reference/download/";

        if (startDate && endDate) {
          endpoint = `/api/mandate_reference_by_date/?start_date=${startDate}&end_date=${endDate}`;
        } else if (searchQuery) {
          endpoint = `/api/search_mandate_reference/download/?q=${encodeURIComponent(searchQuery)}`;
        }

        const response = await getAllApiRequest(endpoint, token);
        const data =
          startDate && endDate
            ? response["Mandate Reference"] || []
            : response.results || response || [];

        setMandateRefDownload(data);
      } catch (error) {
        console.error("Error fetching Mandate Reference (download):", error);
      } finally {
        setDownloadLoading(false);
      }
    };

    if (token) fetchMandateRefDownload();
  }, [searchQuery, loading, mandateRef, totalCount, pageSize, pageNo, token, startDate, endDate]);

  return loading ? (
    <div className="flex justify-center items-center h-screen">
    <SpiralLoader size={80} speed={1.5} />
  </div>
  ) : (
    <MandateRefDataTable
      downloadData={mandateRefDownload}
      data={mandateRef}
      pageNo={pageNo}
      pageSize={pageSize}
      totalCount={totalCount}
      setPageNo={setPageNo}
      // setPageSize={setPageSize}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      startDate={startDate}
      setStartDate={setStartDate}
      endDate={endDate}
      setEndDate={setEndDate}
    />
  );
}
