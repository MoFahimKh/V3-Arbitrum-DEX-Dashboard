import { useState, useCallback } from "react";
import { useAccount, useWalletClient } from "wagmi";
import { parseUnits } from "viem";
import {
  USDC_ADDRESS,
  USDC_ABI,
  UNISWAP_V3_ROUTER,
  UNISWAP_ROUTER_ABI,
} from "@/config/constants";

export const useUniswap = () => {
  const { address, isConnected, chain } = useAccount();
  const { data: walletClient } = useWalletClient();

  const [approveStatus, setApproveStatus] = useState("idle"); // idle, pending, success, error
  const [buyStatus, setBuyStatus] = useState("idle");
  const [error, setError] = useState(null);

  // Approve function
  const handleApprove = useCallback(
    async (spender, amount) => {
      if (!walletClient || !address) return;
      setApproveStatus("pending");
      setError(null);
      try {
        await walletClient.writeContract({
          address: USDC_ADDRESS,
          abi: USDC_ABI,
          functionName: "approve",
          args: [spender, parseUnits(amount, 6)],
          account: address,
          chain: chain,
        });
        setApproveStatus("success");
      } catch (err) {
        setApproveStatus("error");
        setError("Approval failed");
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [walletClient, address]
  );

  // Buy/swap function
  const handleBuy = useCallback(
    async (tokenOutAddress, amountIn = "0.001") => {
      if (!walletClient || !address) return;
      setBuyStatus("pending");
      setError(null);

      const params = {
        tokenIn: USDC_ADDRESS,
        tokenOut: tokenOutAddress,
        fee: 3000,
        recipient: address,
        deadline: Math.floor(Date.now() / 1000) + 600,
        amountIn: parseUnits(amountIn, 6),
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
          chain: chain,
        });
        setBuyStatus("success");
      } catch (err) {
        setBuyStatus("error");
        setError("Swap failed");
      }
    },
    [walletClient, address, chain]
  );

  return {
    approveStatus,
    buyStatus,
    error,
    handleApprove,
    handleBuy,
    isConnected,
  };
};
