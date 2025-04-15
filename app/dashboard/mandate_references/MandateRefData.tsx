"use client";

import React, { useContext, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  Row,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { UserContext } from "@/components/Context/userContext";
import { IMandateRefDataTableProps } from "@/lib/types";

const columns = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }: { row: Row<any> }) => (
      <div className="font-medium">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }: { row: Row<any> }) => {
      const date = row.getValue("created_at") as string;
      const formattedDate = date ? date.replace("T", " ").slice(0, 19) : "";
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "updated_at",
    header: "Updated At",
    cell: ({ row }: { row: Row<any> }) => {
      const date = row.getValue("updated_at") as string;
      const formattedDate = date ? date.replace("T", " ").slice(0, 19) : "";
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "request_id",
    header: "Request ID",
  },
  {
    accessorKey: "authorisation_code",
    header: "Authorisation Code",
  },
  {
    accessorKey: "phone_number",
    header: "Phone Number",
  },
  {
    accessorKey: "mandate_reference",
    header: "Mandate Reference",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: { row: Row<any> }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge variant={status === "success" ? "default" : "destructive"} className="text-[10px] py-0">
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "request_time",
    header: "Request Time",
    cell: ({ row }: { row: Row<any> }) => {
      const date = row.getValue("request_time") as string;
      const formattedDate = date ? date.replace("T", " ").slice(0, 19) : "";
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "response_time",
    header: "Response Time",
    cell: ({ row }: { row: Row<any> }) => {
      const date = row.getValue("response_time") as string;
      const formattedDate = date ? date.replace("T", " ").slice(0, 19) : "";
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "request_data",
    header: "Request Data",
    cell: ({ row }: { row: Row<any> }) => {
      const requestData = row.getValue("request_data");
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              View Data
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80">
            <DropdownMenuLabel>Request Data</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <pre className="p-2 text-sm overflow-auto max-h-60">
              {JSON.stringify(requestData, null, 2)}
            </pre>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "response_data",
    header: "Response Data",
    cell: ({ row }: { row: Row<any> }) => {
      const responseData = row.getValue("response_data");
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              View Data
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80">
            <DropdownMenuLabel>Response Data</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <pre className="p-2 text-sm overflow-auto max-h-60">
              {JSON.stringify(responseData, null, 2)}
            </pre>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function MandateRefDataTable({
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
}: IMandateRefDataTableProps) {
  const { user } = useContext(UserContext);
  const [sorting, setSorting] = useState([{ id: "created_at", desc: true }]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [loadingNext, setLoadingNext] = useState(false);
  const [loadingPrevious, setLoadingPrevious] = useState(false);
  const [tempSearchQuery, setTempSearchQuery] = useState(searchQuery);

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
  });

  const downloadCSV = () => {
    if (!columns || !downloadData || columns.length === 0 || downloadData.length === 0) {
      console.error("Columns or downloadData is missing or empty.");
      return;
    }

    const headers = columns
      .map((column) => column.header)
      .filter((header) => header !== null);

    const rows = downloadData
      .map((row: any, index: number) =>
        columns
          .map((column) => {
            let value = row[column.accessorKey];

            if (column.accessorKey === "id") {
              value = value || `${index + 1}`;
            }

            if (
              column.accessorKey === "response_data" ||
              column.accessorKey === "request_data"
            ) {
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
    link.setAttribute("download", "MANDATE REFERENCE.csv");
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4" />
          <Input
            placeholder="Search by Mandate..."
            value={tempSearchQuery}
            onChange={handleSearchChange}
            className="h-8 w-[150px] lg:w-[250px]"
          />
          <Button onClick={handleSearchClick} size="sm">
            Search
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Input
            type="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              setPageNo(1);
            }}
            className="h-8"
          />
          <Input
            type="date"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
              setPageNo(1);
            }}
            className="h-8"
          />
          {["ADMIN"].includes(user?.designation ?? "") && (
            <div className="primary-cta flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={downloadCSV}>
              <Download className="h-4 w-4 mr-2" />
              Download CSV
            </Button>
          </div>
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
                      <Link
                        href={`/dashboard/mandate_references/${row.getValue(
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Page{" "}
          <Button
            variant="link"
            onClick={() => setPageNo(1)}
            disabled={pageNo === 1}
            className="h-8 px-2"
          >
            {pageNo}
          </Button>{" "}
          of{" "}
          <Button
            variant="link"
            onClick={() => setPageNo(Math.ceil(totalCount / pageSize))}
            disabled={pageNo === Math.ceil(totalCount / pageSize)}
            className="h-8 px-2"
          >
            {Math.ceil(totalCount / pageSize)}
          </Button>{" "}
          ({totalCount} total)
        </div>
        <div className="flex items-center space-x-2">
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
  );
}

export default MandateRefDataTable;