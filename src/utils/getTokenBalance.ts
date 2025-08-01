import { fetchBalance } from "@wagmi/core";
import { config } from "@/config/wagmi";

export async function getTokenBalance(
  address: `0x${string}`,
  tokenAddress: `0x${string}`
) {
  try {
    const balance = await fetchBalance(config, {
      address: address,
      token: tokenAddress,
    });
    return balance;
  } catch (error) {
    return null;
  }
}
