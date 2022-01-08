import React from "react";
import styles from "./Skeleton.module.sass";
import SkeletonElement from "./skeletonElement";
import Shimmer from "./shimmer";

const SkeletonCard = () => {
  return (
    <>
      <div className={styles.skeletonCard}>
        <SkeletonElement classname={styles.preview} />
        <SkeletonElement classname={styles.title} />
        <SkeletonElement classname={styles.text} />
        <Shimmer />
      </div>
    </>
  );
};

export default SkeletonCard;
