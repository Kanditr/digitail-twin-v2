import React, { useState } from "react";
import cn from "classnames";
import styles from "./UploadDetails.module.sass";
import Dropdown from "../../../components/Dropdown/dropdown";
import Icon from "../../../components/Icon";
import TextInput from "../../../components/TextInput";
import Switch from "../../../components/Switch/switch";
import Preview from "./Preview/preview";
import Cards from "./Cards";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import Link from "next/link";
import Modal from "../../../components/Modal/modal";
import FolowSteps from "./FolowSteps";
import { useWeb3React } from "@web3-react/core";

import { nftaddress, nftmarketaddress } from "../../../config";

const royaltiesOptions = ["0%", "10%", "20%", "30%"];
const categoryOptions = ["Art", "Game", "Photography", "Music", "Video"];

// collection mock
// const items = [
//   {
//     title: "Create collection",
//     color: "#4BC9F0",
//   },
//   {
//     title: "Crypto Legend - Professor",
//     color: "#45B26B",
//   },
//   {
//     title: "Crypto Legend - Professor",
//     color: "#EF466F",
//   },
//   {
//     title: "Legend Photography",
//     color: "#9757D7",
//   },
// ];

// ipfs client
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0" as any);

import NFT from "../../../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../../../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

const Upload = () => {
  interface Token {
    name: string;
    description: string;
    item_url: string;
    file_url: string;
    tokenId: string | null | number;
    category: string;
    creator: string;
    ownerAddress: string[];
  }

  enum Status {
    Success = "success",
    Failed = "failed",
  }

  // const [locking, setLocking] = useState(false);
  // const [sale, setSale] = useState(true);
  const [royalties, setRoyalties] = useState(royaltiesOptions[0]) as string[];
  const [category, setCategory] = useState(categoryOptions[0]) as string[];
  const [price, setPrice] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [visiblePreview, setVisiblePreview] = useState(false);
  const [fileUrl, setFileUrl] = useState(null) as any;
  const [item, setItem] = useState({
    name: "",
    price: "",
    description: "",
    tokenId: "",
  });
  const [mintState, setMintState] = useState("pending");
  const [sellState, setSellState] = useState("disabled");

  const { account }: any = useWeb3React();

  function openModal() {
    // form validation
    const { name, description } = item;
    if (!name || !description) return alert("Please fill in required data");
    if (!fileUrl) return alert("Please upload item");
    if (!account) return alert("Please connect wallet");

    // open modal
    setVisibleModal(true);
  }

  async function uploadFile(e: any) {
    const file = e.target.files[0];
    try {
      const uploaded = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${uploaded.path}`;
      setFileUrl(url);
    } catch (e) {
      console.log(e);
    }
  }

  async function createToken() {
    const { name, description, price } = item;
    if (!name || !description || !price || !fileUrl) return;
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name,
      description,
      image: fileUrl,
    });
    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */

      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      /* next, create the item */
      let contract = new ethers.Contract(nftaddress, NFT.abi, signer);
      let transaction = await contract.createToken(url);
      let tx = await transaction.wait();
      let event = tx.events[0];
      let value = event.args[2];
      let tokenId = value.toNumber();

      setItem({
        ...item,
        tokenId: tokenId.toString(),
      });

      /* add item to database */
      const key = tokenId.toString();
      try {
        const body: Token = {
          name: item.name,
          description: item.description,
          category: category,
          item_url: url,
          file_url: fileUrl,
          tokenId: key,
          creator: account,
          ownerAddress: [account],
        };
        const res = (await fetch(`/api/item/mint`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        })) as any;
        const resBody = await res.json();
        console.log({ status: res.status, message: resBody.message });
      } catch (error) {
        console.log(error);
        return {
          status: Status.Failed,
          message: `Failed to add item no.${tokenId} to database`,
        };
      }

      return {
        status: Status.Success,
        message: `Minted item no.${tokenId}`,
      };
    } catch (error) {
      return {
        status: Status.Failed,
        message: `Failed to mint item`,
      };
    }
  }

  async function createSale(tokenId: string) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const price = ethers.utils.parseUnits(item.price, "ether");
    const token = Number(tokenId);

    try {
      /* then list the item for sale on the marketplace */
      let contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);
      let listingPrice = await contract.getListingPrice();
      listingPrice = listingPrice.toString();

      let transaction = await contract.createMarketItem(
        nftaddress,
        token,
        price,
        {
          value: listingPrice,
        }
      );
      const tx = await transaction.wait();
      let event = tx.events[3].args;
      let itemId = event.itemId.toNumber();

      /* update item in database */
      try {
        const body = {
          tokenId: item.tokenId.toString(),
          itemId: itemId,
          price: item.price,
        };
        const res = (await fetch(`/api/item/sale`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        })) as any;
        const resBody = await res.json();
        console.log({ status: res.status, message: resBody.message });
      } catch (error) {
        console.log(error);
        return {
          status: Status.Failed,
          message: `Failed to update item no.${item.tokenId} in database`,
        };
      }

      return {
        status: Status.Success,
        message: `Success create sale of tokenId.${item.tokenId} to market itemId.${itemId}`,
      };
    } catch (error) {
      return {
        status: Status.Failed,
        message: `Failed adding item no.${item.tokenId} to market`,
      };
    }
  }

  return (
    <>
      <div className={cn("section", styles.section)}>
        <div className={cn("container", styles.container)}>
          <div className={styles.wrapper}>
            <div className={styles.head}>
              <div className={cn("h2", styles.title)}>Create Digital Item</div>
              <Link href="/upload/physical" passHref>
                <button
                  className={cn("button-stroke button-small", styles.button)}
                >
                  Switch to Physical
                </button>
              </Link>
            </div>
            <form className={styles.form} action="">
              <div className={styles.list}>
                {/* file upload */}
                <div className={styles.item}>
                  <div className={styles.category}>Upload file</div>
                  <div className={styles.note}>
                    Drag or choose your file to upload
                  </div>
                  <div className={styles.file}>
                    <input
                      className={styles.load}
                      type="file"
                      onChange={uploadFile}
                    />
                    <div className={styles.icon}>
                      <Icon name="upload-file" size="24" />
                    </div>
                    <div className={styles.format}>
                      PNG, GIF, WEBP, MP4 or MP3. Max 1Gb.
                    </div>
                  </div>
                </div>
                {/* input form */}
                <div className={styles.item}>
                  <div className={styles.category}>Item Details</div>
                  <div className={styles.fieldset}>
                    <TextInput
                      className={styles.field}
                      label="Item name"
                      name="Item"
                      type="text"
                      placeholder='e. g. Redeemable Bitcoin Card with logo"'
                      onChange={(e: any) =>
                        setItem({ ...item, name: e.target.value })
                      }
                      required
                    />
                    <TextInput
                      className={styles.field}
                      label="Description"
                      name="Description"
                      type="text"
                      placeholder="e. g. “After purchasing you will able to recived the logo...”"
                      onChange={(e: any) =>
                        setItem({
                          ...item,
                          description: e.target.value,
                        })
                      }
                      required
                    />
                    <div className={styles.row}>
                      <div className={styles.col}>
                        <div className={styles.field}>
                          <div className={styles.label}>Royalties</div>
                          <Dropdown
                            className={styles.dropdown}
                            value={royalties}
                            setValue={setRoyalties}
                            options={royaltiesOptions}
                            fx={function () {}}
                          />
                        </div>
                      </div>
                      <div className={styles.col}>
                        <div className={styles.label}>Category</div>
                        <Dropdown
                          className={styles.dropdown}
                          value={category}
                          setValue={setCategory}
                          options={categoryOptions}
                          // to extract fx function
                          fx={function () {}}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* switch */}
              <div className={styles.option}>
                <div className={styles.box}>
                  <div className={styles.category}>Put on sale</div>
                  <div className={styles.text}>
                    Enter the price for which the item will be instantly sold
                  </div>
                </div>
                <Switch value={price} setValue={setPrice} />
              </div>
              {price && (
                <div className={styles.instantPrice}>
                  <TextInput
                    className={styles.field}
                    label=""
                    name="Price"
                    type="text"
                    placeholder="e. g. 10 MATIC"
                    onChange={(e: any) =>
                      setItem({
                        ...item,
                        price: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              )}
              <div className={styles.options}>
                <div className={styles.option}>
                  <div className={styles.box}>
                    <div className={styles.category}>Open for bid</div>
                    <div className={styles.text}>
                      You’ll receive bids on this item
                    </div>
                  </div>
                  <div>Coming soon</div>
                  {/* <Switch value={sale} setValue={setSale} /> */}
                </div>
                <div className={styles.option}>
                  <div className={styles.box}>
                    <div className={styles.category}>Unlockable content</div>
                    <div className={styles.text}>
                      Content will be able to unlock after successful
                      transaction
                    </div>
                  </div>
                  <div>Coming soon</div>
                  {/* <Switch value={locking} setValue={setLocking} /> */}
                </div>
                {/* <div className={styles.category}>Choose collection</div>
                <div className={styles.text}>
                  Choose an exiting collection or create a new one
                </div>
                <Cards className={styles.cards} items={items} /> */}
              </div>
              {/* foot */}
              <div className={styles.foot}>
                <button
                  className={cn("button-stroke tablet-show", styles.button)}
                  onClick={() => setVisiblePreview(true)}
                  type="button"
                >
                  Preview
                </button>
                <button
                  className={cn("button", styles.button)}
                  onClick={() => openModal()}
                  // onClick={() => createMarket()}
                  type="button"
                >
                  <span>Create item</span>
                  <Icon name="arrow-next" size="10" />
                </button>
                {/* <div className={styles.saving}>
                  <span>Auto saving</span>
                  <Loader className={styles.loader} />
                </div> */}
              </div>
            </form>
          </div>
          <Preview
            className={cn(styles.preview, {
              [styles.active]: visiblePreview,
            })}
            onClose={() => setVisiblePreview(false)}
            form={item}
            fileUrl={fileUrl}
          />
        </div>
      </div>
      <Modal visible={visibleModal} onClose={() => setVisibleModal(false)}>
        <FolowSteps
          className={styles.steps}
          visible={setVisibleModal}
          price={price}
          mintItem={createToken}
          sellItem={createSale}
          mintParent={mintState}
          mintParentFx={setMintState}
          saleParent={sellState}
          saleParentFx={setSellState}
          token={item.tokenId}
        />
      </Modal>
    </>
  );
};

export default Upload;
