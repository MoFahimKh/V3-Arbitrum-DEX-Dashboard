import { GET_TOKEN_DETAILS } from "@/queries/tokens";
import { QueryData, UseTokenDetailsResult } from "@/types/tokenDetails";
import { useQuery } from "@apollo/client";

export function useTokenDetails(id: string): UseTokenDetailsResult {
  const { data, loading, error } = useQuery<QueryData>(GET_TOKEN_DETAILS, {
    variables: { id },
    skip: !id,
    fetchPolicy: "cache-and-network",
  });

  if (loading || !data) return { loading, token: null, error };
  if (error) return { loading, token: null, error };

  const token = data.token;
  const hourDatas = data.tokenHourDatas || [];
  const dayDatas = token.tokenDayData || [];
  const ethPriceUSD = Number(data.bundle?.ethPriceUSD || 0);

  const currentPrice =
    typeof token.derivedETH !== "undefined"
      ? Number(token.derivedETH) * ethPriceUSD
      : 0;

  let percentChange1h: number | null = null;
  if (hourDatas.length === 2) {
    const latest = Number(hourDatas[0].priceUSD);
    const prev = Number(hourDatas[1].priceUSD);
    percentChange1h = prev ? ((latest - prev) / prev) * 100 : null;
  }

  let percentChange1d: number | null = null;
  if (dayDatas.length === 2) {
    const latest = Number(dayDatas[0].priceUSD);
    const prev = Number(dayDatas[1].priceUSD);
    percentChange1d = prev ? ((latest - prev) / prev) * 100 : null;
  }

  const fdv =
    typeof token.totalSupply !== "undefined"
      ? Number(token.totalSupply) * currentPrice
      : null;

  return {
    loading,
    error,
    token: {
      ...token,
      currentPrice,
      percentChange1h,
      percentChange1d,
      fdv,
      ethPriceUSD,
    },
  };
}
