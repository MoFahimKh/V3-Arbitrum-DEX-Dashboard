import { gql } from "@apollo/client";

export const GET_TOKENS = gql`
  query GetTokens(
    $first: Int!
    $orderBy: String!
    $orderDirection: String!
    $where: Token_filter
  ) {
    tokens(
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
    ) {
      id
      symbol
      name
      totalValueLockedUSD
      volumeUSD
      derivedETH
    }
  }
`;

export const GET_TOKEN_BY_ID = gql`
  query GetTokenById($id: ID!) {
    token(id: $id) {
      id
      symbol
      name
      decimals
      derivedETH
      totalValueLockedUSD
      volumeUSD
      # tokenDayDatas(first: 30, orderBy: date, orderDirection: desc) { ... }  <-- REMOVE THIS
    }
    bundle(id: "1") {
      ethPriceUSD
    }
  }
`;

export const SEARCH_TOKENS = gql`
  query SearchTokens($searchTerm: String!) {
    tokens(
      first: 5
      where: {
        or: [
          { symbol_contains_nocase: $searchTerm }
          { name_contains_nocase: $searchTerm }
        ]
      }
      orderBy: totalValueLockedUSD
      orderDirection: desc
    ) {
      id
      symbol
      name
      derivedETH
      volumeUSD
    }
  }
`;

export const GET_TOKEN_DETAIL = gql`
  query GetTokenDetail($id: ID!) {
    token(id: $id) {
      id
      symbol
      name
      decimals
      derivedETH
      totalValueLockedUSD
      volumeUSD
      totalSupply
    }
    bundle(id: "1") {
      ethPriceUSD
    }
  }
`;
export const GET_TOKEN_DAY_DATAS = gql`
  query GetTokenDayDatas($id: ID!) {
    token(id: $id) {
      id
      name
      tokenDayData(first: 30, orderBy: date, orderDirection: desc) {
        date
        priceUSD
        volumeUSD
      }
    }
  }
`;
export const GET_TOKEN_DETAILS = gql`
  query GetTokenFullStats($id: ID!) {
    tokenHourDatas(
      first: 2
      orderBy: periodStartUnix
      orderDirection: desc
      where: { token: $id }
    ) {
      periodStartUnix
      priceUSD
    }
    token(id: $id) {
      id
      symbol
      name
      decimals
      derivedETH
      totalValueLockedUSD
      volumeUSD
      totalSupply
      tokenDayData(first: 2, orderBy: date, orderDirection: desc) {
        date
        priceUSD
      }
    }
    bundle(id: "1") {
      ethPriceUSD
    }
  }
`;

export const GET_TOKEN_POOLS = gql`
  query GetTokenPools($tokenId: String!) {
    pools(
      first: 5
      orderBy: totalValueLockedUSD
      orderDirection: desc
      where: { or: [{ token0: $tokenId }, { token1: $tokenId }] }
    ) {
      id
      feeTier
      totalValueLockedUSD
      volumeUSD
      token0 {
        id
        symbol
        name
      }
      token1 {
        id
        symbol
        name
      }
    }
  }
`;
