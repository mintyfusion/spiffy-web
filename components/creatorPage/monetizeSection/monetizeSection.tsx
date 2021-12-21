import React from "react";

import CommonSection from "components/common/commonSection/commonSection";
import IWhySectionContentData from "components/creatorPage/monetizeSection/interfaces/IMonetizeSectionContentData";

import styles from "components/creatorPage/monetizeSection/monetizeSection.module.scss";

const MonetizeSection = (props: IWhySectionContentData): JSX.Element => {
    const { title, description, img } = props;

    return (
        <CommonSection
            reversed={true}
            content={{ title, description }}
            image={img}
            containerClass={styles.container}
        />
    );
};

export default MonetizeSection;