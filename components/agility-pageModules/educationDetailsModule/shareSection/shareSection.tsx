import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Stack } from "react-bootstrap";
import React from "react";

import IShareSectionData from "components/agility-pageModules/educationDetailsModule/shareSection/interfaces/IShareSectionData";
import IShareSectionProps from "components/agility-pageModules/educationDetailsModule/shareSection/interfaces/IShareSectionProps";

import styles from "components/agility-pageModules/educationDetailsModule/shareSection/shareSection.module.scss";

const ShareSection = (props: IShareSectionProps): JSX.Element => {
    const [currentURL, setCurrentURL] = React.useState<string>();

    React.useEffect(() => setCurrentURL(window.location.href), []);

    return <Stack direction="horizontal" gap={3} className={styles.socials}>
        <h3 className={`${styles.shareText} my-1 me-1 me-md-4`}>Share</h3>
        {props.content.map((data: IShareSectionData, key) =>
            <div key={key}>
                <a className={`${styles.social}`} href={`${data.href}${currentURL}`} target="_blank" rel="noreferrer">
                    <FontAwesomeIcon icon={data.icon} />
                </a>
            </div>
        )}
    </Stack>;
};

export default ShareSection;