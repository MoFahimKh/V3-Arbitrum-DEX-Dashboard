import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface TradingPanelProps {
  tokenId: string;
}

export const TradingPanel = ({ tokenId }: TradingPanelProps) => {
  const { isConnected } = useAccount();

  const handleApprove = async () => {
    console.log("Approve USDC for trading");
  };

  const handleBuy = async () => {
    console.log("Buy token with USDC");
  };

  if (!isConnected) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Trading</h3>
        <p className="text-muted-foreground">Connect your wallet to trade</p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Trading</h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span>USDC Balance:</span>
          <span className="font-medium">0.000000 USDC</span>
        </div>

        <div className="flex gap-4">
          <Button onClick={handleApprove} variant="outline">
            Approve USDC
          </Button>
          <Button onClick={handleBuy}>Buy with 0.001 USDC</Button>
        </div>
      </div>
    </Card>
  );
};
