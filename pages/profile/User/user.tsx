import React, { useState } from "react";
import cn from "classnames";
import styles from "./User.module.sass";
import Icon from "../../../components/Icon";
import Report from "../../../components/Report/report";
import Modal from "../../../components/Modal/modal";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import Link from "next/link";
// import { isStepDivisible } from "react-range/lib/utils";

const shareUrlFacebook = "/";
const shareUrlTwitter = "/";

const User = ({ className, item, profile, wallet }: any) => {
  const [visible, setVisible] = useState(false);
  const [visibleShare, setVisibleShare] = useState(false);
  const [visibleModalReport, setVisibleModalReport] = useState(false);

  var firstAcc = wallet?.slice(0, 14);
  var lastAcc = wallet?.slice(wallet.length - 4);

  return (
    <>
      <div className={cn(styles.user, className)}>
        <div className={styles.avatar}>
          <img src={profile.profile_image} alt="Avatar" />
        </div>
        <div className={styles.name}>{profile.profile_username}</div>
        {/* account */}
        <div className={styles.code}>
          <div className={styles.number}>
            {firstAcc}...{lastAcc}
          </div>
          <button className={styles.copy}>
            <Icon name="copy" size="16" />
          </button>
        </div>
        <div className={styles.info}>
          A wholesome farm owner in Montana. Upcoming gallery solo show in
          Germany
        </div>
        <Link
          href="/"
          // target="_blank"
          // rel="noopener noreferrer"
        >
          <div className={styles.site}>
            <Icon name="globe" size="16" />
            <span>https://localhost:3000/</span>
          </div>
        </Link>
        <div className={styles.control}>
          <div className={styles.btns}>
            {/* follow */}
            <button
              className={cn(
                "button button-small",
                { [styles.active]: visible },
                styles.button
              )}
              onClick={() => setVisible(!visible)}
            >
              <span>Follow</span>
              <span>Unfollow</span>
            </button>
            {/* share */}
            <button
              className={cn(
                "button-circle-stroke button-small",
                { [styles.active]: visibleShare },
                styles.button
              )}
              onClick={() => setVisibleShare(!visibleShare)}
            >
              <Icon name="share" size="20" />
            </button>
            <button
              className={cn("button-circle-stroke button-small", styles.button)}
              onClick={() => setVisibleModalReport(true)}
            >
              <Icon name="report" size="20" />
            </button>
          </div>
          {/* share */}
          <div className={cn(styles.box, { [styles.active]: visibleShare })}>
            <div className={styles.stage}>Share link to this page</div>
            <div className={styles.share}>
              <TwitterShareButton
                className={styles.direction}
                url={shareUrlTwitter}
              >
                <span>
                  <Icon name="twitter" size="20" />
                </span>
              </TwitterShareButton>
              <FacebookShareButton
                className={styles.direction}
                url={shareUrlFacebook}
              >
                <span>
                  <Icon name="facebook" size="20" />
                </span>
              </FacebookShareButton>
            </div>
          </div>
        </div>
        {/* social */}
        <div className={styles.socials}>
          {(item || []).map((x: any, index: any) => (
            // <a
            //   className={styles.social}
            //   href={x.url}
            //   target="_blank"
            //   rel="noopener noreferrer"
            //   key={index}
            // >
            <Icon name={x.title} size="20" key={index} />
            // </a>
          ))}
        </div>
        <div className={styles.note}>Member since Mar 15, 2021</div>
      </div>
      <Modal
        visible={visibleModalReport}
        onClose={() => setVisibleModalReport(false)}
      >
        <Report />
      </Modal>
    </>
  );
};

export default User;
