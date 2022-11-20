import { Navbar, Button } from "flowbite-react";
import LoggedInConditional from "../components/logged_in_conditional";

import { signOut } from "supertokens-auth-react/recipe/thirdpartyemailpassword";

async function handleSignout() {
  await signOut();
  location.href = "/";
}

export default function NavMenu(props: any) {
  return (
    <Navbar fluid={true} rounded={true}>
      <Navbar.Brand href="https://flowbite.com/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Vigorish
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="/" active={props.active == "home"}>
          Home
        </Navbar.Link>
        <Navbar.Link href="/navbars" active={props.active == "about"}>
          About
        </Navbar.Link>
        <LoggedInConditional
          ifTrue={
            <Navbar.Link
              href="/personal_events"
              active={props.active == "personal"}
            >
              Personal Events
            </Navbar.Link>
          }
        ></LoggedInConditional>
        <LoggedInConditional
          ifTrue={<Button onClick={() => handleSignout()}>Logout</Button>}
          ifFalse={<Navbar.Link href="/auth">Login</Navbar.Link>}
        ></LoggedInConditional>
      </Navbar.Collapse>
    </Navbar>
  );
}
