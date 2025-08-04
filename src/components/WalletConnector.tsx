import {
  useAccount,
  useConnect,
  useDisconnect,
  useSwitchChain,
  useBalance,
} from "wagmi";
import { Button } from "@/components/ui/button";
import { arbitrum } from "wagmi/chains";
import { useEffect, useRef, useState } from "react";
import { LogOut } from "lucide-react";
import AddressIcon from "../public/icons/address-icon.svg";

export const WalletConnector = () => {
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const [showConnectDropdown, setShowConnectDropdown] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const { data: balanceData } = useBalance({
    address,
    chainId: arbitrum.id,
    enabled: isConnected,
    watch: true,
  });

  useEffect(() => {
    if (isConnected && chain?.id !== arbitrum.id) {
      switchChain({ chainId: arbitrum.id });
    }
  }, [isConnected, chain, switchChain]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowConnectDropdown(false);
        setShowAccountDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isConnected) {
    return (
      <div className="relative" ref={dropdownRef}>
        <Button
          className="flex items-center gap-2 border-2 border-[#00FFF0] text-[#00FFF0] px-6 h-12 rounded-2xl font-semibold text-lg bg-[#00FFF0]/10 transition shadow-md"
          onClick={() => setShowConnectDropdown((open) => !open)}
        >
          Connect Wallet
        </Button>
        {showConnectDropdown && (
          <div className="absolute right-0 mt-2 w-56 bg-[#171A1D] border border-[#00FFF0] rounded-xl shadow-xl z-50 p-2">
            {connectors.map((connector) => (
              <Button
                key={connector.uid}
                className="w-full flex items-center gap-2 mb-2 last:mb-0 bg-transparent text-[#00FFF0] border border-[#00FFF0] rounded-lg hover:bg-transparent"
                onClick={() => {
                  connect({ connector });
                  setShowConnectDropdown(false);
                }}
                size="sm"
              >
                Connect {connector.name}
              </Button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        className="flex items-center gap-3 border border-[#00FFF0] text-[#00FFF0] bg-[#0e2222] px-6 h-10  rounded-2xl font-semibold text-md transition relative"
        style={{
          borderRadius: "10px",
        }}
        onMouseEnter={() => setShowAccountDropdown(true)}
        onMouseLeave={() => setShowAccountDropdown(false)}
        onClick={() => setShowAccountDropdown((open) => !open)}
      >
        <img src={AddressIcon} alt="" />
        <span className="tracking-wider">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </span>
      </Button>

      {showAccountDropdown && (
        <div
          className="absolute right-0 mt-0 min-w-[320px] bg-[#232323] rounded-2xl shadow-2xl z-50 px-4 py-3 flex flex-col gap-2"
          onMouseEnter={() => setShowAccountDropdown(true)}
          onMouseLeave={() => setShowAccountDropdown(false)}
        >
          <div>
            <div className="text-gray-400 text-[16px] mb-1 ">Balance</div>
            <div className="text-white text-[1.2rem] leading-none mb-3">
              {balanceData
                ? `${Number(balanceData.formatted).toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })} ${balanceData.symbol}`
                : "--"}
            </div>
            <hr className="border-gray-600 opacity-40" />
          </div>
          <Button
            variant="ghost"
            size="lg"
            className="bg-[#292929] text-gray-200 w-full rounded-xl justify-center  h-12 hover:bg-[#323232] transition"
            onClick={() => disconnect()}
          >
            <LogOut className="w-6 h-6" />
            Disconnect
          </Button>
        </div>
      )}
    </div>
  );
};
