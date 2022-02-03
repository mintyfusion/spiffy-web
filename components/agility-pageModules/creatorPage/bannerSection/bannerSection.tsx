import React from "react";

import Caption from "components/agility-pageModules/common/caption/caption";
import IBannerSectionProps from "components/agility-pageModules/creatorPage/bannerSection/interfaces/IBannerSectionProps";

import styles from "components/agility-pageModules/creatorPage/bannerSection/bannerSection.module.scss";

const BannerSection = (props: IBannerSectionProps): JSX.Element =>
    <Caption
        content={props.content}
        captionContainerClass={styles.bannerCaption}
    />;

export default BannerSection;