import React from "react";
import TagManager, { TagManagerArgs } from "react-gtm-module";
import "bootstrap/dist/css/bootstrap.min.css";
import "styles/globals.scss";
import type { AppProps } from "next/app";

// Note: Putting this import at last to give more precedence to the components css
//       instead of globals.scss and bootstrap.min.css
import CookieConsent from "components/agility-pageModules/common/cookieConsent/cookieConsent";

const tagManagerArgs: TagManagerArgs = {
  gtmId: process.env.NEXT_PUBLIC_GTMID,
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
