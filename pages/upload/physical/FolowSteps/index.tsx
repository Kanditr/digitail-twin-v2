import React from "react";
import cn from "classnames";
import styles from "./FolowSteps.module.sass";
import Icon from "../../../../components/Icon";
import Loader from "../../../../components/Loader/";
import LoaderCircle from "../../../../components/LoaderCircle";
import Link from "next/link";

const FolowSteps = ({ className }: any) => {
  return (
    <div className={cn(className, styles.steps)}>
      <div className={cn("h4", styles.title)}>Folow steps</div>
      <div className={styles.list}>
        <div className={cn(styles.item, styles.done)}>
          <div className={styles.head}>
            <div className={styles.icon}>
              <Icon name="upload-file" size="24" />
            </div>
            <div className={styles.details}>
              <div className={styles.info}>Upload files & Mint token</div>
              <div className={styles.text}>Call contract method</div>
            </div>
          </div>
          <button className={cn("button done", styles.button)}>Done</button>
        </div>
        <div className={styles.item}>
          <div className={styles.head}>
            <div className={styles.icon}>
              <Icon name="pencil" size="24" />
            </div>
            <div className={styles.details}>
              <div className={styles.info}>Sign sell order</div>
              <div className={styles.text}>
                Sign sell order using your wallet
              </div>
            </div>
          </div>
          <button className={cn("button disabled", styles.button)}>
            Start now
          </button>
        </div>
        <div className={styles.item}>
          <div className={styles.head}>
            <div className={styles.icon}>
              <LoaderCircle className={styles.loader} />
            </div>
            <div className={styles.details}>
              <div className={styles.info}>Sign sell order</div>
              <div className={styles.text}>
                Sign sell order using your wallet
              </div>
            </div>
          </div>
          <button className={cn("button loading", styles.button)}>
            <Loader className={styles.loader} color="white" />
          </button>
        </div>
        <div className={cn(styles.item, styles.error)}>
          <div className={styles.head}>
            <div className={styles.icon}>
              <Icon name="pencil" size="24" />
            </div>
            <div className={styles.details}>
              <div className={styles.info}>Sign sell order</div>
              <div className={styles.text}>
                Sign sell order using your wallet
              </div>
            </div>
          </div>
          <button className={cn("button error", styles.button)}>Failed</button>
        </div>
        <div className={styles.item}>
          <div className={styles.head}>
            <div className={styles.icon}>
              <Icon name="bag" size="24" />
            </div>
            <div className={styles.details}>
              <div className={styles.info}>Sign lock order</div>
              <div className={styles.text}>
                Sign lock order using your wallet
              </div>
            </div>
          </div>
          <button className={cn("button", styles.button)}>Start now</button>
        </div>
      </div>
      <div className={styles.note}>
        Something went wrong, please{" "}
        <Link href="/#" passHref>
          try again
        </Link>
      </div>
    </div>
  );
};

export default FolowSteps;
