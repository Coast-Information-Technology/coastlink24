"use client";

import React, { useState, useEffect, useContext, useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
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
import Link from "next/link";
import { MdOutlineMoney } from "react-icons/md";
import { UserContext } from "@/components/Context/userContext";
import { Command, CommandInput } from "@/components/ui/command";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DateRangePicker from "@/components/DatePicker";
import { IBorrower, IBorrowerDataTableProps } from "@/lib/types";
import { ColumnDef, ColumnFiltersState, Row, HeaderContext } from "@tanstack/react-table";

export function BorrowerDataTable({
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
}: IBorrowerDataTableProps) {
  const { user } = useContext(UserContext);
  const [sorting, setSorting] = useState([{ id: "created_at", desc: true }]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [loadingNext, setLoadingNext] = useState(false);
  const [loadingPrevious, setLoadingPrevious] = useState(false);
  const [tempSearchQuery, setTempSearchQuery] = useState(searchQuery);
  const defaultPageSize = 100;

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "";
    return dateString.replace("T", " ").slice(0, 19);
  };

  const formatCurrency = (value: string | number | null) => {
    const amount = value ? parseFloat(value.toString()) : 0;
    return !isNaN(amount)
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "NGN",
        }).format(amount)
      : "N/A";
  };

  const columns = useMemo<ColumnDef<IBorrower>[]>(() => {
    const baseColumns: ColumnDef<IBorrower>[] = [
      {
        id: "id",
        accessorKey: "id",
        header: () => <div className="font-medium text-gray-900">ID</div>,
        cell: ({ row }) => (
          <div className="lowercase">{row.getValue("id")}</div>
        ),
      },
      {
        id: "created_at",
        accessorKey: "created_at",
        header: () => <div className="font-medium text-gray-900">Created At</div>,
        cell: ({ row }) => {
          const date = row.getValue("created_at") as string;
          return <div>{formatDate(date)}</div>;
        },
      },
      {
        id: "first_name",
        accessorKey: "first_name",
        header: () => <div className="font-medium text-gray-900">First Name</div>,
      },
      {
        id: "last_name",
        accessorKey: "last_name",
        header: () => <div className="font-medium text-gray-900">Last Name</div>,
      },
      {
        id: "email",
        accessorKey: "email",
        header: () => <div className="font-medium text-gray-900">Email</div>,
      },
      {
        id: "phone_number",
        accessorKey: "phone_number",
        header: () => <div className="font-medium text-gray-900">Phone Number</div>,
      },
      {
        id: "bank_name",
        accessorKey: "bank_name",
        header: () => <div className="font-medium text-gray-900">Bank Name</div>,
      },
      {
        id: "account_number",
        accessorKey: "account_number",
        header: () => <div className="font-medium text-gray-900">Account Number</div>,
      },
      {
        id: "company_name",
        accessorKey: "company_name",
        header: () => <div className="font-medium text-gray-900">Company Name</div>,
      },
      {
        id: "category",
        accessorKey: "category",
        header: () => <div className="font-medium text-gray-900">Category</div>,
      },
      {
        id: "is_email_verified",
        accessorKey: "is_email_verified",
        header: () => <div className="font-medium text-gray-900">Email Verified</div>,
        cell: ({ row }) => {
          const isEmailVerified = row.getValue("is_email_verified");
          return (
            <Badge variant={isEmailVerified ? "default" : "destructive"}>
              {isEmailVerified ? "Yes" : "No"}
            </Badge>
          );
        },
      },
      {
        id: "deactivate_login",
        accessorKey: "deactivate_login",
        header: () => <div className="font-medium text-gray-900">Login Status</div>,
        cell: ({ row }) => {
          const deactivateLogin = row.getValue("deactivate_login");
          return (
            <Badge variant={deactivateLogin ? "destructive" : "default"}>
              {deactivateLogin ? "Deactivated" : "Active"}
            </Badge>
          );
        },
      },
    ];

    if (user?.designation === "ADMIN") {
      baseColumns.push({
        id: "bvn",
        accessorKey: "bvn",
        header: () => <div className="font-medium text-gray-900">BVN</div>,
      });
    }

    return baseColumns;
  }, [user]);

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
    const headers = columns
      .map((column) => {
        const header = column.header;
        if (typeof header === 'function') {
          const headerContext: HeaderContext<IBorrower, unknown> = {
            column: column as any,
            header: column as any,
            table: table as any,
          };
          const headerElement = header(headerContext);
          return headerElement?.props?.children;
        }
        return header;
      })
      .filter(Boolean);

    const rows = data.map((row: IBorrower) => {
      return columns
        .map((column) => {
          const key = column.id as keyof IBorrower;
          return row[key] || '';
        })
        .join(',');
    }).join('\n');

    const csvContent = `data:text/csv;charset=utf-8,${headers.join(',')}\n${rows}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'borrowers_data.csv');
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
        <CardTitle>Borrowers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <Command className="w-[300px]">
              <CommandInput
                placeholder="Search borrowers..."
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
              <div className="primary-cta flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={downloadCSV}>
              <Download className="h-4 w-4 mr-2" />
              Download CSV
            </Button>
          </div>
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
                          <Link href={`/dashboard/borrowers/${row.getValue("id")}`}>
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
                      <div className="flex flex-col items-center gap-2">
                        <MdOutlineMoney size={24} />
                        <p>No results found</p>
                      </div>
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
