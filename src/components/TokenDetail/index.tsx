import { useQuery } from "@apollo/client";
import { GET_TOKEN_DETAIL } from "@/queries/tokens";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { USDC_ADDRESS } from "@/config/constants";
import { fetchEthPrice } from "@/utils/fetchEthPrice";
import { getTokenBalance } from "@/utils/getTokenBalance";
import { TokenPriceChart } from "./TokenPriceChart";
import { TokenPoolsTable } from "./TokenPoolsTable";

export function TokenDetail({ tokenId }: { tokenId: string }) {
  const { address, isConnected } = useAccount();
  const [usdcBalance, setUsdcBalance] = useState<string>("");
  const [ethPrice, setEthPrice] = useState<number>(0);

  const { data: tokenData, loading: loadingToken } = useQuery(
    GET_TOKEN_DETAIL,
    {
      variables: { id: tokenId },
    }
  );

  useEffect(() => {
    async function fetchBalanceEffect() {
      const ETHBal = await fetchEthPrice();
      setEthPrice(ETHBal);
      if (isConnected && address) {
        try {
          const balance = await getTokenBalance(address, USDC_ADDRESS);
          setUsdcBalance(
            balance ? (BigInt(balance.value) / BigInt(1e6)).toString() : "0"
          );
        } catch (err) {
          setUsdcBalance("0");
        }
      }
    }
    fetchBalanceEffect();
  }, [isConnected, address]);

  if (loadingToken) return <div>Loading...</div>;
  if (!tokenData?.token) return <div>Token not found</div>;

  const token = tokenData.token;
  const priceUSD = token.derivedETH
    ? (parseFloat(token.derivedETH) * ethPrice).toFixed(4)
    : "N/A";

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{token.symbol}</h1>
          <div className="text-muted-foreground">{token.name}</div>
        </div>
        <div>
          <div className="font-bold text-2xl">${priceUSD}</div>
          <div className="text-xs text-muted-foreground">
            Your USDC: {usdcBalance}
          </div>
        </div>
      </div>
      <TokenPriceChart tokenId={tokenId} />
      <TokenPoolsTable tokenId={tokenId} />
    </div>
  );
}
