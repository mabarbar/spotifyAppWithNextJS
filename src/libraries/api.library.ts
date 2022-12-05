import { DEFAULT_CARD_COLOR } from "~/config/common.config";
import Playlist, {
  HydratedModel,
  ModelWithId,
  Model,
} from "~/models/Playlist.model";
import { isValidId } from "./mongoose.library";

export type Sort = "ascending" | "descending";

export const getPlaylists = async (
  limit?: string | number,
  sort: Sort = "descending"
): Promise<ModelWithId[]> => {
  const result = await Playlist.find<HydratedModel>()
    .sort({ upvote: sort })
    .limit(limit ? Number(limit) : 0);
  return result.map((doc) => {
    const playlist = doc.toObject();
    return {
      name: playlist.name,
      owner: playlist.owner,
      slug: playlist.slug,
      spotifyId: playlist.spotifyId,
      upvote: playlist.upvote,
      color: playlist.color || DEFAULT_CARD_COLOR,
      id: playlist._id.toString(),
    };
  });
};

export const getPlaylistBySlug = async (
  slug: string | null | undefined
): Promise<ModelWithId | null> => {
  if (!slug) return null;
  const result = await Playlist.findOne<HydratedModel>({ slug });
  if (!result) return null;
  const playlist = result.toObject();
  return {
    name: playlist.name,
    owner: playlist.owner,
    slug: playlist.slug,
    spotifyId: playlist.spotifyId,
    upvote: playlist.upvote,
    color: playlist.color || DEFAULT_CARD_COLOR,
    id: playlist._id.toString(),
  };
};

export const getPlaylistById = async (
  id: string | null | undefined
): Promise<ModelWithId | null> => {
  if (!id) return null;
  if (!isValidId(id)) return null;
  const result = await Playlist.findById<HydratedModel>(id);
  if (!result) return null;
  const playlist = result.toObject();
  return {
    name: playlist.name,
    owner: playlist.owner,
    slug: playlist.slug,
    spotifyId: playlist.spotifyId,
    upvote: playlist.upvote,
    color: playlist.color || DEFAULT_CARD_COLOR,
    id: playlist._id.toString(),
  };
};

export const getAllIds = async (): Promise<string[]> => {
  const result = await Playlist.find<HydratedModel>().distinct("_id");
  return result.map((doc) => doc._id.toString());
};
