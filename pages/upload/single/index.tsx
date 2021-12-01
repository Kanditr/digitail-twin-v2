import React, { useState } from "react";
import cn from "classnames";
import styles from "./UploadDetails.module.sass";
import Dropdown from "../../../components/Dropdown/dropdown";
import Icon from "../../../components/Icon";
import TextInput from "../../../components/TextInput";
import Switch from "../../../components/Switch/switch";
// import Loader from "../components/Loader/loader";
// import Modal from "../components/Modal/modal";
import Preview from "./Preview/preview";
import Cards from "./Cards";
// import FolowSteps from "./UploadDetails/FolowSteps";
import Headers from "../../../components/Header/header";
import Footers from "../../../components/Footer/footer";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { db } from "../../../firbase";
import { collection, addDoc } from "firebase/firestore";

const royaltiesOptions = ["10%", "20%", "30%"];

const items = [
  {
    title: "Create collection",
    color: "#4BC9F0",
  },
  {
    title: "Crypto Legend - Professor",
    color: "#45B26B",
  },
  {
    title: "Crypto Legend - Professor",
    color: "#EF466F",
  },
  {
    title: "Legend Photography",
    color: "#9757D7",
  },
];

// ipfs client
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0" as any);

const nftaddress = process.env.NEXT_PUBLIC_NFT_ADDRESS;
const nftmarketaddress = process.env.NEXT_PUBLIC_NFT_MARKET_ADDRESS;

import NFT from "../../../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../../../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

const Upload = () => {
  // royalty
  const [royalties, setRoyalties] = useState(royaltiesOptions[0]) as string[];
  // switch
  const [sale, setSale] = useState(true);
  const [price, setPrice] = useState(false);
  const [locking, setLocking] = useState(false);
  // follow step modal
  const [visibleModal, setVisibleModal] = useState(false);
  // preview modal
  const [visiblePreview, setVisiblePreview] = useState(false);

  // input form state
  const [fileUrl, setFileUrl] = useState(null) as any;
  const [formInput, updateFormInput] = useState({
    price: "",
    name: "",
    description: "",
  }) as any;

  // router
  const router = useRouter();

  // create file ipfs url
  async function onChange(e: any) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
    } catch (e) {
      console.log(e);
    }
  }

  // create item (include file url) ipfs url
  async function createItem() {
    const { name, description, price } = formInput;
    if (!name || !description || !price || !fileUrl) return;
    const data = JSON.stringify({
      name,
      description,
      image: fileUrl,
    });

    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      createSale(url);
    } catch (error) {
      console.log("Error uploading file:", error);
    }
  }

  // create sale
  async function createSale(url: any) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    // createToken - mint Token
    let contract = new ethers.Contract(nftaddress as string, NFT.abi, signer);
    let transaction = await contract.createToken(url);
    let tx = await transaction.wait();

    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber();

    const price = ethers.utils.parseUnits(formInput.price, "ether");

    // createMarketItem - put on sale
    contract = new ethers.Contract(
      nftmarketaddress as string,
      Market.abi,
      signer
    );
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();

    transaction = await contract.createMarketItem(nftaddress, tokenId, price, {
      value: listingPrice,
    });
    await transaction.wait();

    // add data to firestore
    try {
      const docRef = await addDoc(collection(db, "items"), {
        price: formInput.price,
        name: formInput.name,
        description: formInput.description,
        item_url: url,
        file_url: fileUrl,
        tokenId: tokenId,
        isSold: false,
      });
      console.log("Document written with ID: ", docRef.id);
      router.push(`/item/${docRef.id}`);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <>
      <Headers />
      <div className={cn("section", styles.section)}>
        <div className={cn("container", styles.container)}>
          <div className={styles.wrapper}>
            <div className={styles.head}>
              <div className={cn("h2", styles.title)}>
                Create single collectible
              </div>
              <button
                className={cn("button-stroke button-small", styles.button)}
              >
                Switch to Multiple
              </button>
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
                      onChange={onChange}
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
                        updateFormInput({ ...formInput, name: e.target.value })
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
                        updateFormInput({
                          ...formInput,
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
                          />
                        </div>
                      </div>
                      <div className={styles.col}>
                        <TextInput
                          className={styles.field}
                          label="Price"
                          name="Price"
                          type="text"
                          placeholder="e. g. 10 MATIC"
                          onChange={(e: any) =>
                            updateFormInput({
                              ...formInput,
                              price: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className={styles.col}>
                        <TextInput
                          className={styles.field}
                          label="Propertie"
                          name="Propertie"
                          type="text"
                          placeholder="e. g. Propertie"
                          // required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* switch */}
              <div className={styles.options}>
                <div className={styles.option}>
                  <div className={styles.box}>
                    <div className={styles.category}>Put on sale</div>
                    <div className={styles.text}>
                      You’ll receive bids on this item
                    </div>
                  </div>
                  <Switch value={sale} setValue={setSale} />
                </div>
                <div className={styles.option}>
                  <div className={styles.box}>
                    <div className={styles.category}>Instant sale price</div>
                    <div className={styles.text}>
                      Enter the price for which the item will be instantly sold
                    </div>
                  </div>
                  <Switch value={price} setValue={setPrice} />
                </div>
                <div className={styles.option}>
                  <div className={styles.box}>
                    <div className={styles.category}>Unlock once purchased</div>
                    <div className={styles.text}>
                      Content will be unlocked after successful transaction
                    </div>
                  </div>
                  <Switch value={locking} setValue={setLocking} />
                </div>
                <div className={styles.category}>Choose collection</div>
                <div className={styles.text}>
                  Choose an exiting collection or create a new one
                </div>
                <Cards className={styles.cards} items={items} />
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
                  // onClick={() => {setVisibleModal(true)}}
                  onClick={createItem}
                  // type="button" hide after form customization
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
            file={fileUrl}
            form={formInput}
          />
        </div>
      </div>
      {/* <Modal visible={visibleModal} onClose={() => setVisibleModal(false)}>
        <FolowSteps className={styles.steps} />
      </Modal> */}
      <Footers />
    </>
  );
};

export default Upload;
