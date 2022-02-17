import dynamic from "next/dynamic";
import React from "react";

import IBannerSectionProps from "components/agility-pageModules/creatorPage/bannerSection/interfaces/IBannerSectionProps";

import styles from "components/agility-pageModules/creatorPage/bannerSection/bannerSection.module.scss";

const Caption = dynamic(() => import("components/agility-pageModules/common/caption/caption"));

const BannerSection = (props: IBannerSectionProps): JSX.Element =>
    <Caption
        content={props.content}
        captionContainerClass={styles.bannerCaption}
    />;

export default BannerSection;