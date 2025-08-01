import { useQuery } from "@apollo/client";
import { GET_TOKEN_POOLS } from "@/queries/tokens";

export function TokenPoolsTable({ tokenId }: { tokenId: string }) {
  const { data, loading } = useQuery(GET_TOKEN_POOLS, {
    variables: { tokenId },
  });

  if (loading) return <div>Loading pools...</div>;

  return (
    <div>
      <h2 className="font-bold text-lg mb-2">Top Pools</h2>
      {data?.pools?.length ? (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data.pools.map((pool: any) => (
          <div
            key={pool.id}
            style={{
              marginBottom: 12,
              padding: 8,
              background: "#f8fafc",
              borderRadius: 8,
            }}
          >
            <div>
              {pool.token0.symbol}/{pool.token1.symbol} | Fee:{" "}
              {pool.feeTier / 10000}%
            </div>
            <div>
              TVL: ${parseFloat(pool.totalValueLockedUSD).toLocaleString()}
            </div>
            {pool.apr && <div>APR: {pool.apr}%</div>}
          </div>
        ))
      ) : (
        <div className="text-muted-foreground">No pools found.</div>
      )}
    </div>
  );
}
