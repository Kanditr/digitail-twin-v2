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

  const handleSubmit = (e: void) => {
    alert();
  };

  const { active, account, library, connector, activate, deactivate }: any =
    useWeb3React();

  async function getUserProfile() {
    const web3 = new Web3(window.ethereum);
    const inquiry = (await web3.eth.getBalance(account)) as any;
    const balance = web3.utils.fromWei(inquiry, "ether");

    const docRef = doc(db, "users", account);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setUser({
        ...user,
        balance,
        profile_username: docSnap.data().profile_username,
        profile_image: docSnap.data().profile_image,
      });
    } else {
      console.log("No such document!");
      setUser({
        ...user,
        profile_image: "/images/content/no-user.jpeg",
        profile_username: "No profile",
        balance,
      });
    }
  }

  async function getChangeProfile() {
    const web3 = new Web3(window.ethereum);
    const inquiry = (await web3.eth.getBalance(account)) as any;
    const balance = web3.utils.fromWei(inquiry, "ether");

    const docRef = doc(db, "users", account);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setUser({
        ...user,
        balance,
        profile_username: docSnap.data().profile_username,
        profile_image: docSnap.data().profile_image,
      });
    } else {
      console.log("No such document!");
      setUser({
        ...user,
        profile_image: "/images/content/no-user.jpeg",
        profile_username: "No profile",
        balance,
      });
    }
    setChange(false);
  }

  // load account
  if (loadAccount === true) {
    if (active === true) {
      getUserProfile();
      setLoadAccount(false);
    }
  }

  const [current, setCurrent] = useState(account);

  // change
  if (change === true) {
    if (account !== current) {
      setCurrent(account);
      getChangeProfile().then(() => setChange(false));
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
          <User className={styles.user} user={user} wallet={account} />
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
