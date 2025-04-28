"use client";

import React, {
  useState,
  useContext,
  useEffect,
  useMemo,
  useCallback,
} from "react";
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
  Row,
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
import { Modal } from "@/components/confirmationModal/confirmationModal";
import { postApiRequest } from "@/lib/apiRequest";
import { getTokenFromCookies } from "@/lib/cookies";
import { useLoan } from "@/app/component/loanContext/loanContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { ILoan, ILoansDataTableProps } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { formatDateTime } from "@/utils/dateTimeUtils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Define a type for the column header
type ColumnHeader =
  | string
  | React.ReactNode
  | ((props: { column: any }) => React.ReactNode);

// Define a type for the column definition
type CustomColumnDef<TData> = ColumnDef<TData> & {
  accessorKey?: keyof TData;
  header:
    | string
    | React.ReactNode
    | ((props: { column: any }) => React.ReactNode);
  cell?: (props: { row: Row<TData> }) => React.ReactNode;
};

export function LoansDataTable({
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
}: ILoansDataTableProps) {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const { updateLoanStatus } = useLoan();
  const [sorting, setSorting] = useState<SortingState>([
    { id: "created_at", desc: true },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [loadingNext, setLoadingNext] = useState(false);
  const [loadingPrevious, setLoadingPrevious] = useState(false);
  const [tempSearchQuery, setTempSearchQuery] = useState(searchQuery);
  const [modalVisible, setModalVisible] = useState(false);
  const [loanToStop, setLoanToStop] = useState<string | null>(null);
  const defaultPageSize = 100;

  const columns = useMemo<CustomColumnDef<ILoan>[]>(
    () => [
      {
        accessorKey: "id",
        header: () => <div className="font-medium">ID</div>,
        cell: ({ row }: { row: Row<ILoan> }) => (
          <Link href={`/dashboard/loans/${row.getValue("id")}`}>
            <div className="lowercase">{row.getValue("id")}</div>
          </Link>
        ),
      },
      {
        accessorKey: "created_at",
        header: () => <div>Created At</div>,
        cell: ({ row }: { row: Row<ILoan> }) => {
          const date = row.getValue("created_at") as string;
          return (
            <Link href={`/dashboard/loans/${row.getValue("id")}`}>
              <div>{formatDateTime(date)}</div>
            </Link>
          );
        },
      },
      {
        accessorKey: "updated_at",
        header: () => <div>Updated At</div>,
        cell: ({ row }: { row: Row<ILoan> }) => {
          const date = row.getValue("updated_at") as string;
          return (
            <Link href={`/dashboard/loans/${row.getValue("id")}`}>
              <div>{formatDateTime(date)}</div>
            </Link>
          );
        },
      },
      {
        accessorKey: "mandate_reference",
        header: () => <div>Mandate Reference</div>,
      },
      {
        accessorKey: "phone_number",
        header: () => <div>Phone Number</div>,
      },
      {
        accessorKey: "channel",
        header: "Channel",
      },
      {
        accessorKey: "principal_amount",
        header: () => <div className="text-right">Principal Amount</div>,
        cell: ({ row }: { row: Row<ILoan> }) => {
          const value = row.getValue("principal_amount") as string;
          return (
            <Link href={`/dashboard/loans/${row.getValue("id")}`}>
              <div className="text-right font-medium">
                {formatCurrency(value)}
              </div>
            </Link>
          );
        },
      },
      {
        accessorKey: "tenure",
        header: () => <div className="text-right font-medium">Tenure</div>,
      },
      {
        accessorKey: "interest_amount",
        header: () => <div className="text-right">Interest Amount</div>,
        cell: ({ row }: { row: Row<ILoan> }) => {
          const value = row.getValue("interest_amount") as string;
          return (
            <Link href={`/dashboard/loans/${row.getValue("id")}`}>
              <div className="text-right font-medium">
                {formatCurrency(value)}
              </div>
            </Link>
          );
        },
      },
      {
        accessorKey: "processing_fee",
        header: () => <div className="text-right">Processing Fee</div>,
        cell: ({ row }: { row: Row<ILoan> }) => {
          const value = row.getValue("processing_fee") as string;
          return (
            <Link href={`/dashboard/loans/${row.getValue("id")}`}>
              <div className="text-right font-medium">
                {formatCurrency(value)}
              </div>
            </Link>
          );
        },
      },
      {
        accessorKey: "disbursement_status",
        header: () => <div>Disbursement Status</div>,
      },
      {
        accessorKey: "disbursement_date",
        header: () => <div>Disbursement Date</div>,
        cell: ({ row }: { row: Row<ILoan> }) => {
          const date = row.getValue("disbursement_date") as string;
          return (
            <Link href={`/dashboard/loans/${row.getValue("id")}`}>
              <div>{formatDate(date)}</div>
            </Link>
          );
        },
      },
      {
        accessorKey: "status",
        header: () => <div>Status</div>,
        cell: ({ row }: { row: Row<ILoan> }) => {
          const status = row.getValue("status") as string;
          return (
            <div
              className={`text-[12px] px-2 rounded-full text-white text-center ${
                status === "Active"
                  ? "bg-green-500"
                  : status === "Closed"
                    ? "bg-red-500"
                    : "bg-gray-500"
              }`}
            >
              {status}
            </div>
          );
        },
      },
      {
        accessorKey: "repayment_amount",
        header: () => <div className="text-right">Repayment Amount</div>,
        cell: ({ row }: { row: Row<ILoan> }) => {
          const value = row.getValue("repayment_amount") as string;
          return (
            <Link href={`/dashboard/loans/${row.getValue("id")}`}>
              <div className="text-right font-medium">
                {formatCurrency(value)}
              </div>
            </Link>
          );
        },
      },
      {
        accessorKey: "total_repayment_amount",
        header: () => <div className="text-right">Total Repayment Amount</div>,
        cell: ({ row }: { row: Row<ILoan> }) => {
          const value = row.getValue("total_repayment_amount") as string;
          return (
            <Link href={`/dashboard/loans/${row.getValue("id")}`}>
              <div className="text-right font-medium">
                {formatCurrency(value)}
              </div>
            </Link>
          );
        },
      },
      {
        accessorKey: "repayment_frequency",
        header: () => <div>Repayment Frequency</div>,
      },
      {
        accessorKey: "repayment_date",
        header: () => <div>Repayment Date</div>,
        cell: ({ row }: { row: Row<ILoan> }) => {
          const date = row.getValue("repayment_date") as string;
          return (
            <Link href={`/dashboard/loans/${row.getValue("id")}`}>
              <div>{formatDate(date)}</div>
            </Link>
          );
        },
      },
      {
        accessorKey: "total_outstanding_amount",
        header: () => (
          <div className="text-right">Total Outstanding Amount</div>
        ),
        cell: ({ row }: { row: Row<ILoan> }) => {
          const value = row.getValue("total_outstanding_amount") as string;
          return (
            <Link href={`/dashboard/loans/${row.getValue("id")}`}>
              <div className="text-right font-medium">
                {formatCurrency(value)}
              </div>
            </Link>
          );
        },
      },
      {
        accessorKey: "remita_total_outstanding_balance",
        header: () => (
          <div className="text-right">Remita Total Outstanding Balance</div>
        ),
        cell: ({ row }: { row: Row<ILoan> }) => {
          const value = row.getValue(
            "remita_total_outstanding_balance"
          ) as string;
          return (
            <Link href={`/dashboard/loans/${row.getValue("id")}`}>
              <div className="text-right font-medium">
                {formatCurrency(value)}
              </div>
            </Link>
          );
        },
      },
      {
        accessorKey: "last_installment_date",
        header: () => <div>Last Installment Date</div>,
        cell: ({ row }: { row: Row<ILoan> }) => {
          const date = row.getValue("last_installment_date") as string;
          return (
            <Link href={`/dashboard/loans/${row.getValue("id")}`}>
              <div>{formatDate(date)}</div>
            </Link>
          );
        },
      },
      {
        accessorKey: "repayment_count",
        header: () => (
          <div className="text-right font-medium">Repayment Count</div>
        ),
      },
      {
        accessorKey: "remita_collection_id",
        header: () => <div>Remita Collection ID</div>,
      },
      {
        accessorKey: "manual_repayment_id",
        header: () => <div>Manual Repayment ID</div>,
      },
      {
        id: "stop_loan",
        header: () => <div>Action</div>,
        cell: ({ row }: { row: Row<ILoan> }) => {
          const status = row.getValue("status");

          const handleStopLoan = () => {
            setLoanToStop(row.getValue("id") as string);
            setModalVisible(true);
          };

          if (status !== "Active") {
            return null; // No button if not active
          }

          return (
            <Button
              variant="outline"
              size="sm"
              className="whitespace-nowrap text-white bg-green-500 hover:bg-green-600"
              onClick={handleStopLoan}
            >
              Stop Loan
            </Button>
          );
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
      pagination: { pageSize: defaultPageSize },
      sorting: [{ id: "created_at", desc: true }],
    },
  });

  const downloadCSV = useCallback(() => {
    try {
      // Early return with validation
      if (!columns?.length || !downloadData?.length) {
        console.error("Columns or downloadData is missing or empty");
        return;
      }

      // Helper function to safely extract header text
      const getHeaderText = (
        header:
          | React.ReactNode
          | string
          | ((props: { column: any }) => React.ReactNode)
      ): string => {
        if (typeof header === "string") return header;
        if (typeof header === "function") {
          const result = header({ column: {} });
          if (React.isValidElement(result)) {
            return result.props.children || "";
          }
          return String(result);
        }
        if (React.isValidElement(header)) {
          return header.props.children || "";
        }
        return "";
      };

      // Helper function to safely extract cell value
      const getCellValue = (
        row: ILoan,
        accessorKey: keyof ILoan | undefined
      ): string => {
        if (!accessorKey) return "";
        const value = row[accessorKey];
        if (value === null || value === undefined) return "";
        if (typeof value === "object") {
          return JSON.stringify(value, null, 2);
        }
        return String(value);
      };

      // Extract headers with proper type handling
      const headers = columns
        .map((column) => getHeaderText(column.header))
        .filter(Boolean)
        .join(",");

      // Extract rows with proper type handling
      const rows = downloadData
        .map((row) =>
          columns
            .map((column) => getCellValue(row, column.accessorKey))
            .join(",")
        )
        .join("\n");

      // Create CSV content with proper encoding
      const csvContent = `data:text/csv;charset=utf-8,${encodeURIComponent(headers)}\n${encodeURIComponent(rows)}`;

      // Create and trigger download
      const link = document.createElement("a");
      link.href = csvContent;
      link.download = "LOANS.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating CSV:", error);
      toast.error("Failed to generate CSV file");
    }
  }, [columns, downloadData]);

  const handleNextPage = useCallback(() => {
    setLoadingNext(true);
    setPageNo(pageNo + 1);
  }, [pageNo, setPageNo]);

  const handlePreviousPage = useCallback(() => {
    setLoadingPrevious(true);
    setPageNo(pageNo - 1);
  }, [pageNo, setPageNo]);

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTempSearchQuery(event.target.value);
    },
    []
  );

  const handleSearchClick = useCallback(() => {
    setSearchQuery(tempSearchQuery);
    setPageNo(1);
  }, [tempSearchQuery, setSearchQuery, setPageNo]);

  const handleModalConfirm = useCallback(async () => {
    if (!loanToStop) return;

    try {
      const requestBody = {
        initiator_name: "Uche Iwundu",
      };

      const token = getTokenFromCookies();

      if (!token) {
        throw new Error("Token not found. Please log in.");
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      await postApiRequest(
        `/api/stop-loan/${loanToStop}/`,
        requestBody,
        headers
      );

      toast.success(`Successfully stopped loan with ID: ${loanToStop}`);
      updateLoanStatus(loanToStop, "Closed");
      router.replace("/dashboard/stop-loan-request");
    } catch (error) {
      toast.error(`Failed to stop loan with ID: ${loanToStop}`);
      console.error(error);
    } finally {
      setModalVisible(false);
      setLoanToStop(null);
    }
  }, [loanToStop, updateLoanStatus, router]);

  const handleModalClose = useCallback(() => {
    setModalVisible(false);
    setLoanToStop(null);
  }, []);

  useEffect(() => {
    setLoadingNext(false);
    setLoadingPrevious(false);
  }, [pageNo]);

  return (
    <Card className="w-full border-0 shadow-none -mt-8">
      <ToastContainer />
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="font-bold text-lg">Loan</span>
          <div className="primary-cta flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={downloadCSV}>
              <Download className="h-4 w-4 mr-2" />
              Download CSV
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Search size={18} className="text-gray-500" />
          <Input
            placeholder="Search by Mandate..."
            onChange={handleSearchChange}
            className="w-full md:w-64"
            value={tempSearchQuery}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearchClick();
              }
            }}
          />
          <Button onClick={handleSearchClick} className="whitespace-nowrap">
            Search
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <input
              type="date"
              className="px-3 py-2 border rounded-md"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setPageNo(1);
              }}
            />
            <input
              type="date"
              className="px-3 py-2 border rounded-md"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setPageNo(1);
              }}
            />
          </div>
          {user?.designation === "ADMIN" && (
            <Button
              variant="outline"
              size="sm"
              className="whitespace-nowrap"
              onClick={downloadCSV}
            >
              <Download size={18} />
            </Button>
          )}
        </div>
      </CardContent>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-gray-50">
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
                  Empty Result.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm text-gray-600">
          Page{" "}
          <Button
            variant="link"
            className="p-0 h-auto"
            onClick={() => setPageNo(1)}
            disabled={pageNo === 1}
          >
            {pageNo}
          </Button>{" "}
          of{" "}
          <Button
            variant="link"
            className="p-0 h-auto"
            onClick={() => setPageNo(Math.ceil(totalCount / pageSize))}
            disabled={pageNo === Math.ceil(totalCount / pageSize)}
          >
            {Math.ceil(totalCount / pageSize)}
          </Button>{" "}
          ({totalCount} total)
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="whitespace-nowrap"
            onClick={handlePreviousPage}
            disabled={pageNo <= 1 || loadingPrevious}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="whitespace-nowrap"
            onClick={handleNextPage}
            disabled={pageNo * pageSize >= totalCount || loadingNext}
          >
            Next
          </Button>
        </div>
      </div>
      {modalVisible && (
        <Modal
          title="Confirmation"
          onClose={handleModalClose}
          onConfirm={handleModalConfirm}
        >
          Are you sure you want to stop this Loan?
        </Modal>
      )}
    </Card>
  );
}

export default LoansDataTable;
