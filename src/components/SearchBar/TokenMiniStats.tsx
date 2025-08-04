import { useQuery } from "@apollo/client";
import { GET_TOKEN_DAY_DATAS } from "@/queries/tokens";

export function TokenMiniStats({ tokenId }: { tokenId: string }) {
  const { data, loading } = useQuery(GET_TOKEN_DAY_DATAS, {
    variables: { id: tokenId },
    fetchPolicy: "cache-first",
  });

  // 1D price change
  let change1d = "—";
  let isPositive1d = true;

  if (data?.token?.tokenDayData?.length >= 2) {
    const today = Number(data.token.tokenDayData[0].priceUSD);
    const yesterday = Number(data.token.tokenDayData[1].priceUSD);
    if (yesterday > 0) {
      const change = ((today - yesterday) / yesterday) * 100;
      change1d = `${change > 0 ? "+" : ""}${change.toFixed(2)}%`;
      isPositive1d = change >= 0;
    }
  }

  return loading ? (
    <span className="text-gray-400">...</span>
  ) : (
    <span className={isPositive1d ? "text-green-400" : "text-red-400"}>
      {change1d}
    </span>
  );
}
