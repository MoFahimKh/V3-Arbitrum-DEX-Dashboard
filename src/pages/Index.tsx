import { TokenList } from "@/components/TokenList";
import { Header } from "@/components/Header";
import SideNavBar from "@/components/SideNavBar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SideNavBar />
      <main className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Top Tokens</h1>
          <p className="text-muted-foreground">
            Uniswap V3 tokens on Arbitrum by liquidity
          </p>
        </div>
        <TokenList />
      </main>
    </div>
  );
};

export default Index;
