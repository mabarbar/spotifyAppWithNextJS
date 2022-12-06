import useSWR, { SWRConfiguration } from "swr";
import useSpotify from "~/hooks/useSpotify.hook";

export interface Props extends SWRConfiguration {
  id?: string;
}

interface Response<T> {
  body: T;
  headers: Record<string, string>;
  statusCode: number;
}

export const useSpotifyPlaylist = ({ id, ...config }: Props) => {
  const { client } = useSpotify();

  const fetcher = async (
    id: string
  ): Promise<Response<SpotifyApi.SinglePlaylistResponse>> =>
    await client.getPlaylist(id);

  const swr = useSWR(id, fetcher, config);
  const isLoading = !swr.error && !swr.data;

  return {
    ...swr,
    data: swr.data,
    isLoading,
  };
};

export default useSpotifyPlaylist;