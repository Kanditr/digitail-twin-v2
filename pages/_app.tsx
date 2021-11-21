// import "../styles/globals.css";
import type { AppProps } from "next/app";
import "../styles/app.sass";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";
import MetamaskProvider from "../components/wallet/provider";

function getLibrary(provider: any) {
  return new Web3(provider);
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      {/* <MetamaskProvider> */}
      <Component {...pageProps} />
      {/* </MetamaskProvider> */}
    </Web3ReactProvider>
  );
}

export default MyApp;
