import React from "react";

import CommonSection from "components/common/commonSection/commonSection";
import IWhySectionContentData from "components/creatorPage/whySection/interfaces/IWhySectionContentData";

import styles from "components/creatorPage/whySection/whySection.module.scss";

const WhySection = (props: IWhySectionContentData): JSX.Element => {
    const { title, description, img } = props;

    return (
        <CommonSection
            content={{ title, description }}
            image={img}
            arrows={5}
            containerClass={styles.container}
        />
    );
};

export default WhySection;