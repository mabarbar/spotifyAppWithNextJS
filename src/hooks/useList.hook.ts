import useSWR, { SWRConfiguration } from "swr";
import { Response } from "~/pages/api/playlist";
import { fetcher } from "~/libraries/swr.library";
import { ModelWithId } from "~/models/Playlist.model";

export interface Props extends SWRConfiguration {
  limit: string | number;
}

export const useList = ({ limit, ...config }: Props) => {
  const swr = useSWR<Response>(`/api/playlist?limit=${limit}`, fetcher, config);
  const isLoading = !swr.error && !swr.data;
  return {
    ...swr,
    data: swr.data?.data as ModelWithId[],
    isLoading,
  };
};

export default useList;