"use client";

import React, { useEffect, useState } from "react";
import { SpiralLoader } from "@/components/LoaderSpiral";
import { getAllApiRequest, getAllApiRequestWithPagination } from "@/lib/apiRequest";
import { IBorrowersPageProps } from "@/lib/types";
import { getTokenFromCookies } from "@/lib/cookies";
import BorrowerLoanChoiceDataTable from "./BorrowerChoiceData";

const BorrowerChoicePage: React.FC<IBorrowersPageProps> = ({ searchParams }) => {
  const [borrowerLoanChoice, setBorrowerLoanChoice] = useState([]);
  const [borrowerLoanChoiceDownloadData, setBorrowerLoanChoiceDownloadData] =
    useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const token = getTokenFromCookies();
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(100);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState(searchParams.q || "");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (!token) {
      return;
    }
    const fetchLoans = async () => {
      setLoading(true);
      try {
        if (startDate && endDate) {
          // Fetch all data filtered by date for client-side pagination
          const endpoint = `/api/borrower_loan_choice_by_date/?start_date=${startDate}&end_date=${endDate}`;
          const borrowerLoanChoiceData = await getAllApiRequest(
            endpoint,
            token
          );

          // Client-side pagination: calculate the current page's data slice
          const paginatedData = borrowerLoanChoiceData[
            "Borrower Loan Choice"
          ].slice((pageNo - 1) * pageSize, pageNo * pageSize);
          setBorrowerLoanChoice(paginatedData);
          setTotalCount(borrowerLoanChoiceData["Borrower Loan Choice"].length);
        } else {
          const endpoint = searchQuery
            ? `/api/search_borrower_loan_choice/`
            : `/api/borrower_loan_choice/`;
          const borrowerLoanChoiceData = await getAllApiRequestWithPagination(
            endpoint,
            pageSize,
            pageNo,
            token,
            searchQuery
          );
          setBorrowerLoanChoice(borrowerLoanChoiceData.results || []);
          setTotalCount(borrowerLoanChoiceData.count || []);
        }
      } catch (error) {
        console.error("Error fetching loans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, [searchQuery, pageNo, pageSize, token, startDate, endDate]);

  // Fetch borrowers loan choice for download
  useEffect(() => {
    if (!token) {
      return;
    }
    
    const fetchBorrowerLoanChoiceDownload = async () => {
      setDownloadLoading(true);
      try {
        let endpoint = "/api/borrower_loan_choice/download"; // Default endpoint

        // Determine the endpoint based on the presence of startDate, endDate, or searchQuery
        if (startDate && endDate) {
          endpoint = `/api/borrower_loan_choice_by_date/?start_date=${startDate}&end_date=${endDate}`;
        } else if (searchQuery) {
          endpoint = `/api/search_borrower_loan_choice/download/?q=${encodeURIComponent(
            searchQuery
          )}`;
        }

        const response = await getAllApiRequest(endpoint, token);

        // Set the data based on the response
        const data =
          startDate && endDate
            ? response["Borrower Loan Choice"] || []
            : response.results || response || [];

        setBorrowerLoanChoiceDownloadData(data);
      } catch (error) {
        console.error("Error fetching Borrower Loan Choice:", error);
      } finally {
        setDownloadLoading(false);
      }
    };

    fetchBorrowerLoanChoiceDownload();
  }, [searchQuery, token, startDate, endDate]);

  return (
    <div>
      {loading ? (
        <SpiralLoader size={120} speed={1.5} />
      ) : (
        <>
          <BorrowerLoanChoiceDataTable
            downloadData={borrowerLoanChoiceDownloadData}
            data={borrowerLoanChoice}
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
        </>
      )}
    </div>
  );
}

export default BorrowerChoicePage; 
