import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_TOKENS } from "@/queries/tokens";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/searchInput";

export const TokenList = () => {
  const [searchFilter, setSearchFilter] = useState("");
  const [sortBy, setSortBy] = useState("totalValueLockedUSD");
  const [sortDirection, setSortDirection] = useState<"desc" | "asc">("desc");
  const navigate = useNavigate();

  const { data, loading, error } = useQuery(GET_TOKENS, {
    variables: {
      first: 50,
      orderBy: sortBy,
      orderDirection: sortDirection,
      where: {},
    },
  });

  const filteredTokens =
    data?.tokens?.filter(
      (token: any) =>
        token.symbol.toLowerCase().includes(searchFilter.toLowerCase()) ||
        token.name.toLowerCase().includes(searchFilter.toLowerCase())
    ) || [];

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === "desc" ? "asc" : "desc");
    } else {
      setSortBy(field);
      setSortDirection("desc");
    }
  };

  if (loading) return <div className="p-8 text-center">Loading tokens...</div>;
  if (error)
    return (
      <div className="p-8 text-center text-destructive">
        Error loading tokens
      </div>
    );

  const mockPriceChange = () => (Math.random() * 4 - 2).toFixed(2);
  const mockSparkline = (change: string) => (
    <div
      className={`w-20 h-8 rounded flex items-center justify-center text-xs font-medium ${
        parseFloat(change) >= 0
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {parseFloat(change) >= 0 ? "📈" : "📉"}
    </div>
  );

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-4">
        <SearchInput
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          onClear={() => setSearchFilter("")}
          placeholder="Filter by name or symbol..."
          className="max-w-sm"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4">#</th>
              <th className="text-left p-4">Token</th>
              <th className="text-left p-4">Price</th>
              <th className="text-left p-4">FDV</th>
              <th className="text-left p-4">24h Volume</th>
              <th className="text-left p-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort("totalValueLockedUSD")}
                  className="p-0 h-auto font-medium"
                >
                  TVL{" "}
                  {sortBy === "totalValueLockedUSD" &&
                    (sortDirection === "desc" ? "↓" : "↑")}
                </Button>
              </th>
              <th className="text-left p-4">1H %</th>
              <th className="text-left p-4">1D %</th>
              <th className="text-left p-4">Sparkline</th>
            </tr>
          </thead>
          <tbody>
            {filteredTokens.map((token: any, index: number) => {
              const change1h = mockPriceChange();
              const change1d = mockPriceChange();

              return (
                <tr
                  key={token.id}
                  className="border-b border-border hover:bg-muted cursor-pointer"
                  onClick={() => navigate(`/token/${token.id}`)}
                >
                  <td className="p-4 text-muted-foreground">{index + 1}</td>
                  <td className="p-4">
                    <div>
                      <div className="font-medium">{token.symbol}</div>
                      <div className="text-sm text-muted-foreground">
                        {token.name}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-medium">
                    $
                    {(parseFloat(token.derivedETH.toString()) * 3500).toFixed(
                      4
                    )}
                  </td>
                  <td className="p-4">
                    $
                    {parseFloat(
                      (token.totalValueLockedUSD * 50).toString()
                    ).toLocaleString()}
                  </td>
                  <td className="p-4">
                    ${parseFloat(token.volumeUSD).toLocaleString()}
                  </td>
                  <td className="p-4">
                    ${parseFloat(token.totalValueLockedUSD).toLocaleString()}
                  </td>
                  <td className="p-4 font-medium text-green-600">
                    {change1h}%
                  </td>
                  <td className="p-4 font-medium text-red-600">{change1d}%</td>
                  <td className="p-4">{mockSparkline(change1d)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
