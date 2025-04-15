// /app/dashboard/disbursement/page.tsx
import { Suspense } from "react";
import DisbursementPage from "./DisbursmentPage";

const Page = () => (
  <Suspense fallback={<div>Loading disbursement...</div>}>
    <DisbursementPage />
  </Suspense>
);

export default Page;
