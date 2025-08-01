# Neobase V3 Arbitrum DEX Dashboard

A React + Vite frontend with a basic Uniswap V3 DEX dashboard, built with the Uniswap V3 Arbitrum subgraph, wallet integration, contract interactions, and a modern UI.

## 🚀 Live Demo

_Deployed on Vercel:_
[https://your-app-url.vercel.app](https://your-app-url.vercel.app)

---

## 📂 Project Structure

- **Main Pages and components:**

  - **Tokens Listing Page**: Filter, search, and sort top tokens by liquidity or volume.
  - **Token Detail Page**: Token price chart, pool table, and token info.
  - **Wallet Actions**: Connect wallet, approve USDC, and simulate token purchase.
  - **Global Search**: Search bar in header for quick token lookup.

- **GraphQL Integration:**
  Apollo Client fetches tokens and pools from the Uniswap V3 Arbitrum subgraph.
- **Wallet Integration:**
  Connect via [wagmi](https://wagmi.sh/).
- **Smart Contract Interactions:**
  Approve USDC and simulate token purchase (WETH) via Uniswap V3 Router.

---

## 🔗 Subgraph & API

- **Subgraph Endpoint:**
  `https://gateway.thegraph.com/api/d5520cfdbbe00799c565aafa7a6d9449/subgraphs/id/3V7ZY6muhxaQL5qvntX1CFXJ32W7BxXZTGTwmpH5J4t3`
- **CoinGecko Fallback:**
  Due to missing `tokenDayDatas` in the subgraph, price history charts use CoinGecko API as fallback.

---

## 🛠️ Tech Stack & Dependencies

- **React 18 + Vite**
- **TypeScript**
- **Apollo Client** (GraphQL)
- **wagmi & viem** (wallet & contract interactions)
- **Recharts** (charting)
- **Tailwind CSS** + shadcn/ui (UI & styling)
- **Radix UI** (toast, tooltip)
- **React Router** (navigation)
- **Lucide** (icons)

**See [`package.json`](./package.json) for full list.**

---

## 📦 Installation & Setup

### 1. Clone the repo

```bash
git clone
cd uniswap-v3-arbitrum-dashboard
```

### 2. Install dependencies

```bash
pnpm install
# or
yarn install
```

### 3. Run the local dev server

```bash
pnpm run dev
# or
yarn dev
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

### 4. Build for production

```bash
npm run build
npm run preview
```

---

## ✨ Features & Implementation Notes

### 1. Tokens Listing Page

- Fetches top 50 tokens (50 for task's purpose) by liquidity from the Uniswap V3 Arbitrum subgraph.
- Search and filter tokens by symbol/name.
- Sort by **TVL** by clicking on the title on table.
- Table columns: Symbol, Name, Price (in USD), FDV, Volume, 1H/1D % changes (mocked), Sparkline (mocked).

### 2. Token Detail Page

- Displays token price chart (CoinGecko fallback for historical price).
- Shows top pools for the selected token (via subgraph).
- Pool info: Pair, Protocol, Fee Tier, TVL, Pool APR.
- User's USDC balance fetched live (erc20 on Arbitrum).
- Responsive layout with dropdown actions.

### 3. Wallet & Contract Interactions

- Connect wallet (wagmi/viem).
- Approve max USDC to Uniswap V3 router (`0xe592427a0AEce92De3Edee1F18E0157C05861564`).
- Simulate token purchase: Calls Uniswap's `exactInputSingle` with 0.001 USDC for the selected token.

### 4. Global Search

- Persistent search bar in the top navigation.
- Instant search and navigation to token detail pages.

### 5. Error Handling & Fallbacks

- If subgraph token historical data is unavailable, falls back to CoinGecko API for price chart.
- All major sections have loading and error UI.

---

## ⚡ How to Use

1. **Connect your wallet** (MetaMask or any EVM wallet).
2. **Browse top tokens**: Use search or filters on the Tokens page.
3. **Click a token** to see price chart, pool info, and interact with pools.
4. **Approve USDC & simulate a buy**: Use the wallet actions panel.
5. **Search from the top bar** to quickly find any token.

---

## 📝 Assumptions & Limitations

- **Token price history:**
  The provided subgraph was missing the `tokenDayDatas` entity, so historical price is fetched from CoinGecko as a fallback.
- **Pool APR** and some on-chain values are mocked or displayed if available.
- **Sparklines and percent changes** are mock data (can be replaced if subgraph supports these fields).

---

## 📄 Project Structure

```
src/
  components/     # Reusable UI components (tables, charts, search)
  pages/          # Page components (TokenList, TokenDetail)
  hooks/          # Custom hooks (e.g. useTokenData)
  queries/        # GraphQL queries
  utils/          # Utility functions (e.g. fetchEthPrice, CoinGecko)
  App.tsx         # Main app layout & routing
  main.tsx        # Entry point
  ...
```

---

## 🧑‍💻 Code Quality

- TypeScript, ESLint, modular React components.
- Clear folder structure.
- Loading skeletons & error boundaries for all async UI.
- Responsive and accessible UI (shadcn, Tailwind).

---

## 🚧 Future Improvements

- We could implement pagination on the `TokenList` component.
- While there’s a scope for frontend optimization and advanced features, time constraints and ongoing commitments at our current organization limited further development. We look forward to implementing these enhancements in the future.

## 📬 Contact & Submission

- **GitHub:** [URL](URL)
- **Deployed App:** [URL](URL)

Please reach out if you have questions!

---

**Thanks for reviewing! looking forward for your response and working with the team!** 🚀
