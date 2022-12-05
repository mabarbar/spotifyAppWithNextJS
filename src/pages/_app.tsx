import React from "react";
import type { AppProps } from "next/app";
import { PlayerProvider } from "~/contexts/player.context";
import { NextPageWithLayout } from "~/types/common.types";

import "~/styles/globals.css";

type Props = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: Props) {
  const withLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <PlayerProvider>
        {withLayout(<Component {...pageProps} />)}
      </PlayerProvider>
    </>
  );
}

export default MyApp;
