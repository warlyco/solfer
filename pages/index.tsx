import Head from "next/head";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>solfer</title>
        <meta name="description" content="Solana based file transfers" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </main>
    </>
  );
}
