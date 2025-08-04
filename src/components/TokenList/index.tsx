import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_TOKENS } from "@/queries/tokens";
import { useNavigate } from "react-router-dom";
import { SearchInput } from "@/components/ui/searchInput";
import { TOKEN_LIST } from "@/utils/TOKEN_LIST";
import { TokenIcon } from "@/components/TokenList/TokenIcon";
import RedLine from "../../public/icons/redline.svg";
import GreeLine from "../../public/icons/greenline.svg";
import { TokenListSkeleton } from "../skeletons/TokenListSkeleton";

interface Token {
  __typename: "Token";
  id: string;
  symbol: string;
  name: string;
  totalValueLockedUSD: string;
  volumeUSD: string;
  derivedETH: string;
}

export const TokenList = () => {
  const [searchFilter, setSearchFilter] = useState("");
  const [sortBy, setSortBy] = useState("volumeUSD");
  const [sortDirection, setSortDirection] = useState<"desc" | "asc">("desc");
  const navigate = useNavigate();

  const { data, loading } = useQuery(GET_TOKENS, {
    variables: {
      first: 50,
      orderBy: sortBy,
      orderDirection: sortDirection,
      where: {},
    },
  });

  const liveTokens = data?.tokens;
  const fallbackTokens = TOKEN_LIST?.data?.tokens || [];

  const usingFallback = !loading && (!liveTokens || liveTokens.length === 0);

  const tokensToDisplay = (usingFallback ? fallbackTokens : liveTokens)?.filter(
    (token) =>
      token.symbol.toLowerCase().includes(searchFilter.toLowerCase()) ||
      token.name.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === "desc" ? "asc" : "desc");
    } else {
      setSortBy(field);
      setSortDirection("desc");
    }
  };

  const mockPriceChange = () => (Math.random() * 4 - 2).toFixed(2);

  const mockSparkline = (change: string) => (
    <div className="w-16 h-7 flex items-center justify-center">
      <span className={`inline-block w-4 h-4 rounded-full mr-1 `} />
      {parseFloat(change) >= 0 ? (
        <img src={RedLine} alt="" />
      ) : (
        <img src={GreeLine} alt="" />
      )}
    </div>
  );

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4"></div>
      <div className="overflow-x-auto rounded-lg bg-[#15171b] shadow">
        <div className="p-8 font-semibold text-[#00FFF0] flex justify-between align-middle border-b border-[#24262c]">
          Tokens{" "}
          <SearchInput
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            onClear={() => setSearchFilter("")}
            placeholder="Filter by name or symbol..."
            className="max-w-sm text-black"
          />
        </div>

        {usingFallback && (
          <div className="px-8 py-2 text-yellow-400 text-sm italic">
            NOTE: Subgraph isn't synced. Showing previously fetched data.
          </div>
        )}

        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#24262c]">
              <th className="text-left px-6 py-4 font-normal text-base text-[#b4bac2]">
                Token name
              </th>
              <th
                className="text-left px-6 py-4 font-normal text-base text-[#b4bac2] cursor-pointer"
                onClick={() => handleSort("price")}
              >
                Price <span className="text-xs">⇅</span>
              </th>
              <th className="text-left px-6 py-4 font-normal text-base text-[#b4bac2]">
                1H
              </th>
              <th className="text-left px-6 py-4 font-normal text-base text-[#b4bac2]">
                1D
              </th>
              <th className="text-left px-6 py-4 font-normal text-base text-[#b4bac2]">
                FDV
              </th>
              <th
                className="text-left px-6 py-4 font-normal text-base text-[#b4bac2] cursor-pointer"
                onClick={() => handleSort("volumeUSD")}
              >
                Volume <span className="text-xs">⇅</span>
              </th>
              <th className="text-left px-6 py-4 font-normal text-base text-[#b4bac2]">
                1D Chart
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <TokenListSkeleton />
            ) : tokensToDisplay.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-8 text-[#b4bac2] text-base"
                >
                  No tokens found.
                </td>
              </tr>
            ) : (
              tokensToDisplay.map((token: Token) => {
                const price = (parseFloat(token.derivedETH) * 3500).toFixed(2);
                const change1h = mockPriceChange();
                const change1d = mockPriceChange();
                return (
                  <tr
                    key={token.id}
                    className="border-b border-[#24262c] hover:bg-[#191b1f] transition-colors cursor-pointer"
                    onClick={() => navigate(`/token/${token.id}`)}
                    style={{ fontWeight: "normal", fontSize: "15px" }}
                  >
                    <td className="px-6 py-4 flex items-center gap-2 text-[#e4e7ee]">
                      <TokenIcon
                        address={token.id}
                        name={token.name}
                        className="mr-2"
                      />
                      <span>{token.name}</span>
                      <span className="ml-2 text-[#8b92a7] text-sm">
                        {token.symbol}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#e4e7ee]">${price}</td>
                    <td
                      className={`px-6 py-4 ${
                        parseFloat(change1h) >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {parseFloat(change1h) >= 0 ? "▲" : "▼"}{" "}
                      {Math.abs(parseFloat(change1h))}%
                    </td>
                    <td
                      className={`px-6 py-4 ${
                        parseFloat(change1d) >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {parseFloat(change1d) >= 0 ? "▲" : "▼"}{" "}
                      {Math.abs(parseFloat(change1d))}%
                    </td>
                    <td className="px-6 py-4 text-[#e4e7ee]">
                      ${Number(token.totalValueLockedUSD).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-[#e4e7ee]">
                      ${Number(token.volumeUSD).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">{mockSparkline(change1d)}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
