import { Stack } from "react-bootstrap";
import React from "react";

import flexbox from "utils/flexbox";
import IGetStartedSectionContentData from "components/agility-pageModules/creatorPage/getStartedSection/interfaces/IGetStartedSectionContentData";
import Section from "components/common/section/section";
import SectionSide from "components/common/section/enums/SectionSide";

import styles from "components/agility-pageModules/creatorPage/getStartedSection/getStartedSection.module.scss";

const alignCenter = flexbox({ vertical: true, hAlign: "center", vAlign: "center" });

const GetStartedSection = (props: IGetStartedSectionContentData): JSX.Element => {
    const { href, content } = props;

    return (
        <Stack className={`${styles.container} ${alignCenter} text-center p-3 p-sm-5 gap-3 gap-sm-5`}>
            <Section
                direction={SectionSide.center}
                href={href}
                content={content}
                buttonText="Get Started"
            />
        </Stack >
    );
};

export default GetStartedSection;