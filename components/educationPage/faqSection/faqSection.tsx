import React from "react";

import IFaqContentData from "components/educationPage/faqSection/interfaces/IFaqSectionContentData";
import Section from "components/common/section/section";
import SectionSide from "components/common/section/enums/SectionSide";

import styles from "components/educationPage/faqSection/faqSection.module.scss";

const FaqSection = (props: IFaqContentData): JSX.Element =>
    <div className="p-3 p-sm-5 gap-3 gap-sm-5">
        <Section
            direction={SectionSide.center}
            href="/"
            buttonText="FAQ's"
            content={props.content}
            contentClassName={styles.contentContainer}
        />
    </div>;

export default FaqSection;