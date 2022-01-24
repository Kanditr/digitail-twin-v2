import React, { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./FolowSteps.module.sass";
import Icon from "../../../../components/Icon";
import Loader from "../../../../components/Loader";
import LoaderCircle from "../../../../components/LoaderCircle";
import Link from "next/link";

const FolowSteps = ({
  className,
  price,
  mintParent,
  saleParent,
  visible,
  mintItem,
  sellItem,
  token,
}: any) => {
  const [mintState, setMintState] = mintParent;
  const [sellState, setSellState] = saleParent;

  async function minting() {
    console.log("Minting...");
    setMintState("loading");

    const result = await mintItem();
    console.log(result);

    if (result.status === "failed") {
      setMintState("failed");
    }

    if (result.status === "success") {
      setMintState("done");
      setSellState("pending");
    }
  }

  const selling = async () => {
    console.log("Selling...");
    setSellState("loading");
    const result = await sellItem(token);
    console.log(result);

    if (result.status === "failed") {
      setSellState("failed");
    }

    if (result.status === "success") {
      setSellState("done");
    }
  };

  return (
    <div className={cn(className, styles.steps)}>
      <div className={cn("h4", styles.title)}>Folow steps</div>
      {!price && (
        <div className={styles.list}>
          {mintState === "pending" && (
            <Step name={mint} state={pending} onClick={() => minting()} />
          )}
          {mintState === "loading" && (
            <Step name={mint} state={loading} onClick={() => {}} />
          )}
          {mintState === "done" && (
            <Step name={mint} state={done} onClick={() => visible(false)} />
          )}
          {mintState === "failed" && (
            <Step name={mint} state={failed} onClick={() => visible(false)} />
          )}
        </div>
      )}
      {price && (
        <div className={styles.list}>
          {mintState === "pending" && (
            <Step name={mint} state={pending} onClick={() => minting()} />
          )}
          {mintState === "loading" && (
            <Step name={mint} state={loading} onClick={() => {}} />
          )}
          {mintState === "done" && (
            <Step name={mint} state={done} onClick={() => visible(false)} />
          )}
          {mintState === "failed" && (
            <Step name={mint} state={failed} onClick={() => visible(false)} />
          )}
          {sellState === "disabled" && (
            <Step name={sell} state={disabled} onClick={() => {}} />
          )}
          {sellState === "pending" && (
            <Step name={sell} state={pending} onClick={() => selling()} />
          )}
          {sellState === "loading" && (
            <Step name={sell} state={loading} onClick={() => {}} />
          )}
          {sellState === "done" && (
            <Step name={sell} state={done} onClick={() => visible(false)} />
          )}
          {sellState === "failed" && (
            <Step name={sell} state={failed} onClick={() => visible(false)} />
          )}
        </div>
      )}
      {mintState === "done" && (
        <div className={styles.note}>
          Success minted!{" "}
          <Link href="#" passHref>
            {/* [ ] to enhance logic to mint another item*/}
            mint another item
          </Link>
        </div>
      )}
      {mintState === "failed" && (
        <div className={styles.note}>
          Something went wrong, please{" "}
          <Link href="/" passHref>
            try again
          </Link>
        </div>
      )}
    </div>
  );
};

export default FolowSteps;

type Steps = {
  icon: string;
  info: string;
  text: string;
};

const mint: Steps = {
  icon: "upload-file",
  info: "Upload files & Mint token",
  text: "Call contract method",
};

const sell: Steps = {
  icon: "pencil",
  info: "Sign sell order",
  text: "Sign sell order using your wallet",
};

type State = {
  itemClass: any;
  loadIcon: boolean;
  button: string | any;
  classname: string;
};

const pending: State = {
  itemClass: cn(styles.item),
  loadIcon: false,
  button: "Start now",
  classname: "button",
};
const disabled: State = {
  itemClass: cn(styles.item),
  loadIcon: false,
  button: "Start now",
  classname: "button disabled",
};
const loading: State = {
  itemClass: cn(styles.item),
  loadIcon: true,
  button: <Loader className={styles.loader} color="white" />,
  classname: "button loading",
};
const done: State = {
  itemClass: cn(styles.item, styles.done),
  loadIcon: false,
  button: "Done",
  classname: "button done",
};
const failed: State = {
  itemClass: cn(styles.item, styles.error),
  loadIcon: false,
  button: "Failed",
  classname: "button error",
};

const Step = (props: any) => {
  const { icon, info, text } = props.name as Steps;
  const { itemClass, loadIcon, button, classname } = props.state as State;
  const { onClick } = props;
  return (
    <div className={itemClass}>
      <div className={styles.head}>
        <div className={styles.icon}>
          {!loadIcon ? (
            <Icon name={icon} size="24" />
          ) : (
            <LoaderCircle className={styles.loader} />
          )}
        </div>
        <div className={styles.details}>
          <div className={styles.info}>{info}</div>
          <div className={styles.text}>{text}</div>
        </div>
      </div>
      <button
        className={cn(classname, styles.button)}
        onClick={() => {
          onClick();
        }}
      >
        {button}
      </button>
    </div>
  );
};
