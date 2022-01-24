import { NextApiRequest, NextApiResponse } from "next";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";

export default async function profileHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body: item, method } = req as any;
  // const item = req.body as any;

  switch (method) {
    case "POST":
      try {
        const updateRef = doc(db, "items", item.tokenId);

        await setDoc(
          updateRef,
          {
            price: item.price,
            itemId: item.itemId,
            isSold: true,
            marketTimeStamp: serverTimestamp(),
          },
          { merge: true }
        );
        res
          .status(200)
          .json({ message: "Success created market item in database" });
      } catch (err) {
        res.status(500).json({
          message:
            "Internal server error. Failed creating market item to database",
        });
      }
      break;

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
