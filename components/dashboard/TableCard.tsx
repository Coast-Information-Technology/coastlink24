// components/dashboard/TableCard.tsx
import { Card, CardContent } from "@/components/ui/card";

type TableCardProps = {
  rows?: any[];
};

export default function TableCard({ rows = [] }: TableCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold mb-2">Recent Transactions</h2>
        {rows.length > 0 ? (
          <div className="text-sm">[Table here]</div>
        ) : (
          <div className="text-sm text-muted-foreground italic">No transaction data available</div>
        )}
      </CardContent>
    </Card>
  );
}
