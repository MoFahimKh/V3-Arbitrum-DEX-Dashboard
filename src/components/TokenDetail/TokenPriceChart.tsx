import { useQuery } from "@apollo/client";
import { GET_TOKEN_DAY_DATAS, GET_TOKEN_DETAIL } from "@/queries/tokens";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Stats } from "./Stats";
import { TAB_OPTIONS } from "@/utils/TAB_OPTIONS";
import { ChartAndStatsSkeleton } from "../skeletons/SkeletonChartAndStats";

export function TokenPriceChart({ tokenId }) {
  const [selectedTab, setSelectedTab] = useState("1H");
  const [priceHistory, setPriceHistory] = useState([]);

  const { data, loading } = useQuery(GET_TOKEN_DAY_DATAS, {
    variables: { id: tokenId },
  });
  console.log(data);
  const { data: tokenDetails, loading: tokenDetailsLoading } = useQuery(
    GET_TOKEN_DETAIL,
    { variables: { id: tokenId } }
  );

  useEffect(() => {
    if (!loading && data?.token?.tokenDayData) {
      const dayData = data.token.tokenDayData;
      let filteredData = dayData.slice().reverse();
      switch (selectedTab) {
        case "1M":
          filteredData = filteredData.slice(-30);
          break;
        case "5M":
          filteredData = filteredData.slice(-5);
          break;
        case "24H":
          filteredData = filteredData.slice(-1);
          break;
        default:
          break;
      }
      const formattedData = filteredData.map((d) => ({
        date: new Date(Number(d.date) * 1000).toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          day: "2-digit",
          month: "short",
        }),
        priceUSD: Number(d.priceUSD),
      }));
      setPriceHistory(formattedData);
    }
  }, [loading, data, tokenId, selectedTab]);

  const token = tokenDetails?.token;
  const ethPrice = Number(tokenDetails?.bundle?.ethPriceUSD || 0);

  // Calculate token price in USD
  const priceUSD = token?.derivedETH
    ? Number(token.derivedETH) * ethPrice
    : null;

  let priceChange24h = null;
  let priceChangeColor = "#9ca3af"; // gray

  if (
    tokenDetails?.token?.tokenDayData &&
    tokenDetails.token.tokenDayData.length >= 2
  ) {
    const todayPrice = Number(
      tokenDetails.token.tokenDayData[0]?.priceUSD || 0
    );
    const yesterdayPrice = Number(
      tokenDetails.token.tokenDayData[1]?.priceUSD || 0
    );
    if (yesterdayPrice > 0) {
      priceChange24h = ((todayPrice - yesterdayPrice) / yesterdayPrice) * 100;
      priceChangeColor =
        priceChange24h > 0
          ? "#24e1b3"
          : priceChange24h < 0
          ? "#ff5252"
          : "#9ca3af";
    }
  }

  if (loading || tokenDetailsLoading)
    return (
      <div
        className="bg-[#181818] p-4 h-[503px]"
        style={{ padding: "10px 25px" }}
      >
        <ChartAndStatsSkeleton />
      </div>
    );
  return (
    <div
      className="bg-[#181818] p-4 h-[503px]"
      style={{ padding: "10px 25px" }}
    >
      <div className="text-xs text-[#8ba1b7] text-[16px] p-[25px] mb-2">
        Explore <span className="mx-1">{">"}</span>
        <span className="text-[#00FFF2]">{token?.name || "Ethereum"}</span>
      </div>
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 bg-[#181818] rounded-2xl flex flex-col">
          <div className="flex flex-col gap-2 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#23263b] flex items-center justify-center">
                {token?.symbol?.[0] || "E"}
              </div>
              <div className="flex gap-4">
                <div className="text-xl text-white">
                  {token?.name || "Ethereum"}
                </div>
                <div className="text-sm text-[#8f98ae] tracking-wider mt-1.5">
                  {token?.symbol || "ETH"}
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl text-white leading-snug">
                {priceUSD
                  ? `$${priceUSD.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`
                  : "$—"}
              </div>
              <div
                className="text-base mt-1"
                style={{
                  color:
                    priceChange24h !== null &&
                    typeof priceChange24h === "number"
                      ? priceChangeColor
                      : "#9ca3af",
                }}
              >
                {priceChange24h !== null && typeof priceChange24h === "number"
                  ? `${priceChange24h > 0 ? "+" : ""}${priceChange24h.toFixed(
                      2
                    )}%`
                  : "—"}
              </div>
            </div>
          </div>

          <div className="w-[500px] h-[220px] mb-6">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={priceHistory}>
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 13, fill: "#8f98ae" }}
                  axisLine={false}
                  tickLine={false}
                  padding={{ left: 8, right: 16 }}
                />
                <YAxis
                  domain={["auto", "auto"]}
                  tick={{ fontSize: 13, fill: "#8f98ae" }}
                  axisLine={false}
                  tickLine={false}
                  width={48}
                  orientation="right"
                />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1f2230", border: "none" }}
                  labelStyle={{ color: "#f1f1f1" }}
                  itemStyle={{ color: "#f1f1f1" }}
                />
                <Line
                  type="monotone"
                  dataKey="priceUSD"
                  stroke="#00FFF0"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center gap-2 mb-2 ">
            <div className="flex bg-black rounded-3xl p-2 gap-2">
              {TAB_OPTIONS.map((tab) => (
                <button
                  key={tab.value}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                    selectedTab === tab.value
                      ? "bg-[#00FFF0] text-[#181A20]"
                      : "bg-[#23263b] text-white"
                  }`}
                  onClick={() => setSelectedTab(tab.value)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <button className="text-xs px-4 py-2 bg-black text-white rounded-3xl font-semibold flex items-center gap-1 ml-40">
              PRICE <span className="text-[10px]">▼</span>
            </button>
          </div>
        </div>
        <div className="flex-shrink-0 w-full lg:w-[340px] lg:ml-8 mr-[170px]">
          <Stats token={token} priceUSD={priceUSD} />
        </div>
      </div>
    </div>
  );
}
