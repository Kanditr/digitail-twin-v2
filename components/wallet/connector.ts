import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";


export const injected = new InjectedConnector({
    supportedChainIds: [1 ,3, 4 ,5 ,42, 1337, 80001],
})