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
            name: item.name,
            description: item.description,
            item_url: item.item_url,
            file_url: item.file_url,
            tokenId: item.tokenId,
            isSold: false,
            timeStamp: serverTimestamp(),
            category: item.category,
            creator: item.creator,
            ownerAddress: item.ownerAddress,
          },
          { merge: true }
        );
        res.status(200).json({ message: "Success created item in database" });
      } catch (err) {
        res.status(500).json({
          message: "Internal server error. Failed adding item to database",
        });
      }
      break;

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
