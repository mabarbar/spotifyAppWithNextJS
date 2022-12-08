import { GetStaticPropsContext, InferGetStaticPropsType } from "next/types";
import type { NextPageWithLayout } from "~/types/common.types";
import dbConnect from "~/libraries/mongoose.library";
import { Container, Layout, Loader } from "~/components";
import { getAllIds, getPlaylistById } from "~/libraries/api.library";
import Head from "next/head";
import usePlaylist from "~/hooks/usePlaylist.hook";
import useSpotifyPlaylist from "~/hooks/useSpotifyPlaylist.hook";
import PlaylistView from "~/views/Playlist/Playlist.view";

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const id = ctx?.params?.id?.toString();
  await dbConnect();
  const data = await getPlaylistById(id);

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      id: data.id,
      fallbackData: {
        data,
      },
    },
    revalidate: 60 * 5,
  };
};

export const getStaticPaths = async () => {
  await dbConnect();
  const ids = await getAllIds();

  const paths = ids.map((id) => {
    return {
      params: {
        id,
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Playlist: NextPageWithLayout<Props> = ({ id, fallbackData }) => {
  const { data, isLoading } = useSpotifyPlaylist({
    id: fallbackData.data.spotifyId,
  });

  return (
    <>
      <Head>
        <title>DaftAcademy - {fallbackData.data.name}</title>
      </Head>

      <Container>
        {isLoading ? (
          <Loader />
        ) : (
          <PlaylistView
            playlist={{
              ...fallbackData.data,
              url: data?.body.external_urls.spotify,
              image: data?.body.images[0].url,
            }}
            trackList={data?.body.tracks.items || []}
          />
        )}
      </Container>
    </>
  );
};

export default Playlist;

Playlist.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};