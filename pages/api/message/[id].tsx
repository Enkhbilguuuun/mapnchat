import type { NextApiRequest, NextApiResponse } from "next";
import { useRouter } from "next/router";
import { mongoDataApiRequest } from "@/utils/MongoDB";

export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {id} = req.query;

  switch (req.method) {
    case "GET":
      const GET = await mongoDataApiRequest("findOne", {
        filter: {
          _id: { $oid: id },
        },
      });
      res.status(200).json(GET);
    console.log(id)
      break;
    case "PATCH":   
      //
      break;
    case "DELETE":
      const DELETE = await mongoDataApiRequest("deleteOne", {
        filter: {
          _id: { $oid: id },
        },
      });
      res.status(200).json(DELETE);
      break;
  }
}
