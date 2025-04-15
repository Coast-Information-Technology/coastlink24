// /app/dashboard/borrowers_choice/page.tsx
import { Suspense } from "react";
import BorrowerChoicePage from "./BorrowersChoicePage";

const Page = () => (
  <Suspense fallback={<div>Loading borrowers choice...</div>}>
    <BorrowerChoicePage />
  </Suspense>
);

export default Page;
