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

const Headers = (single: any) => {
  const [visibleNav, setVisibleNav] = useState(false);
  const [search, setSearch] = useState("");
  const [loadAccount, setLoadAccount] = useState(true);
  const [user, setUser] = useState({
    profile_image: "/images/content/no-user.jpeg",
    profile_username: "No profile",
    balance: null,
  }) as any;

  // console.log(single.single.profile_username);

  const handleSubmit = (e: void) => {
    alert();
  };

  // if (Object.keys(profile.user).length === 0) {
  //   console.log("empty");
  // } else {
  //   setUser({ ...user, profile_image: profile.user.image });
  //   console.log(profile);
  // }

  const { active, account, library, connector, activate, deactivate }: any =
    useWeb3React();

  // const thisUser = single.single.profile_username;
  // console.log(thisUser);

  async function getUserBalance() {
    const web3 = new Web3(window.ethereum);
    const inquiry = (await web3.eth.getBalance(account)) as any;
    const balance = web3.utils.fromWei(inquiry, "ether");
    // console.log(thisUser);
    setUser({
      ...user,
      // profile_username: thisUser,
      balance,
    });

    // console.log(user);

    // if (Object.keys(profile.user).length === 0) {
    //   console.log("empty");
    // } else {
    //   setUser({
    //     ...user,
    //     profile_image: profile.user.profile_image,
    // profile_username: profile.user.profile_username,
    // profile_username: "have profile",
    // });
    // console.log(profile);
    // }
  }
  // console.log(profile.user.profile_username);

  // load account
  if (loadAccount === true) {
    if (active === true) {
      getUserBalance();
      setLoadAccount(false);
    }
  }

  useEffect(() => {
    // change account
    let isAccountChanged = true;
    const web3 = new Web3(window.ethereum);
    window.ethereum.on("accountsChanged", async (accounts: any) => {
      if (isAccountChanged === true) {
        const inquiry = (await web3.eth.getBalance(accounts[0])) as any;
        const balance = web3.utils.fromWei(inquiry, "ether");
        setUser({ ...user, balance });
      }
    });
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
              <Link
                // activeClassName={styles.active}
                href={x.url}
                key={index}
              >
                <button className={styles.link}>{x.title}</button>
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
          <User className={styles.user} user={user} single={single} />
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
