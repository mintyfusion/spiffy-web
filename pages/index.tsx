import React from "react";

import BannerSection from "components/landingPage/bannerSection/bannerSection";
import FeaturesSection from "components/landingPage/featuresSection/featuresSection";
import Layout from "components/common/layout/layout";
import LearnSection from "components/landingPage/learnSection/learnSection";

const Index = (): JSX.Element =>
    <Layout>
        <BannerSection />
        <FeaturesSection />
        <LearnSection />
    </Layout>;
export default Index;