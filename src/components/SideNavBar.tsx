import { useWalletClient, useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import {
  USDC_ABI,
  UNISWAP_ROUTER_ABI,
  USDC_ADDRESS,
  UNISWAP_V3_ROUTER,
  WETH_ADDRESS,
} from "@/config/constants";
import { parseUnits } from "viem";
import { WalletConnector } from "./WalletConnector";

export default function SideNavBar() {
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();

  const handleApprove = async () => {
    if (!walletClient || !address) return;
    try {
      await walletClient.writeContract({
        address: USDC_ADDRESS,
        abi: USDC_ABI,
        functionName: "approve",
        args: [UNISWAP_V3_ROUTER, (0.01 * 10) ^ 6],
        account: address,
        chain: undefined,
      });

      alert("Approval successful");
    } catch (err) {
      console.error(err);
      alert("Approval failed");
    }
  };

  const handleBuy = async () => {
    if (!walletClient || !address) return;

    const params = {
      tokenIn: USDC_ADDRESS,
      tokenOut: WETH_ADDRESS, // WETH for example
      fee: 3000,
      recipient: address,
      deadline: Math.floor(Date.now() / 1000) + 600,
      amountIn: parseUnits("0.001", 6),
      amountOutMinimum: 0,
      sqrtPriceLimitX96: 0,
    };

    try {
      await walletClient.writeContract({
        address: UNISWAP_V3_ROUTER,
        abi: UNISWAP_ROUTER_ABI,
        functionName: "exactInputSingle",
        args: [params],
        account: address,
        chain: undefined,
      });

      alert("Swap successful");
    } catch (err) {
      console.error(err);
      alert("Swap failed");
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full md:w-64 p-4 bg-secondary shadow-md">
      <h2 className="text-lg font-semibold mb-4">Wallet Interactions</h2>
      <WalletConnector />
    </div>
  );
}
