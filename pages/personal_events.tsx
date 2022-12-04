import React, { useEffect } from "react";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import NavMenu from "../components/navmenu";

import PersonalEventForm from "../components/personal_event_form";
import PersonalEventsList from "../components/personal_events_list";

export default function PersonlEvents() {
  const [userEvents, setUserEvents] = React.useState([]);
  useEffect(() => {
    fetch("/api/personal_events")
      .then((response) => response.json())
      .then((json) => {
        setUserEvents(json);
      });
  }, []);
  return (
    <SessionAuth>
      <main>
        <NavMenu active="personal"></NavMenu>

        <PersonalEventForm></PersonalEventForm>

        <div className="max-w-3xl mx-auto mt-8">
          <h2 className="text-2xl m-1">Bets</h2>
          <PersonalEventsList items={userEvents}></PersonalEventsList>
        </div>
      </main>
    </SessionAuth>
  );
}
