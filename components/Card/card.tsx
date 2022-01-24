import React, { useState } from "react";
import cn from "classnames";
import Link from "next/link";
import styles from "./Card.module.sass";
import Icon from "../Icon";
import Image from "next/image";

import { bids } from "../../mocks/bids";

const Card = ({ className, item }: any) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className={cn(styles.card, className)}>
      <div className={styles.preview}>
        <div className={styles.previewing}>
          <Image
            src={item?.file_url}
            alt="Card"
            width="85%"
            height="100%"
            layout="responsive"
            objectFit="cover"
          />
        </div>
        <div className={styles.control}>
          <div
            className={cn(
              { "status-green": bids[0].category === "green" },
              styles.category
            )}
          >
            {bids[0].categoryText}
          </div>
          <button
            className={cn(styles.favorite, { [styles.active]: visible })}
            onClick={() => setVisible(!visible)}
          >
            <Icon name="heart" size="20" />
          </button>
          <Link href={`/item/${item.id}`} passHref>
            <button className={cn("button-small", styles.button)}>
              <span>Place a bid</span>
              <Icon name="scatter-up" size="16" />
            </button>
          </Link>
        </div>
      </div>
      <Link href={`/item/${item.id}`} passHref>
        <div className={styles.link}>
          <div className={styles.body}>
            <div className={styles.line}>
              <div className={styles.title}>{item.name}</div>
              <div className={styles.price}>{item.price} Matic</div>
            </div>
            <div className={styles.line}>
              <div className={styles.users}>
                {bids[1].users.map((x: any, index: any) => (
                  <div className={styles.avatar} key={index}>
                    <img src={x.avatar} alt="Avatar" />
                  </div>
                ))}
              </div>
              <div className={styles.counter}>{bids[0].counter}</div>
            </div>
          </div>
          <div className={styles.foot}>
            <div className={styles.status}>
              <Icon name="candlesticks-up" size="20" />
              Highest bid <span>{bids[1].highestBid}</span>
            </div>
            <div
              className={styles.bid}
              dangerouslySetInnerHTML={{ __html: bids[0].bid } as any}
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
