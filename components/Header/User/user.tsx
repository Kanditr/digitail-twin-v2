import React, { useState } from "react";
import Link from "next/link";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./User.module.sass";
import Icon from "../../Icon";
import Theme from "../../Theme";
import { injected } from "../../wallet/connector";
import { useWeb3React } from "@web3-react/core";

const items = [
  {
    title: "My profile",
    icon: "user",
    url: "/profile",
  },
  {
    title: "My items",
    icon: "image",
    url: "/item",
  },
  {
    title: "Dark theme",
    icon: "bulb",
  },
  {
    title: "Disconnect",
    icon: "exit",
    url: "http/",
    click: true,
  },
];

const User = ({ className }: any) => {
  const [visible, setVisible] = useState(false);

  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  var firstAcc = account?.slice(0, 14);
  var lastAcc = account?.slice(account.length - 4);

  async function disconnect() {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  }

  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div className={cn(styles.user, className)}>
        <div className={styles.head} onClick={() => setVisible(!visible)}>
          <div className={styles.avatar}>
            <img src="/images/content/avatar-user.jpg" alt="Avatar" />
          </div>
          <div className={styles.wallet}>
            7.00698 <span className={styles.currency}>ETH</span>
          </div>
        </div>
        {visible && (
          <div className={styles.body}>
            <div className={styles.name}>Enrico Cole</div>
            <div className={styles.code}>
              <div className={styles.number}>
                {firstAcc}...{lastAcc}
              </div>
              <button className={styles.copy}>
                <Icon name="copy" size="16" />
              </button>
            </div>
            <div className={styles.wrap}>
              <div className={styles.line}>
                <div className={styles.preview}>
                  <img
                    src="/images/content/etherium-circle.jpg"
                    alt="Etherium"
                  />
                </div>
                <div className={styles.details}>
                  <div className={styles.info}>Balance</div>
                  <div className={styles.price}>4.689 ETH</div>
                </div>
              </div>
              <button
                className={cn("button-stroke button-small", styles.button)}
              >
                Manage fun on Coinbase
              </button>
            </div>
            <div className={styles.menu}>
              {items.map((x, index) =>
                x.url ? (
                  x.click === true ? (
                    <a
                      className={styles.item}
                      rel="noopener noreferrer"
                      key={index}
                      onClick={disconnect}
                    >
                      <div className={styles.icon}>
                        <Icon name={x.icon} size="20" />
                      </div>
                      <div className={styles.text}>{x.title}</div>
                    </a>
                  ) : (
                    <Link href={x.url} key={index}>
                      <div
                        className={styles.item}
                        onClick={() => setVisible(!visible)}
                      >
                        <div className={styles.icon}>
                          <Icon name={x.icon} size="20" />
                        </div>
                        <div className={styles.text}>{x.title}</div>
                      </div>
                    </Link>
                  )
                ) : (
                  <div className={styles.item} key={index}>
                    <div className={styles.icon}>
                      <Icon name={x.icon} size="20" />
                    </div>
                    <div className={styles.text}>{x.title}</div>
                    <Theme className={styles.theme} />
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
};

export default User;
