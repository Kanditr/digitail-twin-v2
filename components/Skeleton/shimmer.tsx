import React from "react";
import styles from "./Skeleton.module.sass";

const Shimmer = () => {
  return (
    <div className={styles.shimmerWrapper}>
      <div className={styles.shimmer}></div>
    </div>
  );
};

export default Shimmer;
