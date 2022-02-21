import React from "react";
import TagManager, { TagManagerArgs } from "react-gtm-module";
import type { AppProps } from "next/app";

import "bootstrap/dist/css/bootstrap.min.css";
import "styles/globals.scss";

// Note: Putting this import at last to give more precedence to the components css
//       instead of globals.scss and bootstrap.min.css
import CookieConsent from "components/agility-pageModules/common/cookieConsent/cookieConsent";

const tagManagerArgs: TagManagerArgs = {
  gtmId: "GTM-PB6SX7C",
};

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  React.useEffect(() => {
    TagManager.initialize(tagManagerArgs);
  }, []);

  return (
    <>
      <CookieConsent />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
