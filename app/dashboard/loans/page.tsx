// /app/dashboard/loan/page.tsx
import { Suspense } from "react";
import LoansPage from "./LoanPage";

const Page = () => (
  <Suspense fallback={<div>Loading All Loans...</div>}>
    <LoansPage />
  </Suspense>
);

export default Page;
