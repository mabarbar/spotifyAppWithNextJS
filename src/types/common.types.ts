import type { NextPage } from "next/types";

export type NextPageWithLayout<PageProps = {}> = NextPage<PageProps> & {
  getLayout?: (page: React.ReactElement<PageProps>) => React.ReactNode;
};
