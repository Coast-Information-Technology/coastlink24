"use client";

import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  useReactTable,
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { UserContext } from "@/components/Context/userContext";

const columns = [
  {
    accessorKey: "id",
    header: () => <div className="text-left">ID</div>,
    cell: ({ row }: { row: Row<any> }) => (
      <div className="lowercase">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "created_at",
    header: () => <div>Created At</div>,
    cell: ({ row }: { row: Row<any> }) => {
      const date = row.getValue("created_at") as string;
      const formattedDate = date ? date.replace("T", " ").slice(0, 19) : "";
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "updated_at",
    header: () => <div>Updated At</div>,
    cell: ({ row }: { row: Row<any> }) => {
      const date = row.getValue("updated_at") as string;
      const formattedDate = date ? date.replace("T", " ").slice(0, 19) : "";
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "customer_id",
    header: () => <div>Customer ID</div>,
  },
  {
    accessorKey: "first_name",
    header: () => <div>First Name</div>,
  },
  {
    accessorKey: "last_name",
    header: () => <div>Last Name</div>,
  },
  {
    accessorKey: "phone_number",
    header: () => <div>Phone Number</div>,
  },
  {
    accessorKey: "mandate_reference",
    header: () => <div>Mandate Reference</div>,
  },
  {
    accessorKey: "total_disbursed",
    header: () => <div className="text-right">Total Disbursed</div>,
    cell: ({ row }: { row: Row<any> }) => {
      const value = row.getValue("total_disbursed") as string;

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
    accessorKey: "outstanding_balance",
    header: () => <div className="text-right">Outstanding Balance</div>,
    cell: ({ row }: { row: Row<any> }) => {
      const value = row.getValue("outstanding_balance") as string;

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
    accessorKey: "loan_repayment_ref",
    header: () => <div>Loan Repayment Ref</div>,
  },
  {
    accessorKey: "employer_name",
    header: () => <div>Employer Name</div>,
  },
  {
    accessorKey: "salary_account_number",
    header: () => <div>Salary Account Number</div>,
  },
  {
    accessorKey: "authorisation_code",
    header: () => <div>Authorisation Code</div>,
  },
  {
    accessorKey: "salary_bank_name",
    header: () => <div>Salary Bank Name</div>,
  },
  {
    accessorKey: "disbursement_account_bank",
    header: () => <div>Disbursement Bank Account</div>,
  },
  {
    accessorKey: "collection_start_date",
    header: () => <div>Collection Start Date</div>,
    cell: ({ row }: { row: Row<any> }) => {
      const date = row.getValue("collection_start_date") as string;
      const formattedDate = date ? date.replace("T", " ").slice(0, 19) : "";
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "date_of_disbursement",
    header: () => <div>Date of Disbursement</div>,
    cell: ({ row }: { row: Row<any> }) => {
      const date = row.getValue("date_of_disbursement") as string;
      const formattedDate = date ? date.replace("T", " ").slice(0, 19) : "";
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "disbursement_account",
    header: () => <div>Disbursement Account</div>,
  },
  {
    accessorKey: "status",
    header: () => <div>Status</div>,
  },
  {
    accessorKey: "lender_details",
    header: () => <div>Lender Details</div>,
  },
  {
    accessorKey: "repayment_count",
    header: () => <div>Repayment Count</div>,
  },
  {
    accessorKey: "total_repayment_amount",
    header: () => <div className="text-right">Total Repayment Amount</div>,
    cell: ({ row }: { row: Row<any> }) => {
      const value = row.getValue("total_repayment_amount") as string;

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
    accessorKey: "response_data",
    header: () => {
      return <div>Response Data</div>;
    },
    cell: ({ row }: { row: Row<any> }) => {
      const responseData = row.getValue("response_data");
      return (
        <div
          style={{
            maxHeight: "21.5vh",
            maxWidth: "25vw",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      );
    },
  },
];

interface ManualCollectionsDataTableProps {
  downloadData: any[];
  data: any[];
  pageNo: number;
  pageSize: number;
  totalCount: number;
  setPageNo: Dispatch<SetStateAction<number>>;
  setPageSize: Dispatch<SetStateAction<number>>; // 👈 Add this
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  startDate: string;
  setStartDate: Dispatch<SetStateAction<string>>;
  endDate: string;
  setEndDate: Dispatch<SetStateAction<string>>;
  loading: boolean;
  downloadLoading: boolean;
}

export function ManualCollectionsDataTable({
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
}: ManualCollectionsDataTableProps) {
  const { user } = useContext(UserContext);
  const [sorting, setSorting] = useState([{ id: "created_at", desc: true }]);
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
  const isDownloadReady = columns.length > 0 && downloadData.length > 0;
  const [isProcessingDownload, setIsProcessingDownload] = useState(false);

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

    setIsProcessingDownload(true); // start processing

    const headers = columns
      .map((column) => column.header && column.header())
      .filter((header) => header !== null)
      .map((header) => header.props.children);

    const rows = downloadData
      .map((row, index) =>
        columns
          .map((column) => {
            let value = row[column.accessorKey];

            if (column.accessorKey === "id") {
              value = value || `${index + 1}`;
            }

            if (column.accessorKey === "response_data") {
              value = JSON.stringify(value, null, 2);
            }

            if (
              typeof value === "string" &&
              (value.includes(",") || value.includes("\n"))
            ) {
              value = `"${value.replace(/"/g, '""')}"`;
            }

            return value;
          })
          .join(",")
      )
      .join("\n");

    const csvContent = `data:text/csv;charset=utf-8,${headers.join(",")}\n${rows}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "MANUAL COLLECTIONS.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Done processing
    setTimeout(() => {
      setIsProcessingDownload(false);
    }, 1500); // Wait a tiny bit to be safe before hiding
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
    setPageNo(1); // Reset to the first page on new search
  };

  useEffect(() => {
    setLoadingNext(false);
    setLoadingPrevious(false);
  }, [pageNo]);

  return (
    <Card className="w-full border-0 shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="font-bold text-lg">Manual Collections</span>
          {["ADMIN"].includes(user?.designation || "") && (
            <Button
              variant="outline"
              size="sm"
              onClick={downloadCSV}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download CSV
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
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
                className="w-[150px]"
              />
              <Input
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setPageNo(1);
                }}
                className="w-[150px]"
              />
              <Button onClick={handleSearchClick} className="">
                Search
              </Button>
            </div>
          </div>

          {/* Table */}
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
                          <Link
                            href={`/dashboard/manual-collections/${row.getValue(
                              "id"
                            )}`}
                          >
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
                      Empty Result.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
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
                disabled={pageNo <= 1 || loadingPrevious}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={pageNo * pageSize >= totalCount || loadingNext}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      {isProcessingDownload && (
        <div className="text-indigo-600 bg-white w-full text-sm mt-2 animate-pulse">
          All Collections Download is processing...
        </div>
      )}
    </Card>
  );
}
