import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Link from "next/link";

const Many = () => {
  const [many, setMany] = useState([]) as any[];

  useEffect(() => {
    // getSingle();
    getMany();
  }, []);

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

export default Many;
