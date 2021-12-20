import React from "react";

import Banner from "components/common/banner/banner";
import bannerContent from "components/educationPage/bannerSection/bannerContent";
import bannerImageListContent from "components/educationPage/bannerSection/bannerImageListContent";
import BannerSection from "components/educationPage/bannerSection/bannerSection";
import Layout from "components/common/layout/layout";

const Education = (): JSX.Element =>
    <Layout>
        <Banner images={bannerImageListContent} fullHeight={false}>
            <BannerSection {...bannerContent} />
        </Banner>
    </Layout>;

export default Education;