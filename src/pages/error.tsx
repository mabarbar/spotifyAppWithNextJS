import Head from "next/head";

import type { NextPageWithLayout } from "~/types/common.types";

const Error: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>DaftAcademy - Błąd</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col bg-ui7 pt-16 pb-12">
        <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-4 sm:px-6 lg:px-8">
          <div className="py-16">
            <div className="text-center">
              <p className="text-base font-semibold text-ui3">Upss...</p>
              <h1 className="mt-2 text-4xl font-bold tracking-tight text-ui1 sm:text-5xl">
                Sprawdź czy masz wszystkie envy!
              </h1>
              <div className="mt-2">
                <span className="text-xs text-ui2">
                  NEXTAUTH_SECRET, NEXTAUTH_URL ,SPOTIFY_CLIENT_ID,
                  SPOTIFY_CLIENT_SECRET, NEXT_PUBLIC_API_URL, MONGODB_URI
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Error;
