import { ImageProps } from "next/image";
import { ModuleProps } from "@agility/nextjs";
import React from "react";

import Banner from "components/common/banner/banner";
import EducationBannerSection from "components/educationPage/bannerSection/bannerSection";
import IContentInfo from "types/IContentnfo";
import PageIds from "common/pageIds";

interface IHeroModuleProps extends IContentInfo {
    image: { media: [{ url: string }] };
}

const HeroModule = (props: ModuleProps<IHeroModuleProps>): JSX.Element => {
    const { fields } = props.module;
    const data: ImageProps[] = fields.image.media.map(data => ({ src: data.url }));

    const renderBannerComponent = React.useMemo((): JSX.Element => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        switch (props.page?.pageID) {
            case PageIds.EDUCATION_LANDING:
                return <EducationBannerSection title={fields.title} description={fields.description} />;
            case PageIds.LANDING:
                return <>Hero Section for Landing Page here</>;
        }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    }, [fields.description, fields.title, props.page?.pageID]);

    return (
        <Banner images={data} fullHeight={false}>
            {renderBannerComponent}
        </Banner>
    );
};

export default HeroModule;