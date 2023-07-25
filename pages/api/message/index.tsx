import * as React from "react";
import { useState, useEffect } from "react";
import type { NextApiRequest, NextApiResponse } from "next";
import { mongoDataApiRequest } from "@/utils/MongoDB";

export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

   let text : String = req.body

  switch (req.method) {
    case "POST":
      const { text } = req.body;

      const result = await mongoDataApiRequest("insertOne", {
        document: { text: text },
      });

      res.status(200).json(result);
      break;
    case "GET":
      const Get = await mongoDataApiRequest("find", {});
      console.log('get ruu orj bna');
      
      res.status(200).json(Get);
      break;
  }
}
