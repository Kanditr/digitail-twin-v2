import React, { useEffect, useState } from "react";
import Link from "next/link";
import cn from "classnames";
import styles from "./Header.module.sass";
import Icon from "../Icon";
import Image from "../Image";
import Notification from "./Notification/notification";
import User from "./User/user";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const nav = [
  {
    url: "/explore",
    title: "Explore",
  },
  {
    url: "/faq",
    title: "How it work",
  },
  {
    url: "/item",
    title: "Create item",
  },
  {
    url: "/profile",
    title: "Profile",
  },
];

const Headers = () => {
  const [visibleNav, setVisibleNav] = useState(false);
  const [search, setSearch] = useState("");
  const [loadAccount, setLoadAccount] = useState(true);
  const [change, setChange] = useState(false);
  const [user, setUser] = useState({
    profile_image: "/images/content/no-user.jpeg",
    profile_username: "No profile",
    balance: null,
  }) as any;
  const [profile, setProfile] = useState({}) as any;
  const [balance, setBalance] = useState("") as any;

  const handleSubmit = (e: void) => {
    alert();
  };

  const { active, account, library, connector, activate, deactivate }: any =
    useWeb3React();

  async function getBalance() {
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

  async function getChangeProfile(account: any) {
    getBalance();
    getProfile(account);

    setChange(false);
  }

  // load account
  if (loadAccount === true) {
    if (active === true) {
      getProfile(account);
      getBalance();
      setLoadAccount(false);
    }
  }

  const [current, setCurrent] = useState(account);

  // change
  if (change === true) {
    if (account !== current) {
      setCurrent(account);
      getChangeProfile(account).then(() => setChange(false));
    }
  }

  useEffect(() => {
    // change account
    let isAccountChanged = true;
    if (
      typeof window.ethereum !== "undefined" ||
      typeof window.web3 !== "undefined"
    ) {
      window.ethereum.on("accountsChanged", async (accounts: any) => {
        setChange(true);
        if (isAccountChanged === true) {
        }
      });
    }
    return () => {
      isAccountChanged = false;
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={cn("container", styles.container)}>
        <Link href="/">
          <button className={styles.logo}>Digital Twin</button>
        </Link>
        <div className={cn(styles.wrapper, { [styles.active]: visibleNav })}>
          <nav className={styles.nav}>
            {nav.map((x, index) => (
              <Link href={x.url} key={index}>
                <button
                  className={styles.link}
                  onClick={() => setVisibleNav(false)}
                >
                  {x.title}
                </button>
              </Link>
            ))}
          </nav>
          <form
            className={styles.search}
            action=""
            onSubmit={() => handleSubmit()}
          >
            <input
              className={styles.input}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              name="search"
              placeholder="Search"
              required
            />
            <button className={styles.result}>
              <Icon name="search" size="20" />
            </button>
          </form>
          <Link href="/upload">
            <button className={cn("button-small", styles.button)}>
              Upload
            </button>
          </Link>
        </div>
        <Notification className={styles.notification} />
        <Link href="/upload">
          <button className={cn("button-small", styles.button)}>Upload</button>
        </Link>
        {active === true ? (
          <User
            className={styles.user}
            user={profile}
            wallet={account}
            balance={balance}
          />
        ) : (
          <Link href="/connect-wallet">
            <button className={cn("button-stroke button-small", styles.button)}>
              Connect Wallet
            </button>
          </Link>
        )}
        <button
          className={cn(styles.burger, { [styles.active]: visibleNav })}
          onClick={() => setVisibleNav(!visibleNav)}
        ></button>
      </div>
    </header>
  );
};

export default Headers;
