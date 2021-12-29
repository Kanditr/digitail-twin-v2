import React, { useState } from "react";
import Link from "next/link";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./User.module.sass";
import Icon from "../../Icon";
import Theme from "../../Theme";
import { useWeb3React } from "@web3-react/core";
import { useAppContext } from "../../../components/context/user";

const User = ({ className }: any) => {
  const [visible, setVisible] = useState(false);

  const { balance, profile } = useAppContext();

  var firstAcc = profile.req?.slice(0, 14);
  var lastAcc = profile.req?.slice(profile.req.length - 4);

  var userBalance = balance?.slice(0, 7);
  var userBalanceFour = balance?.slice(0, 5);

  const { deactivate } = useWeb3React();

  async function disconnect() {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  }

  const items = [
    {
      title: "My profile",
      icon: "user",
      url: `/profile/${profile.req}`,
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

  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div className={cn(styles.user, className)}>
        <div className={styles.head} onClick={() => setVisible(!visible)}>
          <div className={styles.avatar}>
            {profile.profile_image ? (
              <img src={profile.profile_image} alt="Avatar" />
            ) : (
              <img src="/images/content/no-user.jpeg" alt="Avatar" />
            )}
          </div>
          <div className={styles.wallet}>
            {userBalance} <span className={styles.currency}>MATIC</span>
          </div>
        </div>
        {visible && (
          <div className={styles.body}>
            <div className={styles.name}>{profile.profile_username}</div>
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
                  <img src="/images/content/matic-token.png" alt="Etherium" />
                </div>
                <div className={styles.details}>
                  <div className={styles.info}>Balance</div>
                  <div className={styles.price}>{userBalanceFour} MATIC</div>
                </div>
              </div>
              <button
                className={cn("button-stroke button-small", styles.button)}
              >
                Manage fun on Metamask
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
