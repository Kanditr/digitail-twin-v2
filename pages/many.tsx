import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firbase";
import Link from "next/link";

const many = () => {
  const [single, setSingle] = useState({}) as any;
  const [many, setMany] = useState([]) as any[];

  useEffect(() => {
    // getSingle();
    getMany();
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

  const getMany = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const many = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setMany(many);
    console.log(many);
  };

  return (
    <>
      <div>
        {many.map((document: any, index: any) => (
          <div key={index}>
            {document.first}
            <Link href={`/single/${document.id}`}> see more</Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default many;
