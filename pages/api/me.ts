import { superTokensNextWrapper } from "supertokens-node/nextjs";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import supertokens from "supertokens-node";
import { backendConfig } from "../../config/backend_config";

import { User } from "../../lib/user";

supertokens.init(backendConfig());

export default async function user(req: any, res: any) {
  // we first verify the session
  await superTokensNextWrapper(
    async (next) => {
      return await verifySession()(req, res, next);
    },
    req,
    res
  );
  const userId = req.session.getUserId();
  const user = await User.load(userId);

  return res.json(user?.json());
}
