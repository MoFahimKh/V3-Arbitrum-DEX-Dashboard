import { COINGECKO_CHART_BASE_URL } from "@/config/constants";

export async function fetchCoinGeckoChart(tokenAddress: string) {
  const url = `${COINGECKO_CHART_BASE_URL}/${tokenAddress}/market_chart/?vs_currency=usd&days=30`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();
  return (data.prices || []).map(([timestamp, price]: [number, number]) => ({
    date: new Date(timestamp).toLocaleDateString(),
    priceUSD: price,
  }));
}
