import React from "react";
import cn from "classnames";
import styles from "./Items.module.sass";
import Card from "../../../components/Card/card";
import Loader from "../../../components/Loader/loader";

const Items = ({ className, items }: any) => {
  return (
    <div className={cn(styles.items, className)}>
      <div className={styles.list}>
        {(items || []).map((x: any, index: any) => (
          <Card className={styles.card} item={x} key={index} />
        ))}
      </div>
      {/* <Loader className={styles.loader} /> */}
    </div>
  );
};

export default Items;
