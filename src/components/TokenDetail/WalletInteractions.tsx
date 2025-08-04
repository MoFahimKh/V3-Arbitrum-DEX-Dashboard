import {
  USDC_ADDRESS,
  USDC_ABI,
  UNISWAP_V3_ROUTER,
  UNISWAP_ROUTER_ABI,
} from "@/config/constants";
import { Button } from "../ui/button";
import { useUniswap } from "@/hooks/useUniswap";

export const WalletInteractions = ({ tokenOutAddress }) => {
  const {
    approveStatus,
    buyStatus,
    error,
    handleApprove,
    handleBuy,
    isConnected,
  } = useUniswap();

  return (
    <div className="bg-[#181818]  space-y-3 h-[300px] p-8">
      <div className="text-[20px]">Wallet Interactions</div>
      <Button
        disabled={approveStatus === "pending" || !isConnected}
        onClick={() => handleApprove(UNISWAP_V3_ROUTER, "0.01")}
        className="flex items-center gap-3  text-[#00FFF2] bg-[#004441] hover:bg-[#0e2222] px-6 h-10  rounded-2xl text-[20px]"
        style={{ borderRadius: "10px" }}
      >
        {approveStatus === "pending"
          ? "Approving..."
          : approveStatus === "success"
          ? "Approved!"
          : "Approve Transaction"}
      </Button>
      <Button
        disabled={buyStatus === "pending" || !isConnected}
        onClick={() => handleBuy(tokenOutAddress, "0.001")}
        className="flex items-center gap-3  text-[#00FFF2] bg-[#004441] hover:bg-[#0e2222] px-6 h-10  rounded-2xl text-[20px] w-[233px]"
        style={{ borderRadius: "10px" }}
      >
        {buyStatus === "pending"
          ? "Buying..."
          : buyStatus === "success"
          ? "Bought!"
          : "Buy Transaction"}
      </Button>
      {error && (
        <div className="text-red-500 text-sm pt-2 break-words">{error}</div>
      )}
    </div>
  );
};
