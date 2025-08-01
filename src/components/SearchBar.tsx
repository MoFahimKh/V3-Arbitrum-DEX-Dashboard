import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { SEARCH_TOKENS } from "@/queries/tokens";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { fetchEthPrice } from "@/utils/fetchEthPrice";

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [ethPrice, setEthPrice] = useState<number>(0);
  const navigate = useNavigate();

  const { data, loading } = useQuery(SEARCH_TOKENS, {
    variables: { searchTerm },
    skip: searchTerm.length < 2,
  });

  useEffect(() => {
    setShowResults(searchTerm.length >= 2);
  }, [searchTerm]);

  useEffect(() => {
    fetchEthPrice().then((price) => setEthPrice(price));
  }, []);

  const handleTokenClick = (tokenId: string) => {
    navigate(`/token/${tokenId}`);
    setSearchTerm("");
    setShowResults(false);
  };
  return (
    <div className="relative w-80">
      <Input
        placeholder="Search tokens..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onBlur={() => setTimeout(() => setShowResults(false), 200)}
      />

      {showResults && (
        <div className="absolute top-full left-0 right-0 bg-card border border-border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-muted-foreground">
              Loading...
            </div>
          ) : data?.tokens?.length > 0 ? (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data.tokens.map((token: any) => (
              <div
                key={token.id}
                className="p-3 hover:bg-muted cursor-pointer border-b last:border-b-0"
                onClick={() => handleTokenClick(token.id)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{token.symbol}</div>
                    <div className="text-sm text-muted-foreground">
                      {token.name}
                    </div>
                  </div>
                  <div className="text-sm font-medium">
                    $
                    {token.derivedETH && ethPrice
                      ? (parseFloat(token.derivedETH) * ethPrice).toFixed(4)
                      : "--"}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              No tokens found
            </div>
          )}
        </div>
      )}
    </div>
  );
};
