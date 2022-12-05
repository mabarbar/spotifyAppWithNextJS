import React from "react";

import Head from "next/head";
import { Layout, Container } from "~/components";
import type { NextPageWithLayout } from "~/types/common.types";

import Main from "~/views/Main/Main.view";
import playlistData from "~/data/playlistsData.json";
import { ModelWithId } from "~/models/Playlist.model";

const Index: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>DaftAcademy - WebApp 2022</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <Main items={playlistData as Array<ModelWithId>} />
      </Container>
    </>
  );
};

export default Index;

Index.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};
