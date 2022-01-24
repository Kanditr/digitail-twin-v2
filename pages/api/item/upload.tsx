import { NextApiRequest, NextApiResponse } from "next";
import { create as ipfsHttpClient } from "ipfs-http-client";

export default async function createItem(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body: file, method } = req as any;

  switch (method) {
    case "POST":
      try {
        const client = ipfsHttpClient(
          "https://ipfs.infura.io:5001/api/v0" as any
        );
        const added = await client.add(file, {
          // progress: (prog) => console.log(`received: ${prog}`),
        });
        var url: any = `https://ipfs.infura.io/ipfs/${added.path}`;
      } catch (e) {
        res.status(400).json({
          message: "Internal error: ipfs",
          error: "Error message: " + e,
          file: file,
        });
      }

      res.status(200).json({
        message: "success",
        fileUrl: url,
      });
      break;

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
