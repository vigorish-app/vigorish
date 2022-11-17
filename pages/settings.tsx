// Example page that requies auth

import React from "react";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { signOut } from "supertokens-auth-react/recipe/thirdpartyemailpassword";

async function handleSignout() {
  await signOut();
  location.href = "/";
}

export default function Home() {
  return (
    // we protect settings by wrapping it with SessionAuth
    <SessionAuth>
      <main>
        <h1>You are logged in!</h1>
        <button onClick={handleSignout}>Signout</button>
      </main>
    </SessionAuth>
  );
}
