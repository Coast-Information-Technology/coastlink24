// components/dashboard/CardRenderer.tsx
import WalletCard from "./WalletCard";
import ChartCard from "./ChartCard";
import StatsCard from "./StatsCard";
import TableCard from "./TableCard";
import PieChartCard from "./PieChartCard";
import { useEffect, useState } from "react";
import { getTokenFromCookies } from "@/lib/cookies";
import { getAllApiRequest } from "@/lib/apiRequest";

type CardType = "Wallet" | "Chart" | "Stats" | "Table" | "Pie";

type CardRendererProps = {
  type: CardType;
  data?: any;
};

export default function CardRenderer({ type, data }: CardRendererProps) {
  const [wemaBalance, setWemaBalance] = useState(0);
  const token = getTokenFromCookies();

  useEffect(() => {
    if (!token) return;

    const fetchBalance = async () => {
      try {
        const balanceData = await getAllApiRequest("/api/get-balance/", token);
        setWemaBalance(balanceData?.balance || 0);
      } catch (error) {
        console.error("Failed to fetch WEMA balance:", error);
      }
    };

    fetchBalance();
  }, [token]);

  switch (type) {
    case "Wallet":
      return <WalletCard balance={wemaBalance} />;
    case "Chart":
      return <ChartCard hasData={!!data} />;
    case "Stats":
      return (
        <StatsCard title={data?.title || "Stat"} value={data?.value || 0} />
      );
    case "Table":
      return <TableCard rows={data?.rows || []} />;
    case "Pie":
      return <PieChartCard hasData={!!data} />;
    default:
      return null;
  }
}
