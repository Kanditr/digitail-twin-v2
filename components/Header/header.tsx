import React, { useEffect, useState } from "react";
import Link from "next/link";
import cn from "classnames";
import styles from "./Header.module.sass";
import Icon from "../Icon";
import Notification from "./Notification/notification";
import User from "./User/user";
import { useWeb3React } from "@web3-react/core";

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

  const handleSubmit = (e: void) => {
    alert();
  };

  const { active }: any = useWeb3React();

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
          <User className={styles.user} />
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
