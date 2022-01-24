import { NextApiRequest, NextApiResponse } from "next";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";

export default async function createItem(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body: item, method } = req as any;

  switch (method) {
    case "POST":
      res.status(200).json({
        name: item.name,
        creator: item.creator,
        item,
        messageaa: "success",
      });
      break;

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
