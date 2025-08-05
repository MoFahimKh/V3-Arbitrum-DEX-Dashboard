import { useTokenDetails } from "@/hooks/useTokenDetails";
import { TokenIcon } from "@/components/TokenList/TokenIcon";
import RedLine from "../../public/icons/redline.svg";
import GreeLine from "../../public/icons/greenline.svg";
import { TokenRowProps } from "@/types/tokenRowTypes";

export const TokenRow: React.FC<TokenRowProps> = ({ token, navigate }) => {
  const { token: liveToken, loading: detailsLoading } = useTokenDetails(
    token.id
  );

  const sparkline = (change: number | null) => (
    <div className="w-16 h-7 flex items-center justify-center">
      <span className={`inline-block w-4 h-4 rounded-full mr-1`} />
      {change !== null && change >= 0 ? (
        <img src={RedLine} alt="" />
      ) : (
        <img src={GreeLine} alt="" />
      )}
    </div>
  );

  return (
    <tr
      className="border-b border-[#24262c] hover:bg-[#191b1f] transition-colors cursor-pointer"
      onClick={() => navigate(`/token/${token.id}`)}
      style={{ fontWeight: "normal", fontSize: "15px" }}
    >
      <td className="px-6 py-4 flex items-center gap-2 text-[#e4e7ee]">
        <TokenIcon address={token.id} name={token.name} className="mr-2" />
        <span>{token.name}</span>
        <span className="ml-2 text-[#8b92a7] text-sm">{token.symbol}</span>
      </td>
      <td className="px-6 py-4 text-[#e4e7ee]">
        {detailsLoading || !liveToken
          ? "—"
          : `$${liveToken.currentPrice.toFixed(4)}`}
      </td>
      <td
        className={`px-6 py-4 ${
          !liveToken
            ? ""
            : liveToken.percentChange1h !== null &&
              liveToken.percentChange1h >= 0
            ? "text-green-500"
            : "text-red-500"
        }`}
      >
        {detailsLoading || !liveToken || liveToken.percentChange1h === null
          ? "—"
          : liveToken.percentChange1h >= 0
          ? `▲ ${liveToken.percentChange1h.toFixed(2)}%`
          : `▼ ${Math.abs(liveToken.percentChange1h).toFixed(2)}%`}
      </td>
      <td
        className={`px-6 py-4 ${
          !liveToken
            ? ""
            : liveToken.percentChange1d !== null &&
              liveToken.percentChange1d >= 0
            ? "text-green-500"
            : "text-red-500"
        }`}
      >
        {detailsLoading || !liveToken || liveToken.percentChange1d === null
          ? "—"
          : liveToken.percentChange1d >= 0
          ? `▲ ${liveToken.percentChange1d.toFixed(2)}%`
          : `▼ ${Math.abs(liveToken.percentChange1d).toFixed(2)}%`}
      </td>
      <td className="px-6 py-4 text-[#e4e7ee]">
        {detailsLoading || !liveToken || liveToken.fdv === null
          ? "—"
          : `$${liveToken.fdv.toLocaleString()}`}
      </td>
      <td className="px-6 py-4 text-[#e4e7ee]">
        ${Number(token.volumeUSD).toLocaleString()}
      </td>
      <td className="px-6 py-4">
        {detailsLoading || !liveToken
          ? "—"
          : sparkline(liveToken.percentChange1d)}
      </td>
    </tr>
  );
};
