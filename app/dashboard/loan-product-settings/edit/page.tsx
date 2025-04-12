"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getTokenFromCookies } from "@/lib/cookies";
import { getAllApiRequest, updateApiRequest } from "@/lib/apiRequest";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { SpiralLoader } from "@/components/LoaderSpiral";

interface Product {
  product_1_interest: string;
  product_1_tenure: string;
  product_1_minimum_loan: string;
  product_1_maximum_loan: string;
  product_1_dti: string;
  product_1_management_fee: string;
  product_2_interest: string;
  product_2_tenure: string;
  product_2_minimum_loan: string;
  product_2_maximum_loan: string;
  product_2_dti: string;
  product_2_management_fee: string;
  product_3_interest: string;
  product_3_tenure: string;
  product_3_minimum_loan: string;
  product_3_maximum_loan: string;
  product_3_dti: string;
  product_3_management_fee: string;
  remita_fee: string;
  loan_request_cache_duration: string;
}

const UpdateLoanProductSetting = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = getTokenFromCookies();

  useEffect(() => {
    if (!token) {
      return;
    }

    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const data = await getAllApiRequest(
          `/api/loan_product_settings/`,
          token
        );
        if (data && data.length > 0) {
          setProduct(data[0]);
        } else {
          setError("No product data found");
        }
      } catch (err) {
        const error = err as Error;
        setError("Failed to fetch products: " + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    } else {
      setError("Invalid ID");
      setIsLoading(false);
    }
  }, [id, token]);

  const handleUpdate = async () => {
    if (!token) {
      return;
    }
    
    if (!product) {
      setError("No product data to update");
      return;
    }
    setIsLoading(true);
    try {
      await updateApiRequest(
        `/api/loan_product_settings/${id}/`,
        token,
        product
      );
      router.push("/dashboard/loan-product-settings");
    } catch (err) {
      const error = err as Error;
      setError("Failed to update products: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (value: string, name: string) => {
    setProduct((prevProduct) => prevProduct ? ({ ...prevProduct, [name]: value }) : null);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <SpiralLoader size={80} speed={1.5}/>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <Alert variant="destructive">{error}</Alert>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-4">
        <Alert>No setting data found</Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-4xl mx-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Update Loan Product Setting</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Product 1 Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Product 1</h3>
              
              <div className="space-y-2">
                <label htmlFor="product_1_interest">Interest Rate (%)</label>
                <Input
                  id="product_1_interest"
                  type="number"
                  name="product_1_interest"
                  value={product.product_1_interest || ""}
                  onChange={(e) => handleChange(e.target.value, "product_1_interest")}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="product_1_tenure">Tenure</label>
                <Select
                  name="product_1_tenure"
                  value={product.product_1_tenure || ""}
                  onValueChange={(value) => handleChange(value, "product_1_tenure")}
                >
                  <option value="">Select Tenure</option>
                  <option value="1">1 Month</option>
                  <option value="2">2 Months</option>
                  <option value="3">3 Months</option>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="product_1_minimum_loan">Minimum Loan</label>
                <Input
                  id="product_1_minimum_loan"
                  type="number"
                  name="product_1_minimum_loan"
                  value={product.product_1_minimum_loan || ""}
                  onChange={(e) => handleChange(e.target.value, "product_1_minimum_loan")}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="product_1_maximum_loan">Maximum Loan</label>
                <Input
                  id="product_1_maximum_loan"
                  type="number"
                  name="product_1_maximum_loan"
                  value={product.product_1_maximum_loan || ""}
                  onChange={(e) => handleChange(e.target.value, "product_1_maximum_loan")}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="product_1_dti">DTI</label>
                <Input
                  id="product_1_dti"
                  type="number"
                  name="product_1_dti"
                  value={product.product_1_dti || ""}
                  onChange={(e) => handleChange(e.target.value, "product_1_dti")}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="product_1_management_fee">Management Fee</label>
                <Input
                  id="product_1_management_fee"
                  type="number"
                  name="product_1_management_fee"
                  value={product.product_1_management_fee || ""}
                  onChange={(e) => handleChange(e.target.value, "product_1_management_fee")}
                />
              </div>
            </div>

            {/* Product 2 Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Product 2</h3>
              
              <div className="space-y-2">
                <label htmlFor="product_2_interest">Interest Rate (%)</label>
                <Input
                  id="product_2_interest"
                  type="number"
                  name="product_2_interest"
                  value={product.product_2_interest || ""}
                  onChange={(e) => handleChange(e.target.value, "product_2_interest")}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="product_2_tenure">Tenure</label>
                <Select
                  name="product_2_tenure"
                  value={product.product_2_tenure || ""}
                  onValueChange={(value) => handleChange(value, "product_2_tenure")}
                >
                  <option value="">Select Tenure</option>
                  <option value="1">1 Month</option>
                  <option value="2">2 Months</option>
                  <option value="3">3 Months</option>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="product_2_minimum_loan">Minimum Loan</label>
                <Input
                  id="product_2_minimum_loan"
                  type="number"
                  name="product_2_minimum_loan"
                  value={product.product_2_minimum_loan || ""}
                  onChange={(e) => handleChange(e.target.value, "product_2_minimum_loan")}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="product_2_maximum_loan">Maximum Loan</label>
                <Input
                  id="product_2_maximum_loan"
                  type="number"
                  name="product_2_maximum_loan"
                  value={product.product_2_maximum_loan || ""}
                  onChange={(e) => handleChange(e.target.value, "product_2_maximum_loan")}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="product_2_dti">DTI</label>
                <Input
                  id="product_2_dti"
                  type="number"
                  name="product_2_dti"
                  value={product.product_2_dti || ""}
                  onChange={(e) => handleChange(e.target.value, "product_2_dti")}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="product_2_management_fee">Management Fee</label>
                <Input
                  id="product_2_management_fee"
                  type="number"
                  name="product_2_management_fee"
                  value={product.product_2_management_fee || ""}
                  onChange={(e) => handleChange(e.target.value, "product_2_management_fee")}
                />
              </div>
            </div>

            {/* Product 3 Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Product 3</h3>
              
              <div className="space-y-2">
                <label htmlFor="product_3_interest">Interest Rate (%)</label>
                <Input
                  id="product_3_interest"
                  type="number"
                  name="product_3_interest"
                  value={product.product_3_interest || ""}
                  onChange={(e) => handleChange(e.target.value, "product_3_interest")}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="product_3_tenure">Tenure</label>
                <Select
                  name="product_3_tenure"
                  value={product.product_3_tenure || ""}
                  onValueChange={(value) => handleChange(value, "product_3_tenure")}
                >
                  <option value="">Select Tenure</option>
                  <option value="1">1 Month</option>
                  <option value="2">2 Months</option>
                  <option value="3">3 Months</option>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="product_3_minimum_loan">Minimum Loan</label>
                <Input
                  id="product_3_minimum_loan"
                  type="number"
                  name="product_3_minimum_loan"
                  value={product.product_3_minimum_loan || ""}
                  onChange={(e) => handleChange(e.target.value, "product_3_minimum_loan")}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="product_3_maximum_loan">Maximum Loan</label>
                <Input
                  id="product_3_maximum_loan"
                  type="number"
                  name="product_3_maximum_loan"
                  value={product.product_3_maximum_loan || ""}
                  onChange={(e) => handleChange(e.target.value, "product_3_maximum_loan")}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="product_3_dti">DTI</label>
                <Input
                  id="product_3_dti"
                  type="number"
                  name="product_3_dti"
                  value={product.product_3_dti || ""}
                  onChange={(e) => handleChange(e.target.value, "product_3_dti")}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="product_3_management_fee">Management Fee</label>
                <Input
                  id="product_3_management_fee"
                  type="number"
                  name="product_3_management_fee"
                  value={product.product_3_management_fee || ""}
                  onChange={(e) => handleChange(e.target.value, "product_3_management_fee")}
                />
              </div>
            </div>
          </div>

          {/* Additional Settings */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="remita_fee">Remita Fee</label>
              <Input
                id="remita_fee"
                type="number"
                name="remita_fee"
                value={product.remita_fee || ""}
                onChange={(e) => handleChange(e.target.value, "remita_fee")}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="loan_request_cache_duration">Cache Duration</label>
              <Input
                id="loan_request_cache_duration"
                type="number"
                name="loan_request_cache_duration"
                value={product.loan_request_cache_duration || ""}
                onChange={(e) => handleChange(e.target.value, "loan_request_cache_duration")}
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Button
              onClick={handleUpdate}
              disabled={isLoading}
              className="w-full md:w-auto bg-primary text-white"
            >
              {isLoading ? "Updating..." : "Update Settings"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UpdateLoanProductSetting;