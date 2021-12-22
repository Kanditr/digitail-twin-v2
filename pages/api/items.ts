import { NextApiRequest, NextApiResponse } from "next";
import { getDocs, query, collection, orderBy } from "firebase/firestore";
import { db } from "../../firebase";

export default async function getid(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req as any;
  const { sort } = req.query as any;

  if (sort === "Newest") {
    var foo = "timeStamp" as any;
    var bar = "desc" as any;
  }

  if (sort === "Oldest") {
    var foo = "timeStamp" as any;
    var bar = "asc" as any;
  }

  if (sort === "Highest price") {
    var foo = "price" as any;
    var bar = "desc" as any;
  }

  if (sort === "The lowest price") {
    var foo = "price" as any;
    var bar = "asc" as any;
  }

  switch (method) {
    case "GET":
      const q = query(collection(db, "items"), orderBy(foo, bar));

      const querySnapshot = await getDocs(q);
      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      res.status(200).json(items);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
