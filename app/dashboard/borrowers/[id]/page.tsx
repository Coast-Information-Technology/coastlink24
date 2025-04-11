"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getTokenFromCookies } from "@/lib/cookies";
import { getSingleApiRequest } from "@/lib/apiRequest";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { SpiralLoader } from "@/components/LoaderSpiral";
import { IBorrower } from "@/lib/types";

const SingleBorrowerPage = () => {
  const [borrower, setBorrower] = useState<IBorrower | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();
  const token = getTokenFromCookies();

  useEffect(() => {
    if (!token) return;

    const fetchBorrower = async () => {
      try {
        const borrowerData = await getSingleApiRequest(
          `/api/borrowers/${id}`,
          token
        );
        setBorrower(borrowerData);
      } catch (error) {
        console.error("Error fetching borrower:", error);
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchBorrower();
  }, [id, token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <SpiralLoader size={120} speed={1.5} />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-red-500">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!borrower) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Borrower Not Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p>The requested borrower could not be found.</p>
        </CardContent>
      </Card>
    );
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const InfoSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="text-sm">{children}</div>
    </div>
  );

  const StatusBadge = ({ value }: { value: boolean }) => (
    <Badge variant={value ? "default" : "destructive"}>
      {value ? "Yes" : "No"}
    </Badge>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage
              src={borrower.img || "/noavatar.png"}
              alt={`${borrower.first_name} ${borrower.last_name}`}
            />
            <AvatarFallback className="bg-gray-100 text-gray-600 rounded-full">
              {borrower.first_name.charAt(0).toUpperCase()}
              {borrower.last_name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
            <div>
              <CardTitle className="text-2xl">
                {borrower.first_name} {borrower.last_name}
              </CardTitle>
              <p className="text-sm text-gray-500">ID: {borrower.id}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <InfoSection title="Contact Information">
            <div className="space-y-1">
              <p>Email: {borrower.email}</p>
              <p>Phone: {borrower.phone_number}</p>
              <p>Email Verified: <StatusBadge value={borrower.is_email_verified} /></p>
            </div>
          </InfoSection>

          <InfoSection title="Bank Details">
            <div className="space-y-1">
              <p>Bank: {borrower.bank_name}</p>
              <p>Account Number: {borrower.account_number}</p>
              <p>Bank Code: {borrower.bank_code}</p>
              {borrower.bvn && <p>BVN: {borrower.bvn}</p>}
            </div>
          </InfoSection>

          <InfoSection title="Company Information">
            <div className="space-y-1">
              <p>Company: {borrower.company_name}</p>
              <p>Category: {borrower.category}</p>
            </div>
          </InfoSection>

          <InfoSection title="Account Status">
            <div className="space-y-1">
              <p>Login Deactivated: <StatusBadge value={borrower.deactivate_login} /></p>
              <p>Account Deleted: <StatusBadge value={borrower.is_deleted} /></p>
              <p>Attempts: {borrower.attempt_count}</p>
            </div>
          </InfoSection>

          <InfoSection title="Dates">
            <div className="space-y-1">
              <p>Created: {formatDate(borrower.created_at)}</p>
              <p>Updated: {formatDate(borrower.updated_at)}</p>
              <p>Last Token: {formatDate(borrower.last_token_issued_at)}</p>
              <p>Last Attempt: {formatDate(borrower.last_attempt_at)}</p>
            </div>
          </InfoSection>

          <InfoSection title="System Information">
            <div className="space-y-1">
              <p>Remita Customer ID: {borrower.remita_customer_id}</p>
              <p>Last Request ID: {borrower.last_request_id}</p>
              {borrower.paystack_recipient_code && (
                <p>Paystack Code: {borrower.paystack_recipient_code}</p>
              )}
              {borrower.wema_bank_code && (
                <p>Wema Code: {borrower.wema_bank_code}</p>
              )}
            </div>
          </InfoSection>
        </CardContent>
      </Card>
    </div>
  );
};

export default SingleBorrowerPage;