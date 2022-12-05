import type { NextApiRequest, NextApiResponse } from "next";

import Playlist, { Model, ModelWithId } from "~/models/Playlist.model";
import dbConnect from "~/libraries/mongoose.library";
import { getPlaylists, Sort } from "~/libraries/api.library";

type Errors = "Server error!";

export interface Response {
  data?: Model | ModelWithId[];
  error?: { message: Errors };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const { method, query } = req;

  let { limit, sort } = query;

  if (Array.isArray(sort)) {
    sort = sort[0];
  }

  if (Array.isArray(limit)) {
    limit = limit[0];
  }

  await dbConnect();

  if (method === "GET") {
    try {
      const response: ModelWithId[] = await getPlaylists(limit, sort as Sort);
      res.status(200).json({ data: response });
    } catch (err) {
      res.status(500).json({ error: { message: "Server error!" } });
    }
  }

  if (method === "POST") {
    try {
      const response: Model = await Playlist.create<Model>(req.body);
      res.status(201).json({ data: response });
    } catch (err) {
      res.status(500).json({ error: { message: "Server error!" } });
    }
  }
}
