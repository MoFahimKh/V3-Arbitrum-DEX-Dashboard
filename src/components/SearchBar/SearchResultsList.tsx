import { useTokenDetails } from "@/hooks/useTokenDetails";
import { formatUSD } from "@/utils/formatUsd";

type Token = {
  id: string;
  symbol: string;
  name: string;
  derivedETH: string;
  volumeUSD?: string;
};

type SearchResultRowProps = {
  token: Token;
  onTokenClick: (tokenId: string) => void;
  idx: number;
  isLast: boolean;
};

export function SearchResultRow({
  token,
  onTokenClick,
  idx,
  isLast,
}: SearchResultRowProps) {
  const { token: details, loading: statsLoading } = useTokenDetails(token.id);

  const price = details ? `$${details.currentPrice.toFixed(2)}` : "—";
  const volume = token.volumeUSD ? formatUSD(Number(token.volumeUSD)) : "—";
  const change1h = details?.percentChange1h;
  const change1d = details?.percentChange1d;
  const isPositive1h = change1h !== null ? change1h >= 0 : null;
  const isPositive1d = change1d !== null ? change1d >= 0 : null;

  return (
    <>
      <div
        className="flex px-6 py-4 items-center hover:bg-[#282828] transition cursor-pointer"
        onClick={() => onTokenClick(token.id)}
      >
        <div className="flex items-center w-[180px] gap-4">
          <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#4255ff] text-white text-lg font-bold select-none uppercase">
            {token.symbol?.charAt(0) || token.name?.charAt(0) || "?"}
          </div>
          <span className="text-white text-base font-normal">{token.name}</span>
        </div>
        <div className="flex-1 grid grid-cols-4 gap-6 items-center">
          <div>
            <div className="text-xs text-gray-500 mb-1">Price</div>
            <div className="text-gray-200 text-base font-normal">
              {statsLoading ? "..." : price}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">1H</div>
            <div
              className={`text-base font-normal flex items-center gap-1 ${
                isPositive1h === null
                  ? ""
                  : isPositive1h
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {statsLoading
                ? "..."
                : change1h !== null
                ? `${change1h >= 0 ? "+" : ""}${change1h.toFixed(2)}%`
                : "—"}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">1D</div>
            <div
              className={`text-base font-normal flex items-center gap-1 ${
                isPositive1d === null
                  ? ""
                  : isPositive1d
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {statsLoading
                ? "..."
                : change1d !== null
                ? `${change1d >= 0 ? "+" : ""}${change1d.toFixed(2)}%`
                : "—"}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Volume</div>
            <div className="text-gray-200 text-base font-normal">{volume}</div>
          </div>
        </div>
      </div>
      {!isLast && <div className="border-t border-[#333] mx-6" />}
    </>
  );
}

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
      {tokens.map((token, idx) => (
        <SearchResultRow
          key={token.id}
          token={token}
          onTokenClick={onTokenClick}
          idx={idx}
          isLast={idx === tokens.length - 1}
        />
      ))}
    </>
  );
}
