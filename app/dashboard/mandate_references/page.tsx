// /app/dashboard/mandate_reference/page.tsx
import { Suspense } from "react";
import MandateRefPage from "./MandateRefPage";

const Page = () => (
  <Suspense fallback={<div>Loading borrowers choice...</div>}>
    <MandateRefPage />
  </Suspense>
);

export default Page;
