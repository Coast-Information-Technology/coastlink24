"use client";

import React, { useContext, useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  RowSelectionState,
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
import { UserContext } from "@/components/Context/userContext";
import { Command, CommandInput } from "@/components/ui/command";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DateRangePicker from "@/components/DatePicker";
import { IBorrowerData, IBorrowerLoanChoiceDataTableProps } from "@/lib/types";

const columns: ColumnDef<IBorrowerData>[] = [
  {
    accessorKey: "id",
    header: () => <div className="font-medium text-gray-900">ID</div>,
    cell: ({ row }) => <div className="lowercase">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "created_at",
    header: () => <div className="font-medium text-gray-900">Created At</div>,
    cell: ({ row }) => {
      const date = row.getValue("created_at") as string;
      const formattedDate = date ? date.replace("T", " ").slice(0, 19) : "";
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "updated_at",
    header: () => <div className="font-medium text-gray-900">Updated At</div>,
    cell: ({ row }) => {
      const date = row.getValue("updated_at") as string;
      const formattedDate = date ? date.replace("T", " ").slice(0, 19) : "";
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "request_id",
    header: () => <div className="font-medium text-gray-900">Request ID</div>,
  },
  {
    accessorKey: "phone_number",
    header: () => <div className="font-medium text-gray-900">Phone Number</div>,
  },
  {
    accessorKey: "max_eligible_offer",
    header: () => <div className="text-right font-medium text-gray-900">Max Eligible Offer</div>,
    cell: ({ row }) => {
      const value = row.getValue("max_eligible_offer") as string;
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
    accessorKey: "first_loan_offer",
    header: () => <div className="text-right font-medium text-gray-900">First Loan Offer</div>,
    cell: ({ row }) => {
      const value = row.getValue("first_loan_offer") as string;
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
    accessorKey: "second_loan_offer",
    header: () => <div className="text-right font-medium text-gray-900">Second Loan Offer</div>,
    cell: ({ row }) => {
      const value = row.getValue("second_loan_offer") as string;
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
    accessorKey: "principal_amount",
    header: () => <div className="text-right font-medium text-gray-900">Principal Amount</div>,
    cell: ({ row }) => {
      const value = row.getValue("principal_amount") as string;
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
    accessorKey: "tenure",
    header: () => <div className="font-medium text-gray-900">Tenure</div>,
  },
  {
    accessorKey: "interest_amount",
    header: () => <div className="text-right font-medium text-gray-900">Interest Amount</div>,
    cell: ({ row }) => {
      const value = row.getValue("interest_amount") as string;
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
    accessorKey: "processing_fee",
    header: () => <div className="text-right font-medium text-gray-900">Processing Fee</div>,
    cell: ({ row }) => {
      const value = row.getValue("processing_fee") as string;
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
    accessorKey: "monthly_repayment",
    header: () => <div className="text-right font-medium text-gray-900">Monthly Repayment</div>,
    cell: ({ row }) => {
      const value = row.getValue("monthly_repayment") as string;
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
    accessorKey: "confirmation_status",
    header: () => <div className="font-medium text-gray-900">Confirmation Status</div>,
    cell: ({ row }) => {
      const status = row.getValue("confirmation_status") as string;
      return (
        <Badge variant={status === "confirmed" ? "default" : "destructive"}>
          {status || "Pending"}
        </Badge>
      );
    },
  },
];

export function BorrowerLoanChoiceDataTable({
  downloadData,
  data,
  pageNo,
  pageSize,
  totalCount,
  setPageNo,
//   setPageSize,
  searchQuery,
  setSearchQuery,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: IBorrowerLoanChoiceDataTableProps) {
  const { user } = useContext(UserContext);
  const [sorting, setSorting] = useState<SortingState>([{ id: "created_at", desc: true }]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [loadingNext, setLoadingNext] = useState(false);
  const [loadingPrevious, setLoadingPrevious] = useState(false);
  const [tempSearchQuery, setTempSearchQuery] = useState(searchQuery);
  const defaultPageSize = 100;

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: { pageSize: defaultPageSize },
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
        if (typeof header === 'function') {
          const headerElement = header({ 
            column: column as any,
            header: column as any,
            table: table as any
          });
          return headerElement?.props?.children;
        }
        return header;
      })
      .filter(Boolean)
      .join(',');

    const rows = downloadData
      .map((row: IBorrowerData) =>
        columns
          .map((column) => {
            const key = (column as any).accessorKey as keyof IBorrowerData;
            const value = row[key];
            return typeof value === "object" ? JSON.stringify(value) : value;
          })
          .join(",")
      )
      .join("\n");

    const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "BORROWER_LOAN_CHOICE.csv");
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
        <CardTitle>Borrower Loan Choices</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <Command className="w-[300px]">
              <CommandInput
                placeholder="Search loan choices..."
                value={tempSearchQuery}
                onValueChange={setTempSearchQuery}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearchClick();
                  }
                }}
              />
            </Command>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <DateRangePicker
                  startDate={startDate}
                  setStartDate={setStartDate}
                  endDate={endDate}
                  setEndDate={setEndDate}
                />
              </div>
              {user?.designation && ["ADMIN"].includes(user.designation) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadCSV}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              )}
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
                          <Link href={`/dashboard/borrower-choice/${row.getValue("id")}`}>
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
                      No results found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePreviousPage}
                  disabled={pageNo <= 1 || loadingPrevious}
                >
                  Previous
                </Button>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  onClick={() => setPageNo(1)}
                  isActive={pageNo === 1}
                >
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  onClick={() => setPageNo(Math.ceil(totalCount / pageSize))}
                  isActive={pageNo === Math.ceil(totalCount / pageSize)}
                >
                  {Math.ceil(totalCount / pageSize)}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextPage}
                  disabled={pageNo * pageSize >= totalCount || loadingNext}
                >
                  Next
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </CardContent>
    </Card>
  );
}

export default BorrowerLoanChoiceDataTable;