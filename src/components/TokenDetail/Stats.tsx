import { formatUSD } from "@/utils/formatUsd";

export function Stats({ token, priceUSD, title = "Stats" }) {
  // TVL
  const tvl = token?.totalValueLockedUSD
    ? formatUSD(token.totalValueLockedUSD)
    : "—";

  // FDV (fully diluted valuation)
  const fdv = token?.totalSupply
    ? formatUSD(Number(token.totalSupply) * (priceUSD || 0))
    : "—";

  // Market Cap (prefer circulatingSupply)
  const marketCap = token?.circulatingSupply
    ? formatUSD(Number(token.circulatingSupply) * (priceUSD || 0))
    : token?.totalSupply
    ? formatUSD(Number(token.totalSupply) * (priceUSD || 0))
    : "—";

  // 1 day volume
  let oneDayVolume = "—";
  if (token?.tokenDayData?.length >= 2) {
    const today = Number(token.tokenDayData[0].volumeUSD || 0);
    const yesterday = Number(token.tokenDayData[1].volumeUSD || 0);
    oneDayVolume = formatUSD(today - yesterday);
  } else if (token?.volumeUSD) {
    oneDayVolume = formatUSD(token.volumeUSD);
  }

  const stats = [
    { label: "TVL", value: tvl },
    { label: "FDV", value: fdv },
    { label: "Market cap", value: marketCap },
    { label: "1 day volume", value: oneDayVolume },
  ];

  return (
    <div className="flex flex-col">
      <div className="text-white text-[26px] font-light mb-5">{title}</div>
      <div className="grid grid-cols-2 gap-y-6 gap-x-4">
        {stats.map((stat, idx) => (
          <div key={stat.label} className="flex flex-col">
            <span className="text-[#fff] text-lg leading-tight">
              {stat.value}
            </span>
            <span
              className="text-[#b7bbc6] text-sm mt-1 tracking-wide"
              style={{
                color: stat.label === "Market cap" ? "#888CA0" : "#b7bbc6",
              }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
