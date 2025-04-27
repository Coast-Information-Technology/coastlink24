"use client";

import React, { useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

const columns = [
  {
    accessorKey: "id",
    header: () => <div className="text-left">ID</div>,
    cell: ({ row }: { row: any }) => (
      <div className="lowercase">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "created_at",
    header: () => <div>Created At</div>,
    cell: ({ row }: { row: any }) => {
      const date = row.getValue("created_at");
      const formattedDate = date ? date.replace("T", " ").slice(0, 19) : "";
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "updated_at",
    header: () => <div>Updated At</div>,
    cell: ({ row }: { row: any }) => {
      const date = row.getValue("updated_at");
      const formattedDate = date ? date.replace("T", " ").slice(0, 19) : "";
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "phone_number",
    header: () => <div>Phone Number</div>,
  },
  {
    accessorKey: "payment_method",
    header: () => <div>Payment Method</div>,
  },
  {
    accessorKey: "paystack_recipient_code",
    header: () => <div>Paystack Recipient Code</div>,
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }: { row: any }) => {
      const value = row.getValue("amount");

      const amount = value ? parseFloat(value) : 0;

      const formatted = !isNaN(amount)
        ? new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "NGN",
          }).format(amount)
        : "N/A";

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "transfer_reference",
    header: () => <div>Transfer Reference</div>,
  },
  {
    accessorKey: "transfer_code",
    header: () => <div>Transfer Code</div>,
  },
  {
    accessorKey: "bank_charges",
    header: () => <div>Bank Charges</div>,
  },
  {
    accessorKey: "transfer_status",
    header: () => <div>Transfer Status</div>,
  },
  {
    accessorKey: "mandate_reference",
    header: () => <div>Mandate Reference</div>,
  },
  {
    accessorKey: "borrower_bank_name",
    header: () => <div>Borrower Bank Name</div>,
  },
  {
    accessorKey: "borrower_account_number",
    header: () => <div>Borrower Account Number</div>,
  },
  {
    accessorKey: "borrower_account_name",
    header: () => <div>Borrower Account Name</div>,
  },
  {
    accessorKey: "transaction_message",
    header: () => <div>Transaction Message</div>,
  },
  {
    accessorKey: "transaction_code",
    header: () => <div>Transaction Code</div>,
  },
  {
    accessorKey: "request_data",
    header: () => <div>Request Data</div>,
  },
  {
    accessorKey: "request_time",
    header: () => <div>Request Time</div>,
    cell: ({ row }: { row: any }) => {
      const date = row.getValue("request_time");
      const formattedDate = date ? date.replace("T", " ").slice(0, 19) : "";
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "response_data",
    header: () => <div>Response Data</div>,
  },
  {
    accessorKey: "response_time",
    header: () => <div>Response Time</div>,
    cell: ({ row }: { row: any }) => {
      const date = row.getValue("response_time");
      const formattedDate = date ? date.replace("T", " ").slice(0, 19) : "";
      return <div>{formattedDate}</div>;
    },
  },
];

interface DisbursementData {
  id: string;
  mandate_reference: string;
  transaction_id: string;
  is_success: string;
  message: string;
  [key: string]: any;
}

interface MultipleDisbursementsDataTableProps {
  data: DisbursementData[]; // Array of disbursement data
  pageNo: number;
  pageSize: number;
  totalCount: number;
  setPageNo: (page: number) => void;
}

export function MultipleDisbursementsDataTable({
  data,
  pageNo,
  pageSize,
  setPageNo,
  totalCount,
}: MultipleDisbursementsDataTableProps) {
  const [currentData, setCurrentData] = useState<DisbursementData[]>([]);
  const [loadingNext, setLoadingNext] = useState(false);
  const [loadingPrevious, setLoadingPrevious] = useState(false);
  const totalPages = Math.ceil(data.length / pageSize);

  // Paginate data based on the current page
  useEffect(() => {
    const startIdx = (pageNo - 1) * pageSize;
    const endIdx = startIdx + pageSize;
    setCurrentData(data.slice(startIdx, endIdx));
  }, [data, pageNo, pageSize]);

  const table = useReactTable({
    data: currentData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const downloadCSV = () => {
    if (!columns || !data || columns.length === 0 || data.length === 0) {
      console.error("Columns or data is missing or empty.");
      return;
    }

    // Extract headers from columns
    const headers = columns.map((column) => {
      // Handle header if it's a function (like in your ID column)
      if (typeof column.header === "function") {
        const headerContent = column.header(); // Call header without arguments
        return headerContent.props?.children || column.accessorKey;
      }
      return column.accessorKey;
    });

    // Process all data rows (not just current page)
    const rows = data.map((row) => {
      return columns
        .map((column) => {
          let value = row[column.accessorKey];

          // Format dates if needed
          if (
            (column.accessorKey === "created_at" ||
              column.accessorKey === "updated_at") &&
            value
          ) {
            value = value.replace("T", " ").slice(0, 19);
          }

          // Convert to string and handle special characters
          if (value !== undefined && value !== null) {
            value = String(value);
            // Escape quotes and wrap in quotes if contains commas or newlines
            if (
              value.includes('"') ||
              value.includes(",") ||
              value.includes("\n")
            ) {
              value = `"${value.replace(/"/g, '""')}"`;
            }
          } else {
            value = "";
          }

          return value;
        })
        .join(",");
    });

    // Combine headers and rows
    const csvContent = [headers.join(","), ...rows].join("\n");

    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "Multiple Disbursement Search.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle next page
  const handleNextPage = () => {
    setLoadingNext(true);
    setPageNo(Math.min(pageNo + 1, totalPages));
  };

  // Handle previous page
  const handlePreviousPage = () => {
    setLoadingPrevious(true);
    setPageNo(Math.max(pageNo - 1, 1));
  };

  useEffect(() => {
    setLoadingNext(false);
    setLoadingPrevious(false);
  }, [pageNo]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Disbursements</span>
          <div className="primary-cta flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={downloadCSV}>
              <Download className="h-4 w-4 mr-2" />
              Download CSV
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Page {pageNo} of {Math.ceil(totalCount / pageSize)} ({totalCount}{" "}
            total)
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviousPage}
              disabled={loadingPrevious || pageNo === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={
                loadingNext || pageNo === Math.ceil(totalCount / pageSize)
              }
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
