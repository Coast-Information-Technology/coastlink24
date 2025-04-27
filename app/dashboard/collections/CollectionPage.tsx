"use client";

import {
  getAllApiRequest,
  getAllApiRequestWithPagination,
} from "@/lib/apiRequest";
import { getTokenFromCookies } from "@/lib/cookies";
import React, { useEffect, useState } from "react";
import { ManualCollectionsDataTable } from "./CollectionData";
import { SpiralLoader } from "@/components/LoaderSpiral";
import { useSearchParams } from "next/navigation";

export default function CollectionsPage() {
  const [manualCollections, setManualCollections] = useState([]);
  const [manualCollectionsDownloadData, setManualCollectionsDownloadData] =
    useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(100);
  const [totalCount, setTotalCount] = useState(0);
  const token = getTokenFromCookies();
  const [error, setError] = useState<string | null>(null);
  const searchParamsObj = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParamsObj.get("q") || ""
  );
  const [startDate, setStartDate] = useState(
    searchParamsObj.get("startDate") || ""
  );
  const [endDate, setEndDate] = useState(searchParamsObj.get("endDate") || "");

  useEffect(() => {
    const fetchCollections = async () => {
      if (!token) return false;
      setError(null);
      setLoading(true);
      try {
        const endpoint =
          startDate && endDate
            ? `/api/manual-collections/?start_date=${startDate}&end_date=${endDate}`
            : searchQuery
              ? `/api/manual-collections/search/`
              : `/api/manual-collections/`;

        // Fetch data
        const collectionsData = await (startDate && endDate
          ? getAllApiRequest(endpoint, token)
          : getAllApiRequestWithPagination(
              endpoint,
              pageSize,
              pageNo,
              token,
              searchQuery
            ));

        // Separate handling based on endpoint type
        if (startDate && endDate) {
          // Handle date-range response
          setManualCollections(collectionsData.Manual_Collections || []);
          setTotalCount(
            collectionsData.count ||
              collectionsData.Manual_Collections?.length ||
              0
          );
        } else if (searchQuery) {
          // Handle search response
          setManualCollections(collectionsData.results || []);
          setTotalCount(
            collectionsData.count || collectionsData.results?.length || 0
          );
        } else {
          // Handle general collection response
          setManualCollections(collectionsData.results || []);
          setTotalCount(
            collectionsData.count || collectionsData.results?.length || 0
          );
        }
      } catch (error) {
        console.error("Error fetching collections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, [searchQuery, pageNo, pageSize, token, startDate, endDate]);

  useEffect(() => {
    const fetchCollectionsDownload = async () => {
      if (!token) return false;
      setDownloadLoading(true);
      try {
        const endpoint =
          startDate && endDate
            ? `/api/manual-collections/date-range/?start_date=${startDate}&end_date=${endDate}`
            : searchQuery
              ? `/api/manual-collections/search/download/?q=${encodeURIComponent(
                  searchQuery
                )}`
              : "/api/manual-collections/download/";

        const response = await getAllApiRequest(endpoint, token);

        // Handle 'data' response or default to the raw response structure
        const data = response.data || response.results || response || [];
        setManualCollectionsDownloadData(data);
      } catch (error) {
        console.error("Error fetching collections download:", error);
      } finally {
        setDownloadLoading(false);
      }
    };

    fetchCollectionsDownload();
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
    <div>
      <ManualCollectionsDataTable
        data={manualCollections}
        downloadData={manualCollectionsDownloadData}
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
        loading={loading}
        downloadLoading={downloadLoading}
      />
    </div>
  );
}
