"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getTokenFromCookies } from "@/lib/cookies";
import { getSingleApiRequest } from "@/lib/apiRequest";
import { SpiralLoader } from "@/components/LoaderSpiral";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LoanTracker } from "@/components/LoanTracker";

interface LoanData {
  id: string;
  created_at: string;
  updated_at: string;
  request_id: string;
  mandate_reference: string;
  phone_number: string;
  max_elibility_offer: string;
  first_loan_offer: string;
  second_loan_offer: string;
  principal_amount: string;
  tenure: string;
  interest_amount: string;
  processing_fee: string;
  monthly_repayment: string;
  status: string;
  reason: string;
}

const SingleLoanRequestTrack = () => {
  const [loan, setLoan] = useState<LoanData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();
  const token = getTokenFromCookies();

  useEffect(() => {
    if (!token) return;

    const fetchLoan = async () => {
      try {
        const loanData = await getSingleApiRequest(
          `/api/session_tracking/${id}`,
          token
        );
        setLoan(loanData);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLoan();
  }, [id, token]);

  const formatCurrency = (value: string) => {
    const amount = value ? parseFloat(value) : 0;
    return !isNaN(amount)
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "NGN",
        }).format(amount)
      : "N/A";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? "Invalid Date"
      : date.toISOString().replace("T", " ").slice(0, 19);
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <SpiralLoader size={80} speed={1.5} />
    </div>
  );

  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Loan Request Details</span>
            <Badge variant="outline" className="capitalize">
              {loan?.status}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="flex justify-between">
                    <div className="space-y-4">
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">ID</h3>
                        <p className="mt-1 text-sm text-gray-900">{loan?.id}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Created At</h3>
                        <p className="mt-1 text-sm text-gray-900">{loan?.created_at ? formatDate(loan.created_at) : "N/A"}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Updated At</h3>
                        <p className="mt-1 text-sm text-gray-900">{loan?.updated_at ? formatDate(loan.updated_at) : "N/A"}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Request ID</h3>
                        <p className="mt-1 text-sm text-gray-900">{loan?.request_id}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Mandate Reference</h3>
                        <p className="mt-1 text-sm text-gray-900">{loan?.mandate_reference}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                        <p className="mt-1 text-sm text-gray-900">{loan?.phone_number}</p>
                    </div>
                    
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Maximum Eligibility Offer</h3>
                        <p className="mt-1 text-sm text-gray-900">{loan?.max_elibility_offer ? formatCurrency(loan.max_elibility_offer) : "N/A"}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">First Loan Offer</h3>
                        <p className="mt-1 text-sm text-gray-900">{loan?.first_loan_offer ? formatCurrency(loan.first_loan_offer) : "N/A"}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Second Loan Offer</h3>
                        <p className="mt-1 text-sm text-gray-900">{loan?.second_loan_offer ? formatCurrency(loan.second_loan_offer) : "N/A"}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Principal Amount</h3>
                        <p className="mt-1 text-sm text-gray-900">{loan?.principal_amount ? formatCurrency(loan.principal_amount) : "N/A"}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Tenure</h3>
                        <p className="mt-1 text-sm text-gray-900">{loan?.tenure}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Interest Amount</h3>
                        <p className="mt-1 text-sm text-gray-900">{loan?.interest_amount ? formatCurrency(loan.interest_amount) : "N/A"}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Processing Fee</h3>
                        <p className="mt-1 text-sm text-gray-900">{loan?.processing_fee ? formatCurrency(loan.processing_fee) : "N/A"}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Monthly Repayment</h3>
                        <p className="mt-1 text-sm text-gray-900">{loan?.monthly_repayment ? formatCurrency(loan.monthly_repayment) : "N/A"}</p>
                    </div>
                    </div>
                <div className="">
                    <LoanTracker status={(loan?.status || "eligibility") as "eligibility" | "principal amount selection" | "tenure selection" | "approval" | "confirmation" | "mandate reference" | "disbursement processing" | "disbursement failure" | "disbursement successful"} />
                </div>
            </div>
          {loan?.reason && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-500">Reason</h3>
              <p className="mt-1 text-sm text-gray-900">{loan.reason}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SingleLoanRequestTrack;