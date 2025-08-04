/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@apollo/client";
import { GET_TOKEN_POOLS } from "@/queries/tokens";
import { PoolsTableSkeleton } from "../skeletons/PoolsTableSkeleton";

function TokenIcon({ symbol }: { symbol: string }) {
  return (
    <span className="w-7 h-7 rounded-full flex items-center justify-center border-2 border-[#111] bg-[#222] -ml-3 first:ml-0 text-lg font-bold text-white uppercase select-none">
      {symbol?.charAt(0) || "?"}
    </span>
  );
}

export function TokenPoolsTable({ tokenId }: { tokenId: string }) {
  const { data, loading } = useQuery(GET_TOKEN_POOLS, {
    variables: { tokenId },
  });

  if (loading) return <PoolsTableSkeleton rows={5} />;

  return (
    <div className="bg-[#181818] p-4 w-full max-w-3xl mx-auto ">
      {data?.pools?.length ? (
        <table className="w-full text-left">
          <thead>
            <tr className="text-[#b8b8b8] border-b border-[#2c2c2c] text-[20px] font-light">
              <th className="py-3 "></th>
              <th className="py-3 font-light">Pools</th>
              <th className="py-3 font-light">Protocol</th>
              <th className="py-3 font-light">Fee tier</th>
              <th className="py-3 font-light">TVL</th>
              <th className="py-3 font-light">Pool APR</th>
            </tr>
          </thead>
          <tbody>
            {data.pools.map((pool: any, idx: number) => (
              <tr
                key={pool.id}
                className="border-b border-[#232323] last:border-0 group hover:bg-[#232323]/40 transition"
              >
                <td className="py-5 pr-4 align-middle text-[#b8b8b8] text-lg  w-8">
                  {String(idx + 1).padStart(2, "0")}
                </td>
                <td className="py-5 flex items-center space-x-[-8px] min-w-[160px]">
                  <div className="flex items-center mr-3">
                    <TokenIcon symbol={pool.token0.symbol} />
                    <TokenIcon symbol={pool.token1.symbol} />
                  </div>
                  <span className="ml-4 text-lg text-[#e5e7eb] ">
                    {pool.token0.symbol}/{pool.token1.symbol}
                  </span>
                </td>
                <td className="py-5 text-[#e5e7eb] text-base  min-w-[120px]">
                  Uniswap V3
                </td>
                <td className="py-5 flex gap-1 ">
                  {" "}
                  <span className="text-green-500">▲</span>
                  {(pool.feeTier / 10000).toFixed(2)}%
                </td>
                <td className="py-5 text-[#e5e7eb] ">
                  {Number(pool.totalValueLockedUSD) > 1e9
                    ? `$${(Number(pool.totalValueLockedUSD) / 1e9).toFixed(2)}B`
                    : Number(pool.totalValueLockedUSD) > 1e6
                    ? `$${(Number(pool.totalValueLockedUSD) / 1e6).toFixed(2)}M`
                    : `$${Number(pool.totalValueLockedUSD).toLocaleString(
                        undefined,
                        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                      )}`}
                </td>
                <td className="py-5 text-[#e5e7eb] ">N/A</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-[#9ca3af]">No pools found.</div>
      )}
    </div>
  );
}
