// components/dashboard/WalletCard.tsx
import { Card, CardContent } from "@/components/ui/card";

export default function WalletCard() {
  return (
    <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold">Wallet Balance</h2>
        <p className="text-3xl mt-2">$4,530.00</p>
      </CardContent>
    </Card>
  );
}
