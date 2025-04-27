// /app/dashboard/collections/page.tsx
import { Suspense } from "react";
import CollectionsPage from "./CollectionPage";

const Page = () => (
  <Suspense fallback={<div>Loading All Loans...</div>}>
    <CollectionsPage />
  </Suspense>
);

export default Page;
