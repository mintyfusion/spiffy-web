import { ImageField, ModuleProps } from "@agility/nextjs";
import { ImageProps } from "next/image";
import React from "react";

import Banner from "components/common/banner/banner";
import CreatorBannerSection from "components/agility-pageModules/creatorPage/bannerSection/bannerSection";
import EducationBannerSection from "components/educationPage/bannerSection/bannerSection";
import IContentInfo from "types/IContentnfo";
import LandingBannerSection from "components/landingPage/bannerSection/bannerSection";
import PageIds from "common/pageIds";

interface IHeroModuleProps extends IContentInfo {
    image: { media: [ImageField] };
}

const HeroModule = (props: ModuleProps<IHeroModuleProps>): JSX.Element => {
    const { fields } = props.module;
    const data: ImageProps[] = fields.image.media.map(data => ({ src: data.url }));
    const [renderFullHeight, setRenderFullHeight] = React.useState<boolean>(true);
    const renderBannerComponent = React.useMemo((): JSX.Element => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    }, [fields, props.page?.pageID]);

    return (
        <Banner images={data} fullHeight={renderFullHeight}>
            {renderBannerComponent}
        </Banner>
    );
};

export default HeroModule;