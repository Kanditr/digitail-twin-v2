import React from "react";
import cn from "classnames";
import styles from "./SuccessfullyPurchased.module.sass";
import Icon from "../../../../components/Icon";

const socials = [
  {
    title: "facebook",
    url: "/",
  },
  {
    title: "twitter",
    url: "/",
  },
  {
    title: "instagram",
    url: "/",
  },
  {
    title: "pinterest",
    url: "/",
  },
];

const SuccessfullyPurchased = ({ className }: any) => {
  return (
    <div className={cn(className, styles.wrap)}>
      <div className={cn("h2", styles.title)}>
        Yay!{" "}
        <span role="img" aria-label="firework">
          🎉
        </span>
      </div>
      <div className={styles.info}>
        You successfully purchased <span>XXX</span> from XXX
      </div>
      <div className={styles.table}>
        <div className={styles.row}>
          <div className={styles.col}>Status</div>
          <div className={styles.col}>Transaction ID</div>
        </div>
        <div className={styles.row}>
          <div className={styles.col}>Success</div>
          <div className={styles.col}>0msx836930...87r398</div>
        </div>
      </div>
      {/* <div className={styles.stage}>Go to profile</div> */}
      <div className={styles.stage}>Time to show-off</div>
      <div className={styles.socials}>
        {socials.map((x, index) => (
          <a
            className={styles.social}
            href={x.url}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
          >
            <Icon name={x.title} size="24" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default SuccessfullyPurchased;
