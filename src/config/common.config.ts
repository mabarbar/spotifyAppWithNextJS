export const MONGODB_URI = process.env.MONGODB_URI || "";
export const DEFAULT_CARD_COLOR = "#000000";

export const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || "";
export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || "";
export const NEXTAUTH_URL = process.env.NEXTAUTH_URL || "";
export const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || "";
export const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || "";

export const SPOTIFY_AUTH_SCOPES = [
  "app-remote-control",
  "playlist-modify-private",
  "playlist-modify-public",
  "playlist-read-collaborative",
  "playlist-read-private",
  "streaming",
  "ugc-image-upload",
  "user-follow-modify",
  "user-follow-read",
  "user-library-modify",
  "user-library-read",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-email",
  "user-read-playback-position",
  "user-read-playback-state",
  "user-read-private",
  "user-read-recently-played",
  "user-top-read",
];
