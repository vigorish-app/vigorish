import Head from "next/head";

import LoggedInConditional from "../components/logged_in_conditional";
import UserCard from "../components/user_card";
import NavMenu from "../components/navmenu";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Vigorish</title>
        <meta name="description" content="Validate your world view" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <NavMenu active="home" />
        <h1 className="text-center">Vigorish</h1>

        <p className="text-center">Validate your worldview</p>

        <LoggedInConditional ifTrue={<UserCard />} />
      </main>
    </div>
  );
}
