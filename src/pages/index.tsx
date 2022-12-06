import React from "react";
import Head from "next/head";
import { Layout, Container, Loader } from "~/components";
import type { NextPageWithLayout } from "~/types/common.types";
import Main from "~/views/Main/Main.view";
import dbConnect from "~/libraries/mongoose.library";
import { getPlaylists } from "~/libraries/api.library";
import { InferGetStaticPropsType } from "next";
import { useList } from "~/hooks/useList.hook";

export const getStaticProps = async () => {
  await dbConnect();
  const limit = 0;
  const data = await getPlaylists(limit);

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      limit,
      fallbackData: {
        data,
      },
    },
    revalidate: 60,
  };
};

const Index: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = ({fallbackData, limit}) => {

const {data, mutate, isLoading } = useList({
  limit,
  fallbackData,
  revalidateOnMount: false,
  revalidateOnFocus: false,
})

const playlists = isLoading ? null : data

  return (
    <>
      <Head>
        <title>DaftAcademy - WebApp 2022</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        {isLoading ? <Loader /> : <Main items={playlists} />}
      </Container>
    </>
  );
};

export default Index;

Index.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};
