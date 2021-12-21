import React from "react";

import Caption from "components/common/caption/caption";
import IBannerSectionProps from "components/landingPage/bannerSection/interfaces/IBannerSectionProps";

import styles from "components/landingPage/bannerSection/bannerSection.module.scss";

const BannerSection = (props: IBannerSectionProps): JSX.Element =>
    <Caption
        content={props.content}
        captionContainerClass={styles.bannerCaption}
    />;

export default BannerSection;