// app/dashboard/loan-product-settings/edit/page.tsx (or any other parent file)

import { Suspense } from "react";
import UpdateLoanProductSetting from "./LoanProductPage";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-4">Loading settings...</div>}>
      <UpdateLoanProductSetting />
    </Suspense>
  );
}
