import React, { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./Item.module.sass";
import Users from "./Users/users";
import Control from "./Control/control";
import Options from "./Options/options";
import Image from "next/image";

import { useRouter } from "next/router";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

import { bids } from "../../mocks/bids";

const navLinks = ["Info", "Owners", "History", "Bids"];

const categories = [
  {
    category: "black",
    content: "art",
  },
  {
    category: "purple",
    content: "unlockable",
  },
];

const users = [
  {
    name: "Raquel Will",
    position: "Owner",
    avatar: "/images/content/avatar-2.jpg",
    reward: "/images/content/reward-1.svg",
  },
  {
    name: "Selina Mayert",
    position: "Creator",
    avatar: "/images/content/avatar-1.jpg",
  },
];

const Item = ({ res }: any) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [single, setSingle] = useState({
    // file_url: "/images/content/avatar-1.jpg",
  }) as any;

  const router = useRouter();
  const { id } = router.query as any;

  useEffect(() => {
    if (!router.isReady) return;
    getSingle();
  }, [router.isReady]);

  const getSingle = async () => {
    const docRef = doc(db, "items", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
    }

    setSingle(docSnap.data());
  };

  // const url = single?.file_url;
  console.log(single);

  return (
    <>
      <div className={cn("section", styles.section)}>
        <div className={cn("container", styles.container)}>
          <div className={styles.bg}>
            <div className={styles.preview}>
              <div className={styles.categories}>
                {categories.map((x, index) => (
                  <div
                    className={cn(
                      { "status-black": x.category === "black" },
                      { "status-purple": x.category === "purple" },
                      styles.category
                    )}
                    key={index}
                  >
                    {x.content}
                  </div>
                ))}
              </div>
              <img
                // srcSet={`${single.image2x} 2x`}
                src={single.file_url}
                alt="Item"
              />
            </div>
            <Options className={styles.options} />
          </div>
          <div className={styles.details}>
            <h1 className={cn("h3", styles.title)}>{single.name}</h1>
            <div className={styles.cost}>
              <div className={cn("status-stroke-green", styles.price)}>
                {single.price || ""} Matic
              </div>
              <div className={cn("status-stroke-black", styles.price)}>
                $4,429.87
              </div>
              <div className={styles.counter}>{bids[0].counter}</div>
            </div>
            <div className={styles.info}>{single.description}</div>
            <div className={styles.nav}>
              {navLinks.map((x, index) => (
                <button
                  className={cn(
                    { [styles.active]: index === activeIndex },
                    styles.link
                  )}
                  onClick={() => setActiveIndex(index)}
                  key={index}
                >
                  {x}
                </button>
              ))}
            </div>
            <Users className={styles.users} items={users} />
            <Control className={styles.control} item={single} id={id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Item;
