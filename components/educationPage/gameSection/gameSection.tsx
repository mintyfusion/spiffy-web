import React from "react";

import IGameContentData from "components/educationPage/gameSection/interfaces/IGameContentData";
import Section from "components/common/section/section";
import SectionSide from "components/common/section/enums/SectionSide";

import styles from "components/educationPage/gameSection/gameSection.module.scss";

const GameSection = (props: IGameContentData): JSX.Element =>
    <div className={`${styles.gameSectionContainer} p-3 p-sm-5 gap-3 gap-sm-5 `}>
        <Section
            direction={SectionSide.center}
            href="/"
            buttonText="PLAY"
            content={props.content}
            showButtonArrow={false}
            contentClassName={styles.contentContainer}
        />
    </div>;

export default GameSection;