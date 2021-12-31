import React from "react";

import Banner from "components/common/banner/banner";
import bannerContent from "components/educationPage/bannerSection/bannerContent";
import bannerImageListContent from "components/educationPage/bannerSection/bannerImageListContent";
import BannerSection from "components/educationPage/bannerSection/bannerSection";
import contentData from "components/educationPage/contentSection/contentData";
import ContentSection from "components/educationPage/contentSection/contentSection";
import Layout from "components/common/layout/layout";

const Education = (): JSX.Element =>
    <Layout>
        <Banner images={bannerImageListContent} fullHeight={false}>
            <BannerSection {...bannerContent} />
        </Banner>
        <ContentSection content={contentData} />
    </Layout>;

export default Education;