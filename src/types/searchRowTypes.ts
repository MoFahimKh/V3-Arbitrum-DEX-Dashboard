export type Token = {
  id: string;
  symbol: string;
  name: string;
  derivedETH: string;
  volumeUSD?: string;
};

export type SearchResultRowProps = {
  token: Token;
  onTokenClick: (tokenId: string) => void;
  idx: number;
  isLast: boolean;
};
