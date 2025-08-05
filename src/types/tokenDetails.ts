export type TokenHourData = {
  periodStartUnix: string;
  priceUSD: string;
};

export type TokenDayData = {
  date: string;
  priceUSD: string;
};

export type Token = {
  id: string;
  symbol: string;
  name: string;
  decimals: string;
  derivedETH: string;
  totalValueLockedUSD: string;
  volumeUSD: string;
  totalSupply: string;
  tokenDayData: TokenDayData[];
};

export type Bundle = {
  ethPriceUSD: string;
};

export type QueryData = {
  tokenHourDatas: TokenHourData[];
  token: Token;
  bundle: Bundle;
};

export type UseTokenDetailsResult = {
  loading: boolean;
  error?: Error;
  token: {
    id: string;
    symbol: string;
    name: string;
    decimals: string;
    derivedETH: string;
    totalValueLockedUSD: string;
    volumeUSD: string;
    totalSupply: string;
    tokenDayData: TokenDayData[];
    currentPrice: number;
    percentChange1h: number | null;
    percentChange1d: number | null;
    fdv: number | null;
    ethPriceUSD: number;
  } | null;
};
