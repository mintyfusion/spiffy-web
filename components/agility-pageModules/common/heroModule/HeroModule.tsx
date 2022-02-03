import { ImageProps } from "next/image";
import React from "react";

import Banner from "components/agility-pageModules/common/banner/banner";
import IHeroModuleProps from "components/agility-pageModules/common/heroModule/interfaces/iHeroModuleProps";
import LandingBannerSection from "components/landingPage/bannerSection/bannerSection";

const HeroModule = (props: IHeroModuleProps): JSX.Element => {
    const { fields } = props.module;

    const data: ImageProps[] = React.useMemo(() =>
        fields.image.media.map(data => ({ src: data.url }))
        , [fields.image.media]);

    const renderBannerComponent = React.useMemo((): JSX.Element =>
        <LandingBannerSection content={fields} />, [fields]);

    return (
        <Banner images={data}>
            {renderBannerComponent}
        </Banner>
    );
};

export default HeroModule;