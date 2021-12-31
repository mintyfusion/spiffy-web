import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Stack } from "react-bootstrap";
import React from "react";

import IShareSectionData from "components/educationDetailsPage/shareSection/interfaces/IShareSectionData";
import IShareSectionProps from "components/educationDetailsPage/shareSection/interfaces/IShareSectionProps";

import styles from "components/educationDetailsPage/shareSection/shareSection.module.scss";

const ShareSection = (props: IShareSectionProps): JSX.Element =>
    <Stack direction="horizontal" gap={3} className={styles.socials}>
        <h3 className={`${styles.shareText} my-1 me-1 me-md-4`}>Share</h3>
        {props.content.map((data: IShareSectionData, key) =>
            <div key={key}>
                <a className={`${styles.social}`} href={data.href}>
                    <FontAwesomeIcon icon={data.icon} />
                </a>
            </div>
        )}
    </Stack>;

export default ShareSection;