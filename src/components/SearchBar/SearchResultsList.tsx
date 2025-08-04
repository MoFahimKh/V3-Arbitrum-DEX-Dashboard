import { formatUSD } from "@/utils/formatUsd";
import { TokenMiniStats } from "./TokenMiniStats";

type Token = {
  id: string;
  symbol: string;
  name: string;
  derivedETH: string;
  totalValueLockedUSD?: string;
  volumeUSD?: string;
};

export function SearchResultsList({
  tokens,
  loading,
  onTokenClick,
  ethPrice,
}: {
  tokens: Token[];
  loading: boolean;
  onTokenClick: (tokenId: string) => void;
  ethPrice: number;
}) {
  if (loading) {
    return (
      <div className="px-6 py-8 text-center text-gray-400">Loading...</div>
    );
  }

  if (!tokens || tokens.length === 0) {
    return (
      <div className="px-6 py-8 text-center text-gray-400">No tokens found</div>
    );
  }

  return (
    <>
      {tokens.map((token, idx) => {
        const price =
          token.derivedETH && ethPrice
            ? `$${(parseFloat(token.derivedETH) * ethPrice).toFixed(2)}`
            : "—";
        const volume = token.volumeUSD
          ? formatUSD(Number(token.volumeUSD))
          : "—";

        return (
          <div key={token.id}>
            <div
              className="flex px-6 py-4 items-center hover:bg-[#282828] transition cursor-pointer"
              onClick={() => onTokenClick(token.id)}
            >
              <div className="flex items-center w-[180px] gap-4">
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#4255ff] text-white text-lg font-bold select-none uppercase">
                  {token.symbol?.charAt(0) || token.name?.charAt(0) || "?"}
                </div>
                <span className="text-white text-base font-normal">
                  {token.name}
                </span>
              </div>
              <div className="flex-1 grid grid-cols-4 gap-6 items-center">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Price</div>
                  <div className="text-gray-200 text-base font-normal">
                    {price}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">1H</div>
                  <div className="text-base font-normal flex items-center gap-1">
                    <span className="text-gray-400">—</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">1D</div>
                  <div className="text-base font-normal flex items-center gap-1">
                    <TokenMiniStats tokenId={token.id} />
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Volume</div>
                  <div className="text-gray-200 text-base font-normal">
                    {volume}
                  </div>
                </div>
              </div>
            </div>
            {idx !== tokens.length - 1 && (
              <div className="border-t border-[#333] mx-6" />
            )}
          </div>
        );
      })}
    </>
  );
}
