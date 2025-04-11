"use client";

import React, { useEffect, useState, useMemo } from "react";
import { getTokenFromCookies } from "@/lib/cookies";
import {
  getAllApiRequest,
  getAllApiRequestWithPagination,
} from "@/lib/apiRequest";
import { SpiralLoader } from "@/components/LoaderSpiral";
import { BorrowerDataTable } from "./BorrowData";
import { IBorrower, IBorrowersPageProps } from "@/lib/types";

const BorrowersPage: React.FC<IBorrowersPageProps> = ({ searchParams }) => {
  const [borrowers, setBorrowers] = useState<IBorrower[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(100);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.q ?? "");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const token = getTokenFromCookies();

  const filteredByDate = useMemo(
    () => startDate && endDate,
    [startDate, endDate]
  );

  useEffect(() => {
    const fetchBorrowers = async () => {
      setLoading(true);

      if (!token) return;

      try {
        if (filteredByDate) {
          const endpoint = `/api/borrowers_by_date/?start_date=${startDate}&end_date=${endDate}`;
          const borrowersData = await getAllApiRequest(endpoint, token);

          const allBorrowers = borrowersData["Borrowers"] || [];
          const paginatedData = allBorrowers.slice(
            (pageNo - 1) * pageSize,
            pageNo * pageSize
          );

          setBorrowers(paginatedData);
          setTotalCount(allBorrowers.length);
        } else {
          const endpoint = searchQuery
            ? `/api/search_borrowers/`
            : `/api/borrowers/`;

          const borrowersData = await getAllApiRequestWithPagination(
            endpoint,
            pageSize,
            pageNo,
            token,
            searchQuery
          );

          setBorrowers(borrowersData.results || []);
          setTotalCount(borrowersData.count || 0);
        }
      } catch (error) {
        console.error("Error fetching borrowers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBorrowers();
  }, [
    filteredByDate,
    searchQuery,
    pageNo,
    pageSize,
    startDate,
    endDate,
    token,
  ]);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center py-20">
          <SpiralLoader size={120} speed={1.5} />
        </div>
      ) : (
        <BorrowerDataTable
          data={borrowers}
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
  );
};

export default BorrowersPage;
