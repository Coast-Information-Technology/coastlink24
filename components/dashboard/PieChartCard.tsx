// components/dashboard/PieChartCard.tsx
import { Card, CardContent } from "@/components/ui/card";

type PieChartCardProps = {
  hasData: boolean;
};

export default function PieChartCard({ hasData }: PieChartCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold mb-2">Users by Region</h2>
        {hasData ? (
          <div className="h-32 bg-gray-100 rounded-lg">[Pie Chart goes here]</div>
        ) : (
          <div className="text-sm text-muted-foreground italic">No pie chart data available</div>
        )}
      </CardContent>
    </Card>
  );
}
