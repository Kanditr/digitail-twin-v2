import React, { useState } from "react";
import cn from "classnames";
import styles from "./Checkout.module.sass";
import Icon from "../../../../components/Icon";
import LoaderCircle from "../../../../components/LoaderCircle";
import Item from "../..";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import SuccessfullyPurchased from "../SuccessfullyPurchased/successfullyPurchased";

import NFT from "../../../../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../../../../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

const Checkout = ({ className, item, id }: any) => {
  const items = [
    {
      title: `${item.price || null}`,
      value: "MATIC",
    },
    {
      title: "Your balance",
      value: "8.498 MATIC",
    },
    {
      title: "Service fee",
      value: "0 MATIC",
    },
    {
      title: "You will pay",
      value: `${item.price || null}` + " MATIC",
    },
  ];

  const [buying, setBuying] = useState(false);
  const [success, setSuccess] = useState(false);

  function buyNftei() {
    setBuying(true);
  }

  async function buyNft() {
    setBuying(true);
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_NFT_MARKET_ADDRESS as string,
      Market.abi,
      signer
    );

    const price = ethers.utils.parseUnits(item.price.toString(), "ether");

    const transaction = await contract.createMarketSale(
      process.env.NEXT_PUBLIC_NFT_ADDRESS as string,
      item.tokenId,
      {
        value: price,
      }
    );
    await transaction.wait();

    // update isSold to database
    const itemRef = doc(db, "items", id);
    await updateDoc(itemRef, {
      isSold: true,
    });

    setSuccess(true);

    // loadNFTs();
  }

  return (
    <div className={cn(className, styles.checkout)}>
      {success === false ? (
        <>
          <div className={cn("h4", styles.title)}>Checkout</div>
          <div className={styles.info}>
            You are about to purchase <strong>XXX</strong> from{" "}
            <strong>XXX</strong>
          </div>
          <div className={styles.table}>
            {items.map((x, index) => (
              <div className={styles.row} key={index}>
                <div className={styles.col}>{x.title}</div>
                <div className={styles.col}>{x.value}</div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
      {/* <div className={styles.attention}>
        <div className={styles.preview}>
          <Icon name="info-circle" size="32" />
        </div>
        <div className={styles.details}>
          <div className={styles.subtitle}>This creator is not verified</div>
          <div className={styles.text}>Purchase this item at your own risk</div>
        </div>
      </div> */}
      {/* <div className={cn("h4", styles.title)}>Follow steps</div> */}

      {/* <div className={styles.attention}>
        <div className={styles.preview}>
          <Icon name="info-circle" size="32" />
        </div>
        <div className={styles.details}>
          <div className={styles.subtitle}>This creator is not verified</div>
          <div className={styles.text}>Purchase this item at your own risk</div>
        </div>
        <div className={styles.avatar}>
          <img src="/images/content/avatar-3.jpg" alt="Avatar" />
        </div>
      </div> */}
      {buying === false ? (
        <div className={styles.btns}>
          <button className={cn("button", styles.button)} onClick={buyNft}>
            I understand, continue
          </button>
          {/* <button className={cn("button-stroke", styles.button)}>Cancel</button> */}
        </div>
      ) : success === false ? (
        <div className={styles.line}>
          <div className={styles.icon}>
            <LoaderCircle className={styles.loader} />
          </div>
          <div className={styles.details}>
            <div className={styles.subtitle}>Purchasing</div>
            <div className={styles.text}>
              Sending transaction with your wallet
            </div>
          </div>
        </div>
      ) : (
        <SuccessfullyPurchased />
      )}
    </div>
  );
};

export default Checkout;
