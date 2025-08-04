import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: "https://gateway.thegraph.com/api/d5520cfdbbe00799c565aafa7a6d9449/subgraphs/id/FbCGRftH4a3yZugY7TnbYgPJVEv2LvMT6oF1fxPe9aJM",
  cache: new InMemoryCache(),
});
