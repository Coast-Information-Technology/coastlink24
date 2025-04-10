// components/dashboard/StatsCard.tsx
import { Card, CardContent } from "@/components/ui/card";

type StatsCardProps = {
  title: string;
  value: string | number;
};

export default function StatsCard({ title, value }: StatsCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-sm text-muted-foreground">{title}</h2>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </CardContent>
    </Card>
  );
}
