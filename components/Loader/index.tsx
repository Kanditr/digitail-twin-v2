import React from "react";
import cn from "classnames";
import styles from "./Loader.module.sass";

const Loader = ({ className, color }: any) => {
  return (
    <div
      className={cn(styles.loader, className, {
        [styles.loaderWhite]: color === "white",
      })}
    ></div>
  );
};

export default Loader;
