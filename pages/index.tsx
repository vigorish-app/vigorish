import Link from "next/link";
import Head from "next/head";
import { Navbar, Button } from "flowbite-react";

import Session from "supertokens-auth-react/recipe/session";
import { redirectToAuth } from "supertokens-auth-react";
import { signOut } from "supertokens-auth-react/recipe/thirdpartyemailpassword";

async function handleSignout() {
  await signOut();
  location.href = "/";
}

function LoggedInConditional(props: any) {
  let sessionContext = Session.useSessionContext();
  if (sessionContext.loading) {
    return null;
  }
  if (sessionContext.doesSessionExist) {
    return props.ifTrue;
  } else {
    return props.ifFalse;
  }
  return null;
}

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
            <LoggedInConditional
              ifTrue={
                <div>
                  <Navbar.Link href="/settings">Settings</Navbar.Link>
                  <Button onClick={() => handleSignout()}>Logout</Button>
                </div>
              }
              ifFalse={<Navbar.Link href="/auth">Login</Navbar.Link>}
            ></LoggedInConditional>
          </Navbar.Collapse>
        </Navbar>

        <h1 className="text-center">Vigorish</h1>

        <p className="text-center">Validate your worldview</p>
      </main>
    </div>
  );
}
