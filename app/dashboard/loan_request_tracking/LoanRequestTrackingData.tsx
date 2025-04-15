"use client";

import React, { useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  Row,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { Download, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { ILoanReqTrackingDataTableProps } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const columns = [
  {
    accessorKey: "id",
    header: () => {
      return <div className="font-semibold text-gray-900">ID</div>;
    },
    cell: ({ row }: { row: Row<any> }) => <div className="text-gray-700 lowercase">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "created_at",
    header: () => <div className="font-semibold text-gray-900">Created At</div>,
    cell: ({ row }: { row: Row<any> }) => {
      const date = row.getValue("created_at") as string;
      const formattedDate = date ? date.replace("T", " ").slice(0, 19) : "";
      return <div className="text-gray-700">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "updated_at",
    header: () => <div className="font-semibold text-gray-900">Updated At</div>,
    cell: ({ row }: { row: Row<any> }) => {
      const date = row.getValue("updated_at") as string;
      const formattedDate = date ? date.replace("T", " ").slice(0, 19) : "";
      return <div className="text-gray-700">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "request_id",
    header: () => {
      return <div className="font-semibold text-gray-900">Request ID</div>;
    },
    cell: ({ row }: { row: Row<any> }) => <div className="text-gray-700">{row.getValue("request_id")}</div>,
  },
  {
    accessorKey: "mandate_reference",
    header: () => {
      return <div className="font-semibold text-gray-900">Mandate Reference</div>;
    },
    cell: ({ row }: { row: Row<any> }) => <div className="text-gray-700">{row.getValue("mandate_reference")}</div>,
  },
  {
    accessorKey: "phone_number",
    header: () => {
      return <div className="font-semibold text-gray-900">Phone Number</div>;
    },
    cell: ({ row }: { row: Row<any> }) => <div className="text-gray-700">{row.getValue("phone_number")}</div>,
  },
  {
    accessorKey: "max_elibility_offer",
    header: () => <div className="text-right font-semibold text-gray-900">Maximum Eligibility Offer</div>,
    cell: ({ row }: { row: Row<any> }) => {
      const value = row.getValue("max_elibility_offer") as string;
      const amount = value ? parseFloat(value) : 0;

      const formatted = !isNaN(amount)
        ? new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "NGN",
          }).format(amount)
        : "N/A";

      return <div className="text-right font-medium text-gray-900">{formatted}</div>;
    },
  },
  {
    accessorKey: "first_loan_offer",
    header: () => <div className="text-right font-semibold text-gray-900">First Loan Offer</div>,
    cell: ({ row }: { row: Row<any> }) => {
      const value = row.getValue("first_loan_offer") as string;
      const amount = value ? parseFloat(value) : 0;

      const formatted = !isNaN(amount)
        ? new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "NGN",
          }).format(amount)
        : "N/A";

      return <div className="text-right font-medium text-gray-900">{formatted}</div>;
    },
  },
  {
    accessorKey: "second_loan_offer",
    header: () => <div className="text-right font-semibold text-gray-900">Second Loan Offer</div>,
    cell: ({ row }: { row: Row<any> }) => {
      const value = row.getValue("second_loan_offer") as string;
      const amount = value ? parseFloat(value) : 0;

      const formatted = !isNaN(amount)
        ? new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "NGN",
          }).format(amount)
        : "N/A";

      return <div className="text-right font-medium text-gray-900">{formatted}</div>;
    },
  },
  {
    accessorKey: "principal_amount",
    header: () => <div className="text-right font-semibold text-gray-900">Principal Amount</div>,
    cell: ({ row }: { row: Row<any> }) => {
      const value = row.getValue("principal_amount") as string;
      const amount = value ? parseFloat(value) : 0;

      const formatted = !isNaN(amount)
        ? new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "NGN",
          }).format(amount)
        : "N/A";

      return <div className="text-right font-medium text-gray-900">{formatted}</div>;
    },
  },
  {
    accessorKey: "tenure",
    header: () => {
      return <div className="font-semibold text-gray-900">Tenure</div>;
    },
    cell: ({ row }: { row: Row<any> }) => <div className="text-gray-700">{row.getValue("tenure")}</div>,
  },
  {
    accessorKey: "interest_amount",
    header: () => <div className="text-right font-semibold text-gray-900">Interest Amount</div>,
    cell: ({ row }: { row: Row<any> }) => {
      const value = row.getValue("interest_amount") as string;
      const amount = value ? parseFloat(value) : 0;

      const formatted = !isNaN(amount)
        ? new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "NGN",
          }).format(amount)
        : "N/A";

      return <div className="text-right font-medium text-gray-900">{formatted}</div>;
    },
  },
  {
    accessorKey: "processing_fee",
    header: () => <div className="text-right font-semibold text-gray-900">Processing Fee</div>,
    cell: ({ row }: { row: Row<any> }) => {
      const value = row.getValue("processing_fee") as string;
      const amount = value ? parseFloat(value) : 0;

      const formatted = !isNaN(amount)
        ? new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "NGN",
          }).format(amount)
        : "N/A";

      return <div className="text-right font-medium text-gray-900">{formatted}</div>;
    },
  },
  {
    accessorKey: "monthly_repayment",
    header: () => <div className="text-right font-semibold text-gray-900">Monthly Repayment</div>,
    cell: ({ row }: { row: Row<any> }) => {
      const value = row.getValue("monthly_repayment") as string;
      const amount = value ? parseFloat(value) : 0;

      const formatted = !isNaN(amount)
        ? new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "NGN",
          }).format(amount)
        : "N/A";

      return <div className="text-right font-medium text-gray-900">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: () => {
      return <div className="font-semibold text-gray-900">Status</div>;
    },
    cell: ({ row }: { row: Row<any> }) => <div className="text-gray-700">{row.getValue("status")}</div>,
  },
  {
    accessorKey: "reason",
    header: () => {
      return <div className="font-semibold text-gray-900">Reason</div>;
    },
    cell: ({ row }: { row: Row<any> }) => <div className="text-gray-700">{row.getValue("reason")}</div>,
  },
];

export function LoanReqTrackingDataTable({
  downloadData,
  data,
  pageNo,
  pageSize,
  totalCount,
  setPageNo,
  searchQuery,
  setSearchQuery,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: ILoanReqTrackingDataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [loadingNext, setLoadingNext] = useState(false);
  const [loadingPrevious, setLoadingPrevious] = useState(false);
  const [tempSearchQuery, setTempSearchQuery] = useState(searchQuery);
  const defaultPageSize = 100;

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: { pageSize: defaultPageSize },
      sorting: [{ id: "created_at", desc: true }],
    },
  });

  const downloadCSV = () => {
    if (
      !columns ||
      !downloadData ||
      columns.length === 0 ||
      downloadData.length === 0
    ) {
      console.error("Columns or downloadData is missing or empty.");
      return;
    }

    const headers = columns
      .map((column) =>
        column.header && typeof column.header === "function"
          ? column.header()
          : column.header
      )
      .filter((header) => header)
      .map((header) =>
        typeof header === "string" ? header : header.props.children
      )
      .join(",");

    const rows = downloadData
      .map((row) =>
        columns
          .map((column) => {
            const value = row[column.accessorKey];
            return typeof value === "object"
              ? JSON.stringify(value, null, 2)
              : value;
          })
          .join(",")
      )
      .join("\n");

    const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows}`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "LOAN REQUEST TRACKING.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleNextPage = () => {
    setLoadingNext(true);
    setPageNo(pageNo + 1);
  };

  const handlePreviousPage = () => {
    setLoadingPrevious(true);
    setPageNo(pageNo - 1);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    setSearchQuery(tempSearchQuery);
    setPageNo(1);
  };

  useEffect(() => {
    setLoadingNext(false);
    setLoadingPrevious(false);
  }, [pageNo]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Loan Request Tracking</span>
          <div className="primary-cta flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={downloadCSV}>
              <Download className="h-4 w-4 mr-2" />
              Download CSV
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by Mandate Ref..."
                value={tempSearchQuery}
                onChange={handleSearchChange}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSearchClick();
                  }
                }}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setPageNo(1);
                }}
                className="w-[180px]"
              />
              <Input
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setPageNo(1);
                }}
                className="w-[180px]"
              />
            </div>
          </div>

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
                          <Link href={`/dashboard/loan_request_tracking/${row.getValue("id")}`}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </Link>
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
              Page {pageNo} of {Math.ceil(totalCount / pageSize)} ({totalCount} total)
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
                disabled={loadingNext || pageNo === Math.ceil(totalCount / pageSize)}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default LoanReqTrackingDataTable;