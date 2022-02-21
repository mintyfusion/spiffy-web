import React from "react";

import flexbox from "utils/flexbox";
import Link from "components/agility-pageModules/common/link/link";
import PrimaryButton from "components/agility-pageModules/common/primaryButton/primaryButton";

import styles from "components/agility-pageModules/common/cookieConsent/cookieConsent.module.scss";

const hBetweenWrap = flexbox({ hAlign: "between", wrap: true });
const DISPLAYED_COOKIE_CONSENT = "displayedCookieConsent";

export default function CookieConsent(): JSX.Element | null {
    const [isDisplayedCookieConsent, setCookieConsent] = React.useState(false);
    const handleGotIt = React.useCallback(() => {
        localStorage.setItem(DISPLAYED_COOKIE_CONSENT, "true");
        setCookieConsent(true);
    }, []);

    React.useEffect(() => {
        setCookieConsent(localStorage.getItem(DISPLAYED_COOKIE_CONSENT) === "true");
    }, [setCookieConsent]);

    if (isDisplayedCookieConsent) {
        return null;
    }

    return (
        <div className={`${styles.cookieConsent} ${hBetweenWrap} fixed-bottom w-100`}>
            <div className={styles.contentClass}>
                <h5>Notice</h5>
                <span>
                    We and selected partners use cookies or similar technologies as specified in the
                    <Link href="/privacy-policy"> <span>privacy policy.</span></Link>
                </span>
            </div>
            <PrimaryButton className={`${styles.buttonCookie} py-2`} onClick={handleGotIt}>Got it!</PrimaryButton>
        </div>
    );
}
