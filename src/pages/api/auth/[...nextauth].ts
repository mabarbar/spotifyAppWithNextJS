import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import Spotify from "next-auth/providers/spotify";
import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  NEXTAUTH_SECRET,
  SPOTIFY_AUTH_SCOPES,
} from "~/config/common.config";
import spotify from "~/libraries/spotify.library";

async function refreshAccessToken(token: JWT) {
  try {
    spotify.setAccessToken(token.accessToken || "");
    spotify.setRefreshToken(token.refreshToken || "");
    const response = await spotify.refreshAccessToken();
    return {
      ...token,
      accessToken: response.body.access_token,
      accessTokenExpires: Date.now() + response.body.expires_in * 1000,
      refreshToken: response.body.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.log(error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export default NextAuth({
  providers: [
    Spotify({
      clientId: SPOTIFY_CLIENT_ID,
      clientSecret: SPOTIFY_CLIENT_SECRET,
      authorization: spotify.createAuthorizeURL(SPOTIFY_AUTH_SCOPES, ""),
    }),
  ],
  secret: NEXTAUTH_SECRET,
  pages: {
    signIn: "/authenticate",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          accessToken: account.access_token,
          accessTokenExpires: Number(account.expires_at) * 1000,
          refreshToken: account.refresh_token,
          user,
        };
      }

      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
  },
});
