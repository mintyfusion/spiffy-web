import React from "react";

import Layout from "components/common/layout/layout";
import VideoSection from "components/creatorPage/videoSection/videoSection";
import videoSectionContent from "components/creatorPage/videoSection/videoSectionContent";
import WhySection from "components/creatorPage/whySection/whySection";
import whySectionContentData from "components/creatorPage/whySection/whySectionContentData";

const Creator = (): JSX.Element =>
    <Layout>
        <WhySection {...whySectionContentData} />
        <VideoSection  {...videoSectionContent} />
    </Layout>;
    
export default Creator;