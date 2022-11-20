import { superTokensNextWrapper } from "supertokens-node/nextjs";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import supertokens from "supertokens-node";
import { backendConfig } from "../../config/backend_config";
import { NextApiRequest, NextApiResponse } from "next";

import {
  UncreatedPersonalEvent,
  UncreatedPersonalEventOption,
  PersonalEvent,
} from "../../lib/personal_event";

async function createPersonalEvent(req: any, res: any) {
  let userId = req.session.getUserId();
  let body = req.body;
  let properRes = res as NextApiResponse;

  // Validate the top event info:
  if (!body.question || typeof body.question != "string") {
    return properRes.status(400).send("Invalid body.question");
  }
  let event: UncreatedPersonalEvent = {
    userId,
    description: body.question,
    notes: body.notes,
  };

  // Validate top option level info
  if (
    !body.description ||
    !body.betAmount ||
    body.description.length != body.betAmount.length
  ) {
    return properRes.status(400).send("Invalid Options details");
  }
  let options: UncreatedPersonalEventOption[] = [];
  let totalSum = 0;
  for (let i = 0; i < body.description.length; i++) {
    let amount = Number(body.betAmount[i]);
    if (typeof amount != "number" || amount < 0 || amount > 100) {
      return properRes.status(400).send("Bet amount was invalid");
    }
    totalSum += amount;
    options.push({
      description: body.description[i],
      betAmount: amount,
    });
  }
  if (totalSum < 99 || totalSum > 100) {
    // I don't care if they lose a few decimal places. Its their loss anyways
    return properRes.status(400).send("Net Bet amount was invalid");
  }

  let createdEvent = await PersonalEvent.create(event, options);

  return properRes.redirect("/personal_events");
}

export default async function PersonalEvents(req: any, res: any) {
  // we first verify the session
  supertokens.init(backendConfig());
  await superTokensNextWrapper(
    async (next) => {
      return await verifySession()(req as any, res as any, next);
    },
    req,
    res
  );
  // if it comes here, it means that the session verification was successful

  if (req.method == "POST") {
    return await createPersonalEvent(req, res);
  }
}
