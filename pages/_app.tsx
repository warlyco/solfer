import MainLayout from "@/layouts/main-layout";
import { ContextProvider } from "@/providers/context-provider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>solfer</title>
        <meta name="description" content="Solana based file transfers" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContextProvider>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ContextProvider>
    </>
  );
}
