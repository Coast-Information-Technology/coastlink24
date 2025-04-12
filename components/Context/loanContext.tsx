"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface Loan {
  id: string;
  mandate_reference: string;
  phone_number: string;
  channel: string;
  principal_amount: string;
  interest_amount: string;
  processing_fee: string;
  repayment_amount: string;
  total_repayment_amount: string;
  total_outstanding_amount: string;
  tenure: string;
  repayment_frequency: string;
  disbursement_status: string;
  disbursement_date: string;
  repayment_date: string;
  last_installment_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface LoanContextType {
  loans: Loan[];
  setLoans: (loans: Loan[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  pageNo: number;
  setPageNo: (pageNo: number) => void;
  pageSize: number;
  setPageSize: (pageSize: number) => void;
  totalCount: number;
  setTotalCount: (totalCount: number) => void;
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
  startDate: string;
  setStartDate: (startDate: string) => void;
  endDate: string;
  setEndDate: (endDate: string) => void;
  loansDownload: Loan[];
  setLoansDownload: (loans: Loan[]) => void;
  downloadLoading: boolean;
  setDownloadLoading: (loading: boolean) => void;
}

const LoanContext = createContext<LoanContextType | undefined>(undefined);

export function LoanProvider({ children }: { children: ReactNode }) {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(100);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loansDownload, setLoansDownload] = useState<Loan[]>([]);
  const [downloadLoading, setDownloadLoading] = useState(false);

  const value = {
    loans,
    setLoans,
    loading,
    setLoading,
    error,
    setError,
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
    loansDownload,
    setLoansDownload,
    downloadLoading,
    setDownloadLoading,
  };

  return <LoanContext.Provider value={value}>{children}</LoanContext.Provider>;
}

export function useLoan() {
  const context = useContext(LoanContext);
  if (context === undefined) {
    throw new Error("useLoan must be used within a LoanProvider");
  }
  return context;
}