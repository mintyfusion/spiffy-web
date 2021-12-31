import React from "react";


import Banner from "components/common/banner/banner";
import bannerContent from "components/educationPage/bannerSection/bannerContent";
import bannerImageListContent from "components/educationPage/bannerSection/bannerImageListContent";
import BannerSection from "components/educationPage/bannerSection/bannerSection";
import contentData from "components/educationPage/contentSection/contentData";
import ContentSection from "components/educationPage/contentSection/contentSection";
import FaqSection from "components/educationPage/faqSection/faqSection";
import faqSectionContentData from "components/educationPage/faqSection/faqSectionContentData";
import GameSection from "components/educationPage/gameSection/gameSection";
import gameSectionContentData from "components/educationPage/gameSection/gameSectionContentData";

import Layout from "components/common/layout/layout";

const Education = (): JSX.Element =>
    <Layout>
        <Banner images={bannerImageListContent} fullHeight={false}>
            <BannerSection {...bannerContent} />
        </Banner>
        <ContentSection content={contentData} />
        <GameSection {...gameSectionContentData} />
        <FaqSection {...faqSectionContentData} />
    </Layout>;

export default Education;