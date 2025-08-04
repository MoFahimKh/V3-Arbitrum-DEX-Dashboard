import { TokenPriceChart } from "./TokenPriceChart";
import { TokenPoolsTable } from "./TokenPoolsTable";
import { WalletInteractions } from "./WalletInteractions";

export function TokenDetail({ tokenId }: { tokenId: string }) {
  return (
    <div className="space-y-6 text-[#e5e7eb]">
      <TokenPriceChart tokenId={tokenId} />
      <div className="flex">
        <WalletInteractions tokenOutAddress={tokenId} />
        <TokenPoolsTable tokenId={tokenId} />
      </div>
    </div>
  );
}
