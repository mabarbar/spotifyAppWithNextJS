import React, { PropsWithChildren } from "react";
import type SpotifyWebApi from "spotify-web-api-node";
import { useSession } from "next-auth/react";

import { spotify } from "~/libraries/spotify.library";

export interface State {
  client: SpotifyWebApi;
  ready: boolean;
  me: SpotifyApi.CurrentUsersProfileResponse | null;
}

const initial: State = {
  client: spotify,
  ready: false,
  me: null,
};

export const Context = React.createContext<State>(initial);
Context.displayName = "SpotifyContext";

export const SpotifyProvider = (props: PropsWithChildren<{}>) => {
  const { data } = useSession();
  const [ready, setReady] = React.useState(false);
  const [me, setMe] =
    React.useState<SpotifyApi.CurrentUsersProfileResponse | null>(null);

  React.useEffect(() => {
    if (!data?.accessToken) return;
    spotify.setAccessToken(data.accessToken);
    setReady(true);
  }, [data]);

  React.useEffect(() => {
    if (!ready) return;
    spotify.getMe().then((user) => {
      setMe(user.body);
    });
  }, [ready]);

  const value = React.useMemo<State>(() => {
    return {
      client: spotify,
      me,
      ready,
    };
  }, [me, ready]);

  return <Context.Provider value={value} {...props} />;
};