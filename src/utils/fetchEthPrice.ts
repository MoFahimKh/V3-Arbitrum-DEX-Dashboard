import { COINGECKO_ETH_PRICE_URL } from "@/config/constants";

export const fetchEthPrice = async () => {
  try {
    const res = await fetch(COINGECKO_ETH_PRICE_URL);
    const data = await res.json();
    return data.ethereum.usd;
  } catch (error) {
    console.error("Error fetching ETH price:", error);
    return null;
  }
};
