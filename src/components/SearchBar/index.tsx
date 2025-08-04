import { useRef, useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { SEARCH_TOKENS } from "@/queries/tokens";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { fetchEthPrice } from "@/utils/fetchEthPrice";
import { SearchResultsList } from "./SearchResultsList";

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [ethPrice, setEthPrice] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
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

  const handleClear = () => {
    setSearchTerm("");
    setShowResults(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-96 max-w-lg">
      <div className="relative">
        <Input
          ref={inputRef}
          placeholder="Search tokens"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
          className="
    w-full
    pl-4 pr-12
    rounded-2xl
    bg-black
    text-gray-300
    placeholder:text-gray-500
    border border-gray-600
    focus:border-gray-400
    focus:ring-0
    focus:outline-none
    shadow-none
    text-base
    transition
  "
        />

        {!searchTerm && (
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <circle
                cx="11"
                cy="11"
                r="8"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M21 21l-4.35-4.35"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
        )}
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 p-0 m-0 bg-transparent border-none outline-none"
            aria-label="Clear"
          >
            &#10006;
          </button>
        )}
      </div>
      {showResults && (
        <div className="absolute top-full left-0 right-0 bg-[#222222] rounded-2xl shadow-lg border border-[#333] z-50 p-0 max-h-96 overflow-y-auto min-w-[600px]">
          <div className="px-6 pt-5 pb-2 text-gray-400 font-semibold text-base">
            Search Results
          </div>
          <SearchResultsList
            tokens={data?.tokens || []}
            loading={loading}
            onTokenClick={handleTokenClick}
            ethPrice={ethPrice}
          />
        </div>
      )}
    </div>
  );
};
