import { useQuery } from "@apollo/client";
import { GET_TOKEN_DAY_DATAS } from "@/queries/tokens";
import { fetchCoinGeckoChart } from "@/utils/fetchCoinGeckoChart";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function TokenPriceChart({ tokenId }: { tokenId: string }) {
  const { data, loading } = useQuery(GET_TOKEN_DAY_DATAS, {
    variables: { token: tokenId },
  });
  interface PriceHistoryEntry {
    date: string;
    priceUSD: number;
  }
  const [priceHistory, setPriceHistory] = useState<PriceHistoryEntry[]>([]);
  const [usingCoinGecko, setUsingCoinGecko] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!data?.tokenDayDatas || data.tokenDayDatas.length === 0) {
        // fallback to CoinGecko
        fetchCoinGeckoChart(tokenId).then((cgData) => {
          setPriceHistory(cgData);
          setUsingCoinGecko(true);
        });
      } else {
        setPriceHistory(
          data.tokenDayDatas
            .slice()
            .reverse()
            .map((d: { date: string; priceUSD: string }) => ({
              date: new Date(Number(d.date) * 1000).toLocaleDateString(),
              priceUSD: Number(d.priceUSD),
            }))
        );
      }
    }
  }, [loading, data, tokenId]);

  if (loading) return <div>Loading chart...</div>;

  return (
    <div
      style={{
        width: "100%",
        height: 300,
        background: "#f1f5f9",
        borderRadius: 8,
      }}
    >
      {priceHistory.length > 0 ? (
        <ResponsiveContainer>
          <LineChart data={priceHistory}>
            <XAxis dataKey="date" />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="priceUSD"
              stroke="#8884d8"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          No price chart data available.
        </div>
      )}
      {usingCoinGecko && (
        <div className="text-xs text-center text-muted-foreground mt-1">
          Chart data fetched from CoinGecko API
        </div>
      )}
    </div>
  );
}
