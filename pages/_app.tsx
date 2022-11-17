import "../styles/globals.css";
import type { AppProps } from "next/app";

import SuperTokensReact, { SuperTokensWrapper } from "supertokens-auth-react";
import { frontendConfig } from "../config/frontent_config";

if (typeof window !== "undefined") {
  // we only want to call this init function on the frontend
  SuperTokensReact.init(frontendConfig());
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SuperTokensWrapper>
      <Component {...pageProps} />
    </SuperTokensWrapper>
  );
}
