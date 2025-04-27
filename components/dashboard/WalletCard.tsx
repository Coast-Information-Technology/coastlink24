// components/dashboard/WalletCard.tsx
import { Card, CardContent } from "@/components/ui/card";

interface WalletCardProps {
  balance: number;
}

export default function WalletCard({ balance }: WalletCardProps) {
  return (
    <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
      <CardContent className="py-6 px-4">
        <h2 className="text-lg font-semibold">Wallet Balance</h2>
        <p className="text-2xl mt-2">
          {balance.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
      </CardContent>
    </Card>
  );
}
