export type Token = {
  id: string;
  symbol: string;
  name: string;
  totalValueLockedUSD: string;
  volumeUSD: string;
  derivedETH: string;
};

export type TokenRowProps = {
  token: Token;
  navigate: ReturnType<typeof import("react-router-dom").useNavigate>;
};