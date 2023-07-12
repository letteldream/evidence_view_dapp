import React, { useEffect, useState } from "react";
import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";
import { WagmiConfig, configureChains, createClient } from "wagmi";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { Web3Modal } from "@web3modal/react";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { gnosisChiado } from "wagmi/chains";
import { store } from "../redux/store";
import MintLayout from "../components/layouts/mint-layout";

const chains = [gnosisChiado];

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ version: 1, chains, projectId }),
  provider,
});

const queryClient = new QueryClient();
const ethereumClient = new EthereumClient(wagmiClient, chains);

const MyApp = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout || ((page) => page);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <div>
      <NextNProgress
        color="#F0E68C"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
      {ready ? (
        <WagmiConfig client={wagmiClient}>
          <SnackbarProvider maxSnack={3}>
            <QueryClientProvider client={queryClient}>
              <Provider store={store}>
                {getLayout(<Component {...pageProps} />)}
              </Provider>
              
            </QueryClientProvider>
          </SnackbarProvider>
        </WagmiConfig>
      ) : null}
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </div>
  );
};

export default MyApp;
