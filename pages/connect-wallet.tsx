import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Router from "next/router";
import cn from "classnames";
import styles from "./ConnectWallet/ConnectWallet.module.sass";
import Icon from "../components/Icon";
import Checkbox from "../components/Checkbox/checkbox";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../components/wallet/connector";

const menu = [
  {
    title: "Metamask",
    color: "#9757D7",
  },
  {
    title: "Coinbase Wallet",
    color: "#3772FF",
  },
  {
    title: "MyEtherWallet",
    color: "#45B26B",
  },
  {
    title: "Wallet Connect",
    color: "#EF466F",
  },
];

const Connect = () => {
  const [age, setAge] = useState(true);
  const [conditions, setConditions] = useState(false);
  const [provider, setProvider] = useState(null) as any;

  const { activate } = useWeb3React();

  async function connect(index: any) {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
    setProvider(index);
  }

  return (
    <div className={cn("section-pt80", styles.section)}>
      <div className={cn("container", styles.container)}>
        <div className={styles.head}>
          <Link href="/">
            <button className={styles.back}>
              <Icon name="arrow-prev" size="24" />
              <div className={cn("h2", styles.stage)}>Connect your wallet</div>
            </button>
          </Link>
        </div>
        <div className={styles.body}>
          <div className={styles.menu}>
            {menu.map((x, index) => (
              <div
                className={cn(
                  { [styles.active]: index === provider },
                  styles.link
                )}
                key={index}
                onClick={async () => {
                  await connect(index);
                  Router.back();
                }}
              >
                <div
                  className={styles.icon}
                  style={{ backgroundColor: x.color }}
                >
                  <Icon name="wallet" size="24" />
                  <Icon name="check" size="18" fill={x.color} />
                </div>
                <span>{x.title}</span>
                <div className={styles.arrow}>
                  <Icon name="arrow-next" size="14" />
                </div>
              </div>
            ))}
          </div>
          <div className={styles.wrapper}>
            <div className={styles.bg}>
              <img
                srcSet="/images/content/connect-bg@2x.jpg 2x"
                src="/images/content/connect-bg.jpg"
                alt="Connect wallet"
              />
            </div>
            <button className={cn("button-stroke", styles.button)}>
              Don’t have a wallet app?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connect;
