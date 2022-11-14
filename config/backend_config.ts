import ThirdPartyEmailPasswordNode from "supertokens-node/recipe/thirdpartyemailpassword";
import SessionNode from "supertokens-node/recipe/session";
import EmailVerification from "supertokens-node/recipe/emailverification";
import { appInfo } from "./app_info";
import { TypeInput } from "supertokens-node/types";

export const backendConfig = (): TypeInput => {
  return {
    framework: "express",
    supertokens: {
      connectionURI: process.env.SUPERTOKENS_URL as string,
      apiKey: process.env.SUPERTOKENS_API_KEY as string,
    },
    appInfo,
    recipeList: [
      ThirdPartyEmailPasswordNode.init({
        // Instructions on generating these:
        // https://supertokens.com/docs/thirdpartyemailpassword/nextjs/init#5-create-a-backend-config-function
        providers: [
          // We have provided you with development keys which you can use for testing.
          // IMPORTANT: Please replace them with your own OAuth keys for production use.
          // ThirdPartyEmailPasswordNode.Google({
          //   clientId:
          //     "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
          //   clientSecret: "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",
          // }),
          // ThirdPartyEmailPasswordNode.Github({
          //   clientId: "467101b197249757c71f",
          //   clientSecret: "e97051221f4b6426e8fe8d51486396703012f5bd",
          // }),
          // ThirdPartyEmailPasswordNode.Facebook({
          //   clientSecret: "FACEBOOK_CLIENT_SECRET",
          //   clientId: "FACEBOOK_CLIENT_ID",
          // }),
        ],
      }),
      EmailVerification.init({
        mode: "REQUIRED", // or "OPTIONAL"
      }),
      SessionNode.init(),
    ],
    isInServerlessEnv: true,
  };
};
