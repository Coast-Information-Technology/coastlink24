"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { SpiralLoader } from "@/components/LoaderSpiral";
import { IApiError, ILoan } from "@/lib/types";
import { getTokenFromCookies } from "@/lib/cookies";
import { getSingleApiRequest } from "@/lib/apiRequest";

const SingleLoan = () => {
  const router = useRouter();

  const { id } = useParams();
  const [loan, setLoan] = useState<ILoan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = getTokenFromCookies();

  useEffect(() => {
    if (!token) {
      setError("Token not available. Please log in.");
      setLoading(false);
      return;
    }

    const fetchLoan = async () => {
      try {
        const loanData = await getSingleApiRequest(`/api/loans/${id}`, token);
        setLoan(loanData);
      } catch (err) {
        const error = err as Error;
        console.error("Error fetching the loan:", error);
        setError(error.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchLoan();
  }, [id, token]);

  const formatCurrency = (value: string) => {
    const amount = parseFloat(value);
    return !isNaN(amount)
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "NGN",
        }).format(amount)
      : "N/A";
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleString();
  };

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
        <Button onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
    );
  }

  if (!loan) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <div className="text-gray-500 text-lg">No loan data available</div>
        <Button onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Loans
        </Button>
        <Badge
          variant="secondary"
          className={`text-lg px-4 py-1 rounded-full text-white ${
            loan.status === "Active"
              ? "bg-green-500"
              : loan.status === "Closed"
              ? "bg-red-500"
              : "bg-gray-500"
          }`}
        >
          {loan.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Loan Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Mandate Reference</p>
                <p className="font-medium">{loan.mandate_reference}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone Number</p>
                <p className="font-medium">{loan.phone_number}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Channel</p>
                <p className="font-medium">{loan.channel}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Tenure</p>
                <p className="font-medium">{loan.tenure}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Amount Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Principal Amount</p>
                <p className="font-medium">{formatCurrency(loan.principal_amount)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Interest Amount</p>
                <p className="font-medium">{formatCurrency(loan.interest_amount)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Processing Fee</p>
                <p className="font-medium">{formatCurrency(loan.processing_fee)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Repayment Amount</p>
                <p className="font-medium">{formatCurrency(loan.repayment_amount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Repayment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Total Repayment Amount</p>
                <p className="font-medium">{formatCurrency(loan.total_repayment_amount)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Outstanding Amount</p>
                <p className="font-medium">{formatCurrency(loan.total_outstanding_amount)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Repayment Frequency</p>
                <p className="font-medium">{loan.repayment_frequency}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Disbursement Status</p>
                <p className="font-medium">{loan.disbursement_status}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Date Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Disbursement Date</p>
                <p className="font-medium">{formatDate(loan.disbursement_date)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Repayment Date</p>
                <p className="font-medium">{formatDate(loan.repayment_date)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Installment Date</p>
                <p className="font-medium">{formatDate(loan.last_installment_date)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Created At</p>
                <p className="font-medium">{formatDate(loan.created_at)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SingleLoan;