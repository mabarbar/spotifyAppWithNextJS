import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="pl">
        <Head>
          <link
            rel="preload"
            href="/fonts/Inter-Regular.woff2"
            as="font"
            crossOrigin="anonymous"
          ></link>
          <link
            rel="preload"
            href="/fonts/Inter-Italic.woff2"
            as="font"
            crossOrigin="anonymous"
          ></link>
          <link
            rel="preload"
            href="/fonts/Inter-Medium.woff2"
            as="font"
            crossOrigin="anonymous"
          ></link>
          <link
            rel="preload"
            href="/fonts/Inter-SemiBold.woff2"
            as="font"
            crossOrigin="anonymous"
          ></link>
          <link
            rel="preload"
            href="/fonts/Inter-Bold.woff2"
            as="font"
            crossOrigin="anonymous"
          ></link>
        </Head>
        <body className="scrollbar-hidden">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
