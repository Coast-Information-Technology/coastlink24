"use client";

import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getTokenFromCookies } from "@/lib/cookies";
import { useEffect, useState } from "react";
import { getAllApiRequest, getSingleApiRequest } from "@/lib/apiRequest";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { SlRefresh } from "react-icons/sl";
import { Badge } from "@/components/ui/badge";
import { getTokenExpiryInDays } from "@/utils/tokenExpiry";
import LoadingSpinner from "@/components/reusables/LoadingSpinner";
import { formatDateTime } from "@/utils/dateTimeUtils";
import { DataTable } from "@/components/ui/custom/data-table";

const getBadgeVariant = (status: string) => {
  switch ((status || "").toLowerCase()) {
    case "processing":
      return "secondary"; // Map "warning" to "secondary"
    case "active":
      return "default"; // Map "success" to "default"
    case "rejected":
      return "destructive"; // Map "danger" to "destructive"
    default:
      return "default"; // Default to "default"
  }
};

// Define column configuration for DataTable with default values
const columns = [
  {
    accessorKey: "id",
    header: "Loan ID",
  },
  {
    accessorKey: "phone_number",
    header: "Phone Number",
    cell: (info: any) => info.getValue() || "N/A", // Default for missing phone numbers
  },
  {
    accessorKey: "principal_amount",
    header: "Principal Amount",
    cell: (info: any) =>
      new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(info.getValue() || 0), // Default to 0 if undefined
  },
  {
    accessorKey: "tenure",
    header: "Tenure",
    cell: (info: any) => info.getValue() || "N/A", // Default value for missing tenure
  },
  {
    accessorKey: "interest_amount",
    header: "Interest Amount",
    cell: (info: any) =>
      new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(info.getValue() || 0), // Default to 0 if undefined
  },
  {
    accessorKey: "processing_fee",
    header: "Processing Fee",
    cell: (info: any) =>
      new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(info.getValue() || 0), // Default to 0 if undefined
  },
  {
    accessorKey: "disbursement_status",
    header: "Disbursement Status",
    cell: (info: any) => (
      <Badge variant={getBadgeVariant(info.getValue() || "N/A")}>
        {info.getValue() || "N/A"} {/* Default status */}
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (info: any) => (
      <Badge variant={getBadgeVariant(info.getValue() || "N/A")}>
        {info.getValue() || "N/A"} {/* Default status */}
      </Badge>
    ),
  },
  {
    accessorKey: "disbursement_date",
    header: "Disbursement Date",
    cell: (info: any) =>
      info.getValue() ? formatDateTime(info.getValue()) : "N/A", // Check if value exists, otherwise return "N/A"
  },
  {
    accessorKey: "mandate_reference",
    header: "Mandate Reference",
    cell: (info: any) => info.getValue() || "N/A", // Default for missing references
  },
  {
    accessorKey: "repayment_amount",
    header: "Repayment Amount",
    cell: (info: any) =>
      new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(info.getValue() || 0), // Default to 0 if undefined
  },
  {
    accessorKey: "total_repayment_amount",
    header: "Total Repayment Amount",
    cell: (info: any) =>
      new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(info.getValue() || 0), // Default to 0 if undefined
  },
  {
    accessorKey: "repayment_frequency",
    header: "Repayment Frequency",
    cell: (info: any) => info.getValue() || "N/A", // Default frequency
  },
  {
    accessorKey: "repayment_date",
    header: "Repayment Date",
    cell: (info: any) =>
      info.getValue() ? formatDateTime(info.getValue()) : "N/A", // Return "N/A" if the date is invalid or missing
  },
  {
    accessorKey: "total_outstanding_amount",
    header: "Total Outstanding Amount",
    cell: (info: any) =>
      new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(info.getValue() || 0), // Default to 0 if undefined
  },
  {
    accessorKey: "last_installment_date",
    header: "Last Installment Date",
    cell: (info: any) =>
      info.getValue() ? formatDateTime(info.getValue()) : "N/A", // Default to "N/A" if date is not available
  },
  {
    accessorKey: "created_at",
    header: "Created Date",
    cell: (info: any) =>
      info.getValue() ? formatDateTime(info.getValue()) : "N/A", // Handle missing date
  },
  {
    accessorKey: "updated_at",
    header: "Updated Date",
    cell: (info: any) =>
      info.getValue() ? formatDateTime(info.getValue()) : "N/A", // Return "N/A" for missing or invalid dates
  },
];

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingSpin, setLoadingSpin] = useState<boolean>(false);
  const [loanData, setLoanData] = useState<any[]>([]);
  const [loanHistory, setLoanHistory] = useState<any>(null);
  const [remitaRequest, setRemitaRequest] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const token = getTokenFromCookies();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        const daysUntilExpiry = token ? getTokenExpiryInDays(token) : 0;

        if (!token || !isLoggedIn || daysUntilExpiry === 0) {
          const errorMessage =
            !token || !isLoggedIn
              ? "Please log in."
              : "Session expired. Please log in again.";
          toast.error(errorMessage);
          localStorage.removeItem("isLoggedIn");
          router.push("/login");
          return;
        }

        setLoading(true);
        setError(null);

        // Fetch loan data
        const loanData = await getAllApiRequest("/api/loans/me/", token);
        setLoanData(loanData.slice(0, 5)); // Default to 5 records
        console.log(`Loan Data ${loanData}`);

        // // Function to fetch loan history
        const fetchLoanHistory = async (token: string) => {
          try {
            // Make API request to fetch the latest loan history
            const loanHistoryResponse = await getAllApiRequest(
              "/api/borrower/latest-loan-history/",
              token
            );

            // Handle response based on status
            if (loanHistoryResponse?.status === 200) {
              // Loan history found, set the data
              setLoanHistory(loanHistoryResponse?.data);
            } else if (
              loanHistoryResponse?.status === 404 &&
              loanHistoryResponse?.message === "No loan history found."
            ) {
              // No loan history found, set default values
              setLoanHistory({
                principal_amount: 0,
                disbursement_status: "none",
              });
            } else {
              // Handle unexpected cases (error handling)
              throw new Error("Unexpected response or unknown error.");
            }

            // Logging response details for debugging
            console.log(
              `Loan History: ${loanHistoryResponse.message} (Status: ${loanHistoryResponse.status})`
            );
          } catch (error: any) {
            // Handle errors
            console.error("Error fetching loan history:", error.message);
            toast.error("Failed to load loan history. Please try again later.");
          }
        };

        // Fetch latest Remita Request
        const remitaRequestResponse = await getAllApiRequest(
          "/api/borrower/latest-maximum-eligible-offer",
          token
        );
        setRemitaRequest(remitaRequestResponse?.data || null);
        console.log(`Remita Requesta ${remitaRequestResponse}`);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again later.");
        toast.error("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, router]);

  const handleRefreshMaximumOffer = async () => {
    try {
      setLoadingSpin(true);
      const response = await getSingleApiRequest(
        "/api/borrower/latest-maximum-eligible-offer"
      );
      setRemitaRequest(response?.data);
      toast.success("Maximum eligible offer refreshed.");
    } catch (error) {
      console.error("Failed to refresh offer:", error);
      toast.error("Failed to refresh maximum eligible offer.");
    } finally {
      setLoadingSpin(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <section>
      <h2 className="text-3xl font-bold tracking-tight my-4 ml-8">Dashboard</h2>

      <div className="flex-1 space-y-4 md:pl-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Latest Maximum Eligible Offer
              </CardTitle>
              <SlRefresh
                size={20}
                className={`cursor-pointer ${loadingSpin ? "spin" : ""}`}
                onClick={handleRefreshMaximumOffer}
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loadingSpin ? (
                  <span className="text-[12px]">
                    Fetching your Max Eligible Offer...
                  </span>
                ) : (
                  <>
                    <span className="text-[1.35rem]">&#x20A6;</span>
                    {remitaRequest
                      ? remitaRequest.toLocaleString("en-NG", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      : "0"}
                  </>
                )}
              </div>
              <p className="text-xs text-muted-foreground">Amount</p>
            </CardContent>
          </Card>

          {/* Loan Request Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Latest Loan Request
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <span className="text-[1.35rem]">&#x20A6;</span>
                {loanHistory?.principal_amount
                  ? Number(loanHistory?.principal_amount).toLocaleString(
                      "en-NG",
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )
                  : "0"}
              </div>
              <p className="text-xs text-muted-foreground">Amount</p>
            </CardContent>
          </Card>

          {/* Corrected Disbursement Status Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Latest Loan Request Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">
                {loanHistory?.disbursement_status || "no status"}
              </div>
              <p className="text-xs text-muted-foreground">Status</p>
            </CardContent>
          </Card>

          {/* Last Loan Monthly Repayment Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Last Loan Monthly Repayment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <span className="text-[1.35rem]">&#x20A6;</span>
                {loanHistory?.repayment_amount
                  ? Number(loanHistory.repayment_amount).toLocaleString(
                      "en-NG",
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )
                  : "0"}
              </div>
              <p className="text-xs text-muted-foreground">Amount</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
          <Card className="lg:col-span-7">
            <CardHeader>
              <CardTitle>Recent Loans</CardTitle>
              <CardDescription>Last 5 recent loans</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable data={loanData} columns={columns} />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
