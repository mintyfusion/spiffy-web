import React from "react";

import Banner from "components/common/banner/banner";
import bannerContent from "components/landingPage/bannerSection/bannerContent";
import BannerSection from "components/landingPage/bannerSection/bannerSection";
import FeaturesSection from "components/landingPage/featuresSection/featuresSection";
import GetStarted from "components/landingPage/getStartedSection/getStartedSection";
import Layout from "components/common/layout/layout";
import LearnSection from "components/landingPage/learnSection/learnSection";
import VerticalContentSection from "components/landingPage/verticalContentSection/verticalContentSection";

const Index = (): JSX.Element =>
    <Layout>
        <Banner images={bannerContent.images} >
            <BannerSection content={bannerContent.content} />
        </Banner>
        <FeaturesSection />
        <GetStarted />
        <VerticalContentSection />
        <LearnSection />
    </Layout>;
    
export default Index;