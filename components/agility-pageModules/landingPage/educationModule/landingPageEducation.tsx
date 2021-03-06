import { ModuleProps } from "@agility/nextjs";
import { Row, Stack } from "react-bootstrap";
import React from "react";

import CardContainer from "components/agility-pageModules/common/cardContainer/cardContainer";
import flexbox from "utils/flexbox";
import ILandingPageEducationProps from "components/agility-pageModules/landingPage/educationModule/interfaces/ILandingPageEducationProps";
import PrimaryButton from "components/agility-pageModules/common/primaryButton/primaryButton";

import styles from "components/agility-pageModules/landingPage/educationModule/landingPageEducation.module.scss";

const rowHCenter = flexbox({ hAlign: "center" });
const linkProps = { href: "/education" };

const LandingPageEducation = (props: ModuleProps<ILandingPageEducationProps>): JSX.Element => {
    const { fields } = props.module;

    return <Stack className={`${styles.content4} align-items-center`} gap={4}>
        <Row className={styles.contentHeading}>
            <h2 className="text-center">{fields.title}</h2>
        </Row>
        <Row className={`${rowHCenter}`}>
            <CardContainer content={{ items: fields.educationTiles }} />
        </Row>
        <Row>
            <PrimaryButton linkProps={linkProps}>Learn More</PrimaryButton>
        </Row>
    </Stack>;
};

export default LandingPageEducation;