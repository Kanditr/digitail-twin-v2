import { collection, addDoc, getDocs, doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db, app } from "../../firebase";

const Single = (props: any) => {
  const [single, setSingle] = useState({}) as any;

  const router = useRouter();
  const { id } = router.query as any;

  useEffect(() => {
    if (!router.isReady) return;
    getSingle();
  }, [router.isReady]);

  const getSingle = async () => {
    const docRef = doc(db, "users", id);
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
        {single.born}
        {single.first}
        {"  "}
        {single.last}
      </div>
    </>
  );
};

export default Single;
