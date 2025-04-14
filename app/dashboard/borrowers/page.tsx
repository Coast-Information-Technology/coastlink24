// /app/dashboard/borrowers/page.tsx
import { Suspense } from "react";
import BorrowersPage from "./BorrowersPage"; // Move the existing component to this file

const Page = () => (
  <Suspense fallback={<div>Loading borrowers...</div>}>
    <BorrowersPage />
  </Suspense>
);

export default Page;
