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
import { Spinner } from "@/components/ui/spinner";

const columns = [
  {
    accessorKey: "mandate_reference",
    header: "Mandate Reference",
  },
  {
    accessorKey: "payment_reference", 
    header: "Payment Reference",
  },
  {
    accessorKey: "transaction_code",
    header: "Transaction ID",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];

interface DisbursementResponseDataTablePageProps {
  data: any[];
  pageNo: number;
  pageSize: number;
  setPageNo: (page: number) => void;
}

export function DisbursementResponseDataTablePage({
  data,
  pageNo,
  pageSize,
  setPageNo,
}: DisbursementResponseDataTablePageProps) {
  const [currentData, setCurrentData] = useState<any[]>([]);
  const [loadingNext, setLoadingNext] = useState(false);
  const [loadingPrevious, setLoadingPrevious] = useState(false);
  const totalPages = Math.ceil(data.length / pageSize);

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
    const headers = columns.map((column) => column.header);
    const rows = data
      .map((row) =>
        columns.map((column) => row[column.accessorKey] || "").join(",")
      )
      .join("\n");
    const csvContent = `data:text/csv;charset=utf-8,${headers.join(
      ","
    )}\n${rows}`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "DISBURSED VERIFICATION REPORT.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleNextPage = () => {
    setLoadingNext(true);
    setPageNo(Math.min(pageNo + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setLoadingPrevious(true);
    setPageNo(Math.max(pageNo - 1, 1));
  };

  useEffect(() => {
    setLoadingNext(false);
    setLoadingPrevious(false);
  }, [pageNo]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <h2 className="text-lg font-semibold">Disbursement Results</h2>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto"
          onClick={downloadCSV}
        >
          <Download className="mr-2 h-4 w-4" />
          Download CSV
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="font-semibold">
                    {flexRender(
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
                  className="hover:bg-muted/50"
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

      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          Page {pageNo} of {totalPages}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousPage}
            disabled={pageNo <= 1 || loadingPrevious}
          >
            {loadingPrevious ? (
              <Spinner className="mr-2 h-4 w-4" />
            ) : null}
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={pageNo >= totalPages || loadingNext}
          >
            {loadingNext ? <Spinner className="mr-2 h-4 w-4" /> : null}
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}