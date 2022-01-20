import { ImageProps } from "next/image";
import React from "react";

import Banner from "components/common/banner/banner";
import CreatorBannerSection from "components/agility-pageModules/creatorPage/bannerSection/bannerSection";
import EducationBannerSection from "components/educationPage/bannerSection/bannerSection";
import IHeroModuleProps from "components/agility-pageModules/common/heroModule/interfaces/iHeroModuleProps";
import LandingBannerSection from "components/landingPage/bannerSection/bannerSection";
import PageIds from "common/pageIds";

const HeroModule = (props: IHeroModuleProps): JSX.Element => {
    const { fields } = props.module;
    const [renderFullHeight, setRenderFullHeight] = React.useState<boolean>(true);

    const data: ImageProps[] = React.useMemo(() =>
        fields.image.media.map(data => ({ src: data.url }))
        , [fields.image.media]);

    const renderBannerComponent = React.useMemo((): JSX.Element => {
        switch (props.page?.pageID) {
            case PageIds.EDUCATION_LANDING:
            case PageIds.FAQ:
                {
                    setRenderFullHeight(false);

                    return <EducationBannerSection title={fields.title} description={fields.description} />;
                }

            case PageIds.LANDING: {
                setRenderFullHeight(true);

                return <LandingBannerSection content={fields} />;
            }
            case PageIds.CREATOR_LANDING: {
                setRenderFullHeight(true);

                return <CreatorBannerSection content={fields} />;
            }
        }
    }, [fields, props.page?.pageID]);

    return (
        <Banner images={data} fullHeight={renderFullHeight}>
            {renderBannerComponent}
        </Banner>
    );
};

export default HeroModule;