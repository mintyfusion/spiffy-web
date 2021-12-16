import React from "react";

import Layout from "components/common/layout/layout";
import WhySection from "components/creatorPage/whySection/whySection";
import whySectionContentData from "components/creatorPage/whySection/whySectionContentData";

const Creator = (): JSX.Element =>
    <Layout>
        <WhySection {...whySectionContentData} />
    </Layout>;
export default Creator;