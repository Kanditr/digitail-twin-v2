import type { NextPage } from "next";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import Blockheaer from "../components/Block/blockheader";

// console.log(process.env.NEXT_PUBLIC_NFT)

// import { process.env.NFT, process.env.NFT_MARKET } from "../config";

// const process.env.NEXT_PUBLIC_NFT = process.env.NEXT_PUBLIC_NFT
// const process.env.NEXT_PUBLIC_NFT_MARKET = process.env.NEXT_PUBLIC_NFT_MARKET

import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

const BlockIndex: NextPage = () => {
  const [nfts, setNfts] = useState([] as any[]);
  const [loadingState, setLoadingState] = useState("not-loaded");

  useEffect(() => {
    loadNFTs();
  }, []);

  async function loadNFTs() {
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_RPC_PROVIDER
    );
    const tokenContract = new ethers.Contract(
      process.env.NEXT_PUBLIC_NFT_ADDRESS as string,
      NFT.abi,
      provider
    );
    const marketContract = new ethers.Contract(
      process.env.NEXT_PUBLIC_NFT_MARKET_ADDRESS as string,
      Market.abi,
      provider
    );
    const data = await marketContract.fetchMarketItems();

    const items = await Promise.all(
      data.map(async (i: any) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = (await axios.get(tokenUri)) as any;
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        return item;
      })
    );
    setNfts(items);
    setLoadingState("loaded");
  }

  async function buyNft(nft: any) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_NFT_MARKET_ADDRESS as string,
      Market.abi,
      signer
    );

    const price = ethers.utils.parseUnits(nft.price.toString(), "ether");

    const transaction = await contract.createMarketSale(
      process.env.NEXT_PUBLIC_NFT_ADDRESS as string,
      nft.tokenId,
      {
        value: price,
      }
    );
    await transaction.wait();
    loadNFTs();
  }

  if (loadingState === "loaded" && !nfts.length)
    return (
      <div>
        <Blockheaer />
        <h1 className="px-20 py-20 text-3xl">No items in marketplace</h1>;
      </div>
    );

  return (
    <div>
      <Blockheaer />
      <div className="flex justify-center">
        <div className="px-4" style={{ maxWidth: "1600px" }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {nfts.map((nft, i) => (
              <div key={i} className="border shadow rounded-xl overflow-hidden">
                <img src={nft.image} />
                <div className="p-4">
                  <p
                    style={{ height: "64px" }}
                    className="text-2xl font-semibold"
                  >
                    {nft.name}
                  </p>
                  <div style={{ height: "70px", overflow: "hidden" }}>
                    <p className="text-gray-400">{nft.description}</p>
                  </div>
                </div>
                <div className="p-4 bg-black">
                  <p className="text-2xl mb-4 font-bold text-white">
                    {nft.price} Matic
                  </p>
                  <button
                    className="w-full bg-pink-500 text-white font-bold py-2 px-12 rounded"
                    onClick={() => buyNft(nft)}
                  >
                    Buy
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockIndex;
