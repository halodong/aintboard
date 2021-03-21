import Head from "next/head";
import Header from "~/components/Header";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Ain't Board - Interactive Boardgame Community</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header homepage />
    </div>
  );
}
