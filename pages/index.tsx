import React from "react";

import BannerSection from "components/landingPage/bannerSection/bannerSection";
import Layout from "components/common/layout/layout";
import LearnSection from "components/landingPage/learnSection/learnSection";

const Index = (): JSX.Element =>
    <Layout>
        <BannerSection />
        <LearnSection />
    </Layout>;

export default Index;