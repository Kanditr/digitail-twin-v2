import { createContext, useContext, useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";

const defaultState = { profile: {} } as any;

const AppContext = createContext(defaultState);

export function AppWrapper({ children }: any) {
  const [balance, setBalance] = useState("") as any;
  const [profile, setProfile] = useState({}) as any;

  const { account }: any = useWeb3React();

  async function getBalance() {
    if (!account) return;
    const web3 = new Web3(window.ethereum);
    const inquiry = (await web3.eth.getBalance(account)) as any;
    const balance = web3.utils.fromWei(inquiry, "ether");
    setBalance(balance);
  }

  async function getProfile(wallet: any) {
    try {
      const res = await fetch(`/api/profile/${wallet}`, {
        method: "GET",
      });
      const profileObject = await res.json();
      setProfile(profileObject);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getBalance();
    getProfile(account);
  }, [account]);

  return (
    <AppContext.Provider value={{ balance, profile }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
