// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { User } from "../../lib/user";
import {
  PersonalEvent,
  UncreatedPersonalEvent,
  UncreatedPersonalEventOption,
} from "../../lib/personal_event";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let user = await User.create();
  let user2 = await User.load(user?.id || 0);

  let eventId = await PersonalEvent.create(
    {
      userId: user?.id || 0,
      description: "This is an event",
      notes: "Important note",
    },
    [
      {
        description: "Option 1",
        betAmount: 75,
      },
      {
        description: "Option 2",
        betAmount: 25,
      },
    ]
  );
  let event = await PersonalEvent.load(eventId);
  let events = await PersonalEvent.loadAllForUser(user?.id || 0);

  res.status(200).json({ name: "John Doe" + eventId });
}
