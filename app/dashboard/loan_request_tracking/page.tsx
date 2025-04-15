// /app/dashboard/loan_request_tracking/page.tsx
import { Suspense } from "react";
import LoanReqTrackingPage from "./LoanRequestTrackingPage";

const Page = () => (
  <Suspense fallback={<div>Loading borrowers choice...</div>}>
    <LoanReqTrackingPage />
  </Suspense>
);

export default Page;
