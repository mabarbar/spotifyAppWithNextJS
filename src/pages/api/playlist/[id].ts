import type { NextApiRequest, NextApiResponse } from "next";

import Playlist, { Model } from "~/models/Playlist.model";
import dbConnect from "~/libraries/mongoose.library";
import { getPlaylistById } from "~/libraries/api.library";

type Errors = "Server error!";

export interface Response {
  data?: Model | null;
  error?: { message: Errors };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const { method, query } = req;

  let { id } = query;

  if (Array.isArray(id)) {
    id = id[0];
  }

  await dbConnect();

  if (method === "GET") {
    try {
      const playlist = await getPlaylistById(id);
      res.status(200).json({ data: playlist });
    } catch (err) {
      res.status(500).json({ error: { message: "Server error!" } });
    }
  }

  if (method === "DELETE") {
    try {
      const playlist = await Playlist.findByIdAndDelete<Model>(id);
      res.status(200).json({ data: playlist });
    } catch (err) {
      res.status(500).json({ error: { message: "Server error!" } });
    }
  }
}
