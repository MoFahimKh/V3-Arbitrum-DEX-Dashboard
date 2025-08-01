import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { Button } from "@/components/ui/button";
import { arbitrum } from "wagmi/chains";
import { useEffect } from "react";

export const WalletConnector = () => {
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();

  useEffect(() => {
    if (isConnected && chain?.id !== arbitrum.id) {
      switchChain({ chainId: arbitrum.id });
    }
  }, [isConnected, chain, switchChain]);

  if (isConnected) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </span>
        <Button variant="outline" size="sm" onClick={() => disconnect()}>
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 flex-col">
      {connectors.map((connector) => (
        <Button
          key={connector.uid}
          variant="outline"
          size="sm"
          onClick={() => connect({ connector })}
        >
          Connect {connector.name}
        </Button>
      ))}
    </div>
  );
};
