// /app/dashboard/borrowers/page.tsx
import { Suspense } from "react";
import BorrowerChoicePage from "./BorrowersChoicePage";

const Page = () => (
  <Suspense fallback={<div>Loading borrowers...</div>}>
    <BorrowerChoicePage />
  </Suspense>
);

export default Page;
