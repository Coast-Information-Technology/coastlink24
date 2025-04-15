// /app/dashboard/loan/page.tsx
import { Suspense } from "react";
import LoansPage from "./LoanPage";

const Page = () => (
  <Suspense fallback={<div>Loading borrowers choice...</div>}>
    <LoansPage />
  </Suspense>
);

export default Page;
