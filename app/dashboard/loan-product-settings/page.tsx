"use client";

import React, { useEffect, useState } from "react";
import { getAllApiRequest } from "@/lib/apiRequest";
import { useRouter } from "next/navigation";
import { getTokenFromCookies } from "@/lib/cookies";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SpiralLoader } from "@/components/LoaderSpiral";

interface LoanSetting {
  id: string;
  product_1_interest: number;
  product_1_tenure: number;
  product_1_minimum_loan: number;
  product_1_maximum_loan: number;
  product_1_dti: number;
  product_1_management_fee: number;
  product_2_interest: number;
  product_2_tenure: number;
  product_2_minimum_loan: number;
  product_2_maximum_loan: number;
  product_2_dti: number;
  product_2_management_fee: number;
  product_3_interest: number;
  product_3_tenure: number;
  product_3_minimum_loan: number;
  product_3_maximum_loan: number;
  product_3_dti: number;
  product_3_management_fee: number;
  remita_fee: number;
  loan_request_cache_duration: number;
}

const LoanProductSettingsTable = () => {
  const [loanSettings, setLoanSettings] = useState<LoanSetting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const token = getTokenFromCookies();

  useEffect(() => {
    if (!token) {
      return;
    }

    const fetchLoanSettings = async () => {
      setIsLoading(true);
      try {
        const data = await getAllApiRequest(
          "/api/loan_product_settings/",
          token
        );
        setLoanSettings(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLoanSettings();
  }, [token]);

  const handleActionClick = (id: string) => {
    router.push(`/dashboard/loan-product-settings/edit/?id=${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <SpiralLoader size={80} speed={1.5} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead>Product 1 Interest (%)</TableHead>
              <TableHead>Product 1 Tenure</TableHead>
              <TableHead>Product 1 Min Loan</TableHead>
              <TableHead>Product 1 Max Loan</TableHead>
              <TableHead>Product 1 DTI</TableHead>
              <TableHead>Product 1 Mgmt Fee</TableHead>
              <TableHead>Product 2 Interest (%)</TableHead>
              <TableHead>Product 2 Tenure</TableHead>
              <TableHead>Product 2 Min Loan</TableHead>
              <TableHead>Product 2 Max Loan</TableHead>
              <TableHead>Product 2 DTI</TableHead>
              <TableHead>Product 2 Mgmt Fee</TableHead>
              <TableHead>Product 3 Interest (%)</TableHead>
              <TableHead>Product 3 Tenure</TableHead>
              <TableHead>Product 3 Min Loan</TableHead>
              <TableHead>Product 3 Max Loan</TableHead>
              <TableHead>Product 3 DTI</TableHead>
              <TableHead>Product 3 Mgmt Fee</TableHead>
              <TableHead>Remita Fee</TableHead>
              <TableHead>Cache Duration</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loanSettings.map((setting) => (
              <TableRow key={setting.id}>
                <TableCell className="font-medium">{setting.id}</TableCell>
                <TableCell>{setting.product_1_interest}</TableCell>
                <TableCell>{setting.product_1_tenure}</TableCell>
                <TableCell>{setting.product_1_minimum_loan}</TableCell>
                <TableCell>{setting.product_1_maximum_loan}</TableCell>
                <TableCell>{setting.product_1_dti}</TableCell>
                <TableCell>{setting.product_1_management_fee}</TableCell>
                <TableCell>{setting.product_2_interest}</TableCell>
                <TableCell>{setting.product_2_tenure}</TableCell>
                <TableCell>{setting.product_2_minimum_loan}</TableCell>
                <TableCell>{setting.product_2_maximum_loan}</TableCell>
                <TableCell>{setting.product_2_dti}</TableCell>
                <TableCell>{setting.product_2_management_fee}</TableCell>
                <TableCell>{setting.product_3_interest}</TableCell>
                <TableCell>{setting.product_3_tenure}</TableCell>
                <TableCell>{setting.product_3_minimum_loan}</TableCell>
                <TableCell>{setting.product_3_maximum_loan}</TableCell>
                <TableCell>{setting.product_3_dti}</TableCell>
                <TableCell>{setting.product_3_management_fee}</TableCell>
                <TableCell>{setting.remita_fee}</TableCell>
                <TableCell>{setting.loan_request_cache_duration}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-primary text-white"
                    onClick={() => handleActionClick(setting.id)}
                  >
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LoanProductSettingsTable;