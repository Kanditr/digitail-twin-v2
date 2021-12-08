import Footers from "./Footer/footer";
import Headers from "./Header/header";
import User from "./Header/User/user";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { useWeb3React } from "@web3-react/core";

export default function Auth({ children }: any) {
  //   const [single, setSingle] = useState({}) as any;
  const [single, setSingle] = useState(12345) as any;
  const [loadAccount, setLoadAccount] = useState(true);

  const { active, account, library, connector, activate, deactivate }: any =
    useWeb3React();

  // useEffect(() => {
  //   // load account
  //   getSingle();
  // }, []);

  //   const getSingle = async () => {
  //     if (active === true) {
  //       const docRef = doc(db, "users", account);
  //       const docSnap = await getDoc(docRef);

  //       if (docSnap.exists()) {
  //         console.log("Have Document data", docSnap.data());
  //       } else {
  //         console.log("No such document!");
  //       }

  //       setSingle(docSnap.data());
  //     } else {
  //       console.log("No connection");
  //     }
  //   };

  // load account
  //   if (loadAccount === true) {
  //     if (active === true) {
  //       getSingle();
  //       setLoadAccount(false);
  //     }
  //   }

  return <div>{children}</div>;
}
