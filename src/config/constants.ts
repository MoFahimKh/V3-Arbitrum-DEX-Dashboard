export const WAGMI_PROJECT_ID = "59e85e11cf1525ace6bc406ce184cf24";

export const USDC_ADDRESS = "0xaf88d065e77c8cC2239327C5EDb3A432268e5831";

export const WETH_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

export const UNISWAP_V3_ROUTER = "0xE592427A0AEce92De3Edee1F18E0157C05861564";

export const MAX_UINT256 =
  "115792089237316195423570985008687907853269984665640564039457584007913129639935";

export const USDC_ABI = [
  {
    name: "approve",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
];

export const UNISWAP_ROUTER_ABI = [
  {
    name: "exactInputSingle",
    type: "function",
    stateMutability: "payable",
    inputs: [
      {
        components: [
          { name: "tokenIn", type: "address" },
          { name: "tokenOut", type: "address" },
          { name: "fee", type: "uint24" },
          { name: "recipient", type: "address" },
          { name: "deadline", type: "uint256" },
          { name: "amountIn", type: "uint256" },
          { name: "amountOutMinimum", type: "uint256" },
          { name: "sqrtPriceLimitX96", type: "uint160" },
        ],
        name: "params",
        type: "tuple",
      },
    ],
    outputs: [{ name: "amountOut", type: "uint256" }],
  },
];

export const COINGECKO_CHART_BASE_URL =
  "https://api.coingecko.com/api/v3/coins/arbitrum-one/contract";

export const COINGECKO_ETH_PRICE_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd";

export const TOKEN_ICON_URL = (address: string) =>
  `https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/${address}/logo.png`;
