"use client";

import React, { useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnFiltersState,
  ColumnDef,
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
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/utils";
import { DisbursementsDataTableProps, IDisbursement } from "@/lib/types";

export function DisbursementsDataTable({
  downloadData,
  data,
  pageNo,
  pageSize,
  totalCount,
  setPageNo,
  setPageSize,
  searchQuery,
  setSearchQuery,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: DisbursementsDataTableProps) {
  const [sorting, setSorting] = useState([{ id: "created_at", desc: true }]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [loadingNext, setLoadingNext] = useState(false);
  const [loadingPrevious, setLoadingPrevious] = useState(false);
  const [tempSearchQuery, setTempSearchQuery] = useState(searchQuery);

  const columns = useMemo<ColumnDef<IDisbursement>[]>(
    () => [
      {
        id: "id",
        header: () => <div className="font-medium">ID</div>,
        cell: ({ row }) => <div className="lowercase">{row.original.id}</div>,
      },
      {
        id: "created_at",
        header: () => <div>Created At</div>,
        cell: ({ row }) => <div>{formatDate(row.original.created_at)}</div>,
      },
      {
        id: "updated_at",
        header: () => <div>Updated At</div>,
        cell: ({ row }) => <div>{formatDate(row.original.updated_at)}</div>,
      },
      {
        id: "phone_number",
        header: () => <div>Phone Number</div>,
        cell: ({ row }) => <div>{row.original.phone_number}</div>,
      },
      {
        id: "payment_method",
        header: () => <div>Payment Method</div>,
        cell: ({ row }) => <div>{row.original.payment_method}</div>,
      },
      {
        id: "paystack_recipient_code",
        header: () => <div>Paystack Recipient Code</div>,
        cell: ({ row }) => <div>{row.original.paystack_recipient_code}</div>,
      },
      {
        id: "amount",
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }) => {
          const amount = parseFloat(row.original.amount);
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
        id: "transfer_reference",
        header: () => <div>Transfer Reference</div>,
        cell: ({ row }) => <div>{row.original.transfer_reference}</div>,
      },
      {
        id: "transfer_code",
        header: () => <div>Transfer Code</div>,
        cell: ({ row }) => <div>{row.original.transfer_code}</div>,
      },
      {
        id: "bank_charges",
        header: () => <div>Bank Charges</div>,
        cell: ({ row }) => <div>{row.original.bank_charges}</div>,
      },
      {
        id: "transfer_status",
        header: () => <div>Transfer Status</div>,
        cell: ({ row }) => {
          const status = row.original.transfer_status;
          return (
            <Badge
              variant={
                status === "success"
                  ? "default"
                  : status === "failed"
                  ? "destructive"
                  : "secondary"
              }
              className="capitalize"
            >
              {status}
            </Badge>
          );
        },
      },
      {
        id: "mandate_reference",
        header: () => <div>Mandate Reference</div>,
        cell: ({ row }) => <div>{row.original.mandate_reference}</div>,
      },
      {
        id: "borrower_bank_name",
        header: () => <div>Borrower Bank Name</div>,
        cell: ({ row }) => <div>{row.original.borrower_bank_name}</div>,
      },
      {
        id: "borrower_account_number",
        header: () => <div>Borrower Account Number</div>,
        cell: ({ row }) => <div>{row.original.borrower_account_number}</div>,
      },
      {
        id: "borrower_account_name",
        header: () => <div>Borrower Account Name</div>,
        cell: ({ row }) => <div>{row.original.borrower_account_name}</div>,
      },
      {
        id: "transaction_message",
        header: () => <div>Transaction Message</div>,
        cell: ({ row }) => <div>{row.original.transaction_message}</div>,
      },
      {
        id: "transaction_code",
        header: () => <div>Transaction Code</div>,
        cell: ({ row }) => <div>{row.original.transaction_code}</div>,
      },
      {
        id: "request_data",
        header: () => <div>Request Data</div>,
        cell: ({ row }) => <div>{row.original.request_data}</div>,
      },
      {
        id: "request_time",
        header: () => <div>Request Time</div>,
        cell: ({ row }) => {
          const date = row.original.request_time;
          const formattedDate = date ? date.replace("T", " ").slice(0, 19) : "";
          return <div>{formattedDate}</div>;
        },
      },
      {
        id: "response_data",
        header: () => <div>Response Data</div>,
        cell: ({ row }) => <div>{row.original.response_data}</div>,
      },
      {
        id: "response_time",
        header: () => <div>Response Time</div>,
        cell: ({ row }) => {
          const date = row.original.response_time;
          const formattedDate = date ? date.replace("T", " ").slice(0, 19) : "";
          return <div>{formattedDate}</div>;
        },
      },
    ],
    []
  );

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
      pagination: { pageSize: pageSize },
      sorting: [{ id: "created_at", desc: true }],
    },
  });

  const downloadCSV = () => {
    if (!columns || !downloadData || columns.length === 0 || downloadData.length === 0) {
      console.error("Columns or downloadData is missing or empty.");
      return;
    }

    const headers = columns
      .map((column) => {
        const header = column.header;
        return typeof header === "string" ? header : String(header);
      })
      .join(",");

    const rows = downloadData
      .map((row) =>
        columns
          .map((column) => {
            let value = row[column.id as keyof IDisbursement];
            if (value == null) value = "";
            if (typeof value === "object") value = JSON.stringify(value);
            return `"${value}"`;
          })
          .join(",")
      )
      .join("\n");

    const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "DISBURSEMENTS.csv");
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

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Disbursements</span>
          <div className="flex items-center gap-2">
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
                          <Link href={`/dashboard/disbursements/${row.getValue("id")}`}>
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

export default DisbursementsDataTable;