import { createConfig, http } from "wagmi";
import { arbitrum } from "wagmi/chains";
import { injected, metaMask, walletConnect } from "wagmi/connectors";
import { WAGMI_PROJECT_ID } from "./constants";

export const config = createConfig({
  chains: [arbitrum],
  connectors: [
    injected(),
    metaMask(),
    walletConnect({
      projectId: WAGMI_PROJECT_ID,
    }),
  ],
  transports: {
    [arbitrum.id]: http(),
  },
});
