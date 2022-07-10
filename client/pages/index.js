import Head from "next/head";

import Layout from "../components/Layout";

export default function Home() {
  return (
    <div>
      <Head>
        <title>T-Control</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/icono-app.ico" />
      </Head>

      <Layout />
    </div>
  );
}
