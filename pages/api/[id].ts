import { NextApiRequest, NextApiResponse } from "next";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default async function getid(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as any;

  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    var profile_username = docSnap.data().profile_username;
    var profile_image = docSnap.data().profile_image;
  } else {
    var message: any = "No document!";
    var profile_username: any = "No profile";
    var profile_image: any = "/images/content/no-user.jpeg";
  }

  res.status(200).json({
    req: id,
    profile_username,
    profile_image,
    message,
  });
}
