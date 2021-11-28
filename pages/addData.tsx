import { collection, addDoc, getDocs } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firbase";

const addData = () => {
  const addData = async () => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        first: "John",
        last: "Doe",
        born: 1815,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <>
      <button onClick={addData}>add data</button>
    </>
  );
};

export default addData;
