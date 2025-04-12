"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getSingleApiRequest } from "@/lib/apiRequest";
import { getTokenFromCookies } from "@/lib/cookies";
import { SpiralLoader } from "@/components/LoaderSpiral";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { IBorrowerChoice } from "@/lib/types";

const SingleBorrowerLoanChoice = () => {
  const [borrowerChoice, setBorrowerChoice] = useState<IBorrowerChoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();
  const token = getTokenFromCookies();

  useEffect(() => {
    if (!token) {
      return;
    }

    const fetchBorrowerChoice = async () => {
      try {
        const borrowerChoiceData = await getSingleApiRequest(
          `/api/borrower_loan_choice/${id}`,
          token
        );
        setBorrowerChoice(borrowerChoiceData);
      } catch (error: any) {
        console.error("Error fetching borrower choice:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBorrowerChoice();
  }, [id, token]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <SpiralLoader size={120} speed={1.5} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle className="text-red-500">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{error}</p>
            <Button variant="outline" className="mt-4" asChild>
              <Link href="/dashboard/borrowers_choice">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to List
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "PPP p");
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Button variant="outline" asChild>
          <Link href="/dashboard/borrowers_choice">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to List
          </Link>
        </Button>
      </div>

      {borrowerChoice && (
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Borrower Loan Choice Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Request ID</h3>
                    <p className="text-lg font-semibold">{borrowerChoice.request_id}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Phone Number</h3>
                    <p className="text-lg font-semibold">{borrowerChoice.phone_number}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Max Eligible Offer</h3>
                    <p className="text-lg font-semibold">{formatCurrency(borrowerChoice.max_eligible_offer)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">First Loan Offer</h3>
                    <p className="text-lg font-semibold">{formatCurrency(borrowerChoice.first_loan_offer)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Second Loan Offer</h3>
                    <p className="text-lg font-semibold">{formatCurrency(borrowerChoice.second_loan_offer)}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Principal Amount</h3>
                    <p className="text-lg font-semibold">{formatCurrency(borrowerChoice.principal_amount)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Tenure</h3>
                    <p className="text-lg font-semibold">{borrowerChoice.tenure}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Interest Amount</h3>
                    <p className="text-lg font-semibold">{formatCurrency(borrowerChoice.interest_amount)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Processing Fee</h3>
                    <p className="text-lg font-semibold">{formatCurrency(borrowerChoice.processing_fee)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Monthly Repayment</h3>
                    <p className="text-lg font-semibold">{formatCurrency(borrowerChoice.monthly_repayment)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Confirmation Status</h3>
                    <Badge 
                      variant={borrowerChoice.confirmation_status === "confirmed" ? "default" : "destructive"}
                      className="mt-1"
                    >
                      {borrowerChoice.confirmation_status || "Pending"}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Created At</h3>
                    <p className="text-lg font-semibold">{formatDate(borrowerChoice.created_at)}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Updated At</h3>
                    <p className="text-lg font-semibold">{formatDate(borrowerChoice.updated_at)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SingleBorrowerLoanChoice;