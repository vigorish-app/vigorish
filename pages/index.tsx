import Head from "next/head";
import { Navbar } from "flowbite-react";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Vigorish</title>
        <meta name="description" content="Validate your world view" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Navbar fluid={true} rounded={true}>
          <Navbar.Brand href="https://flowbite.com/">
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Vigorish
            </span>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Navbar.Link href="/navbars" active={true}>
              Home
            </Navbar.Link>
            <Navbar.Link href="/navbars">About</Navbar.Link>
            <Navbar.Link href="/navbars">Login</Navbar.Link>
          </Navbar.Collapse>
        </Navbar>

        <h1 className="text-center">Vigorish</h1>

        <p className="text-center">Validate your worldview</p>
      </main>
    </div>
  );
}
