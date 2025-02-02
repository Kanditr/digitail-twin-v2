import React, { useState } from "react";
import Link from "next/link";
import cn from "classnames";
import styles from "./Footer.module.sass";
import Group from "./Group/group";
import Image from "../Image";
import Form from "../Form/form";
import Theme from "../Theme";

const items = [
  {
    title: "Crypter.",
    menu: [
      {
        title: "Discover",
        url: "/explore",
      },
      {
        title: "Connect wallet",
        url: "/connect-wallet",
      },
    ],
  },
  {
    title: "Info",
    menu: [
      {
        title: "FAQ",
        url: "/faq",
      },
      {
        title: "Create item",
        url: "/upload",
      },
    ],
  },
];

const Footers = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: void) => {
    alert();
  };

  return (
    <footer className={styles.footer}>
      <div className={cn("container", styles.container)}>
        <div className={styles.row}>
          <div className={styles.col}>
            <Link href="/">
              <button className={styles.logo}>Digital Twin</button>
            </Link>
            <div className={styles.info}>The New Creative Economy.</div>
            <div className={styles.version}>
              <div className={styles.details}>Dark theme</div>
              <Theme className="theme-big" />
            </div>
          </div>
          <div className={styles.col}>
            {items.map((x, index) => (
              <Group className={styles.group} item={x} key={index} />
            ))}
          </div>
          <div className={styles.col}>
            <div className={styles.category}>Join Newsletter</div>
            <div className={styles.text}>
              Subscribe our newsletter to get more free design course and
              resource
            </div>
            <Form
              className={styles.form}
              value={email}
              setValue={setEmail}
              onSubmit={() => handleSubmit()}
              placeholder="Enter your email"
              type="email"
              name="email"
            />
          </div>
        </div>
        <div className={styles.foot}>
          <div className={styles.copyright}>
            Copyright © 2021 DIGITal TWIN. All rights reserved
          </div>
          <div className={styles.note}>
            We use cookies for better service. <Link href="/#">Accept</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footers;
