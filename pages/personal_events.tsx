import React from "react";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import NavMenu from "../components/navmenu";

import PersonalEventForm from "../components/personal_event_form";

export default function PersonlEvents() {
  return (
    <SessionAuth>
      <main>
        <NavMenu active="personal"></NavMenu>

        <PersonalEventForm></PersonalEventForm>
      </main>
    </SessionAuth>
  );
}
