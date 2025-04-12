"use client";

import React, { useState, useEffect } from "react";
import { getTokenFromCookies } from "@/lib/cookies";
import { getSingleApiRequest } from "@/lib/apiRequest";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { SpiralLoader } from "@/components/LoaderSpiral";
import jsPDF from "jspdf"; // Import jsPDF
import { IPayment } from "@/lib/types";

const SinglePayment = () => {
  const [payment, setPayment] = useState<IPayment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();
  const router = useRouter();
  const token = getTokenFromCookies();

  useEffect(() => {
    if (!token) {
      return;
    }

    const fetchPayment = async () => {
      try {
        const paymentData = await getSingleApiRequest(
          `/api/payments/${id}`,
          token
        );
        setPayment(paymentData);
      } catch (error: any) {
        console.error("Error fetching payment:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPayment();
  }, [id, token]);

  const handleDownload = () => {
    if (!payment) return;

    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.setFont("Calibri");

    // Title
    doc.text("Payment Details", 14, 16);

    // Details Section
    doc.text(`ID: ${payment.id}`, 14, 26);
    doc.text(`Phone Number: ${payment.phone_number}`, 14, 36);
    doc.text(`Payment Method: ${payment.payment_method}`, 14, 46);
    doc.text(`Amount: ${formatCurrency(parseFloat(payment.amount))}`, 14, 56);
    doc.text(`Transfer Code: ${payment.transfer_code}`, 14, 66);
    doc.text(`Transfer Status: ${payment.transfer_status}`, 14, 76);

    // Customer Bank Details Section
    doc.text(`Customer Bank Name: ${payment.borrower_bank_name}`, 14, 86);
    doc.text(
      `Customer Account Number: ${payment.borrower_account_number}`,
      14,
      96
    );
    doc.text(
      `Customer Account Name: ${payment.borrower_account_name}`,
      14,
      106
    );

    // Dates Section
    doc.text(`Created At: ${formatDate(payment.created_at)}`, 14, 116);
    doc.text(`Updated At: ${formatDate(payment.updated_at)}`, 14, 126);

    doc.save(`payment_${payment.borrower_account_name}_${id}.pdf`);
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
      <div className="flex justify-center items-center h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <div className="text-center text-destructive">{error}</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!payment) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <div className="text-center">
              No payment data found for this ID.
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button
          variant="outline"
          onClick={handleDownload}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Download Receipt
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Payment Details</span>
            <Badge
              variant={
                payment.transfer_status === "success"
                  ? "default"
                  : payment.transfer_status === "failed"
                  ? "destructive"
                  : "secondary"
              }
            >
              {payment.transfer_status}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Payment Information
                </h3>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">ID</span>
                    <span className="font-medium">{payment.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Amount</span>
                    <span className="font-medium">
                      {formatCurrency(parseFloat(payment.amount))}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Payment Method</span>
                    <span className="font-medium">{payment.payment_method}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Transfer Code</span>
                    <span className="font-medium">{payment.transfer_code}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Customer Information
                </h3>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Phone Number</span>
                    <span className="font-medium">{payment.phone_number}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Account Name</span>
                    <span className="font-medium">
                      {payment.borrower_account_name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Account Number</span>
                    <span className="font-medium">
                      {payment.borrower_account_number}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Bank Name</span>
                    <span className="font-medium">
                      {payment.borrower_bank_name}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Transaction Details
                </h3>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Mandate Reference</span>
                    <span className="font-medium">
                      {payment.mandate_reference}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Transfer Reference</span>
                    <span className="font-medium">
                      {payment.transfer_reference}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Bank Charges</span>
                    <span className="font-medium">
                      {formatCurrency(parseFloat(payment.bank_charges))}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Transaction Code</span>
                    <span className="font-medium">
                      {payment.transaction_code}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Timestamps
                </h3>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Created At</span>
                    <span className="font-medium">
                      {formatDate(payment.created_at)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Updated At</span>
                    <span className="font-medium">
                      {formatDate(payment.updated_at)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Request Time</span>
                    <span className="font-medium">
                      {formatDate(payment.request_time)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Response Time</span>
                    <span className="font-medium">
                      {formatDate(payment.response_time)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SinglePayment;