"use client";

import React, { useEffect, useState, useMemo } from "react";
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

interface DisbursementData {
  id: string;
  mandate_reference: string;
  transaction_id: string;
  is_success: string;
  message: string;
}

interface DisbursementResponseDataTablePageProps {
  data: DisbursementData[];
  pageNo: number;
  pageSize: number;
  setPageNo: (page: number) => void;
}

export function DisbursementVerificationDataTablePage({
  data,
  pageNo,
  pageSize,
  setPageNo,
}: DisbursementResponseDataTablePageProps) {
  const [currentData, setCurrentData] = useState<DisbursementData[]>([]);
  //   const [loadingNext, setLoadingNext] = useState(false);
  //   const [loadingPrevious, setLoadingPrevious] = useState(false);

  const totalPages = Math.ceil(data.length / pageSize);

  // Memoize the columns to avoid unnecessary recalculation on every render
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: () => <div className="text-left">ID</div>,
        cell: ({ row }: { row: any }) => (
          <div className="lowercase">
            {row.getValue("id") || `${row.index + 1}`}
          </div>
        ),
      },
      {
        accessorKey: "mandate_reference",
        header: () => <div>Mandate Reference</div>,
      },
      {
        accessorKey: "transaction_id",
        header: () => <div>Transaction ID</div>,
      },
      { accessorKey: "is_success", header: () => <div>Status</div> },
      { accessorKey: "message", header: () => <div>Message</div> },
    ],
    []
  );

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

  // Handle downloading CSV
  const downloadCSV = () => {
    const headers = columns
      .map((column) =>
        typeof column.header === "function" ? column.header() : column.header
      )
      .map((header) => header.props?.children ?? header);

    const rows = data
      .map((row: DisbursementData) =>
        columns
          .map(
            (column) => row[column.accessorKey as keyof DisbursementData] || ""
          )
          .join(",")
      )
      .join("\n");

    const csvContent = `data:text/csv;charset=utf-8,${headers.join(",")}\n${rows}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "DISBURSED_VERIFICATION_REPORT.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle pagination logic
  //   const handleNextPage = () => {
  //     setLoadingNext(true);
  //     setPageNo(Math.min(pageNo + 1, totalPages));
  //   };

  //   const handlePreviousPage = () => {
  //     setLoadingPrevious(true);
  //     setPageNo(Math.max(pageNo - 1, 1));
  //   };

  //   useEffect(() => {
  //     setLoadingNext(false);
  //     setLoadingPrevious(false);
  //   }, [pageNo]);

  return (
    <section className="p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Disbursement Verification</h2>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center space-x-2 px-4 py-2 border rounded-lg"
          onClick={downloadCSV}
        >
          <Download size={18} />
          <span>Download CSV</span>
        </Button>
      </div>

      <div className="overflow-x-auto">
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
    </section>
  );
}
