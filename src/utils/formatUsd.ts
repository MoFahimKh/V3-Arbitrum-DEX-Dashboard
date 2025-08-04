export function formatUSD(val: number) {
  const num = Number(val);
  if (num > 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num > 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  if (num > 1e3) return `$${(num / 1e3).toFixed(2)}K`;
  return `$${num.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
