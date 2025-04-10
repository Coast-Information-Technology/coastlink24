// components/dashboard/ChartCard.tsx
import { Card, CardContent } from "@/components/ui/card";

type ChartCardProps = {
  hasData: boolean;
};

export default function ChartCard({ hasData }: ChartCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold mb-2">Sales Chart</h2>
        {hasData ? (
          <div className="h-32 bg-gray-100 rounded-lg">[Chart here]</div>
        ) : (
          <div className="text-sm text-muted-foreground italic">No chart data available</div>
        )}
      </CardContent>
    </Card>
  );
}
