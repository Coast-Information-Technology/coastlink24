// components/dashboard/CardRenderer.tsx
import WalletCard from "./WalletCard";
import ChartCard from "./ChartCard";
import StatsCard from "./StatsCard";
import TableCard from "./TableCard";
import PieChartCard from "./PieChartCard";

type CardType = "Wallet" | "Chart" | "Stats" | "Table" | "Pie";

type CardRendererProps = {
  type: CardType;
  data?: any;
};

export default function CardRenderer({ type, data }: CardRendererProps) {
  switch (type) {
    case "Wallet":
      return <WalletCard />;
    case "Chart":
      return <ChartCard hasData={!!data} />;
    case "Stats":
      return <StatsCard title={data?.title || "Stat"} value={data?.value || 0} />;
    case "Table":
      return <TableCard rows={data?.rows || []} />;
    case "Pie":
      return <PieChartCard hasData={!!data} />;
    default:
      return null;
  }
}
