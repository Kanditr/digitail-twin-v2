import React from "react";
import cn from "classnames";
import styles from "./Player.module.sass";
import Icon from "../Icon";
import Image from "next/image";

const Player = ({ className, item }: any) => {
  return (
    <div className={cn(styles.player, className)}>
      <div className={styles.preview}>
        <Image
          src={item.image2x}
          alt="Video preview"
          width="85%"
          height="100%"
          layout="responsive"
          objectFit="cover"
        />
        <div className={styles.control}>
          <button className={cn(styles.button, styles.play)}>
            <Icon name="play" size="24" />
          </button>
          <div className={styles.line}>
            <div className={styles.progress} style={{ width: "20%" }}></div>
          </div>
          <div className={styles.time}>2:20</div>
          <button className={styles.button}>
            <Icon name="volume" size="24" />
          </button>
          <button className={styles.button}>
            <Icon name="full-screen" size="24" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Player;
