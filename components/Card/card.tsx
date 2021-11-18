import React, { useState } from "react";
import cn from "classnames";
import Link from "next/link";
import styles from "./Card.module.sass";
import Icon from "../Icon";

const Card = ({ className, item }: any) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className={cn(styles.card, className)}>
      <div className={styles.preview}>
        <div className={styles.previewing}>
          <div className={styles.previewsub}>
            <img srcSet={`${item.image2x} 2x`} src={item.image} alt="Card" />
          </div>
        </div>
        <div className={styles.control}>
          <div
            className={cn(
              { "status-green": item.category === "green" },
              styles.category
            )}
          >
            {item.categoryText}
          </div>
          <button
            className={cn(styles.favorite, { [styles.active]: visible })}
            onClick={() => setVisible(!visible)}
          >
            <Icon name="heart" size="20" />
          </button>
          <button className={cn("button-small", styles.button)}>
            <span>Place a bid</span>
            <Icon name="scatter-up" size="16" />
          </button>
        </div>
      </div>
      <Link href={item.url}>
        <div className={styles.link}>
          <div className={styles.body}>
            <div className={styles.line}>
              <div className={styles.title}>{item.title}</div>
              <div className={styles.price}>{item.price}</div>
            </div>
            <div className={styles.line}>
              <div className={styles.users}>
                {item.users.map((x: any, index: any) => (
                  <div className={styles.avatar} key={index}>
                    <img src={x.avatar} alt="Avatar" />
                  </div>
                ))}
              </div>
              <div className={styles.counter}>{item.counter}</div>
            </div>
          </div>
          <div className={styles.foot}>
            <div className={styles.status}>
              <Icon name="candlesticks-up" size="20" />
              Highest bid <span>{item.highestBid}</span>
            </div>
            <div
              className={styles.bid}
              dangerouslySetInnerHTML={{ __html: item.bid }}
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
