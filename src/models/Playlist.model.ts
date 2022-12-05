import { Schema, model, models, HydratedDocument } from "mongoose";

export interface Model {
  color?: string;
  name: string;
  owner: string;
  slug: string;
  spotifyId: string;
  upvote: number;
}

const schema = new Schema<Model>({
  color: String,
  name: { type: String, required: true },
  owner: { type: String, required: true },
  slug: { type: String, required: true },
  spotifyId: { type: String, required: true },
  upvote: { type: Number, required: true },
});

export type ModelWithId = Model & { id: string };
export type HydratedModel = HydratedDocument<Model>;

export const Playlist = models.Playlist || model<Model>("Playlist", schema);

export default Playlist;
