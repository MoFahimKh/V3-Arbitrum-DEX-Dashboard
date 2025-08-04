import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WagmiProvider } from "wagmi";
import { ApolloProvider } from "@apollo/client";
import { config } from "./config/wagmi";
import { apolloClient } from "./config/apollo";
import Index from "./pages/Index";
import TokenDetailPage from "./pages/TokenDetailPage";
import NotFound from "./pages/NotFound";
import { Layout } from "./components/ui/layout";

const queryClient = new QueryClient();

const App = () => (
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={apolloClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />

          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/token/:id" element={<TokenDetailPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </TooltipProvider>
      </ApolloProvider>
    </QueryClientProvider>
  </WagmiProvider>
);

export default App;
