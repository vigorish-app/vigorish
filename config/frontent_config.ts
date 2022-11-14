import ThirdPartyEmailPasswordReact from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import SessionReact from "supertokens-auth-react/recipe/session";
import EmailVerification from "supertokens-auth-react/recipe/emailverification";
import { appInfo } from "./app_info";

// Dashboard option:
// import Dashboard from "supertokens-node/recipe/dashboard";

export const frontendConfig = () => {
  return {
    appInfo,
    recipeList: [
      ThirdPartyEmailPasswordReact.init({
        signInAndUpFeature: {
          providers: [
            // ThirdPartyEmailPasswordReact.Google.init(),
            // ThirdPartyEmailPasswordReact.Facebook.init(),
            // ThirdPartyEmailPasswordReact.Github.init(),
            // ThirdPartyEmailPasswordReact.Apple.init(),
          ],
        },
      }),
      EmailVerification.init({
        mode: "REQUIRED", // or "OPTIONAL"
      }),
      SessionReact.init(),
    ],
  };
};
