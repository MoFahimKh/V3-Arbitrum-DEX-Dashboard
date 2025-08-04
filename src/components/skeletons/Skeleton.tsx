export function Skeleton({ width = "100%", height = "32px", className = "" }) {
  return (
    <div
      className={`animate-pulse rounded bg-[#2c2f36] ${className}`}
      style={{ width, height }}
    />
  );
}
