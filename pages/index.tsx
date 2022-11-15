import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Vigorish</title>
        <meta name="description" content="Validate your world view" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-center">Vigorish</h1>

        <p className="text-center">Validate your worldview</p>
      </main>
    </div>
  );
}
