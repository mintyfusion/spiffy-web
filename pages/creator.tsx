import React from "react";

import Banner from "components/common/banner/banner";
import bannerContent from "components/creatorPage/bannerSection/bannerContent";
import BannerSection from "components/creatorPage/bannerSection/bannerSection";
import GetStartedSection from "components/creatorPage/getStartedSection/getStartedSection";
import getStartedSectionContentData from "components/creatorPage/getStartedSection/getStartedSectionContentData";
import Layout from "components/common/layout/layout";
import VideoSection from "components/creatorPage/videoSection/videoSection";
import videoSectionContent from "components/creatorPage/videoSection/videoSectionContent";
import WhySection from "components/creatorPage/whySection/whySection";
import whySectionContentData from "components/creatorPage/whySection/whySectionContentData";

const Creator = (): JSX.Element =>
    <Layout>
        <Banner images={bannerContent.images} >
            <BannerSection content={bannerContent.content}/>
        </Banner>
        <WhySection {...whySectionContentData} />
        <VideoSection  {...videoSectionContent} />
        <GetStartedSection {...getStartedSectionContentData} />
    </Layout>;
    
export default Creator;