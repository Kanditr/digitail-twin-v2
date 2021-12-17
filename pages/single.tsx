import { collection, addDoc, getDocs, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, app } from "../firebase";

const Firebase = () => {
  const [single, setSingle] = useState({}) as any;

  useEffect(() => {
    getSingle();
  }, []);

  const getSingle = async () => {
    const docRef = doc(db, "users", "J3jP51uxVLfB4ETkhiIl");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
    }

    setSingle(docSnap.data());
  };

  return (
    <>
      <div>
        {single.first}
        {"  "}
        {single.last}
      </div>
    </>
  );
};

export default Firebase;
