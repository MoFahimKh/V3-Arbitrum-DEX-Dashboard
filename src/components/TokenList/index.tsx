import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_TOKENS } from "@/queries/tokens";
import { useNavigate } from "react-router-dom";
import { SearchInput } from "@/components/ui/searchInput";
import { TOKEN_LIST } from "@/utils/TOKEN_LIST";
import { TokenIcon } from "@/components/TokenList/TokenIcon";
import { TokenListSkeleton } from "../skeletons/TokenListSkeleton";
import { TokenRow } from "./TokenRow";

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
              tokensToDisplay.map((token: Token) => (
                <TokenRow key={token.id} token={token} navigate={navigate} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
