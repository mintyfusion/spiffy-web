import { useRouter } from "next/router";
import React from "react";

import Breadcrumb from "components/educationDetailsPage/breadcrumbSection/breadcrumb";
import detailsContent from "components/educationDetailsPage/detailsSection/detailsContent";
import DetailsSection from "components/educationDetailsPage/detailsSection/detailsSection";
import IDetailsSectionProps from "components/educationDetailsPage/detailsSection/interfaces/IDetailsSectionProps";
import Layout from "components/common/layout/layout";

const EducationDetails = (): JSX.Element => {
    const router = useRouter();
    const { educationDetailsId } = router.query;

    const detailData: IDetailsSectionProps = React.useMemo(() =>
        detailsContent.find(data => data.key === educationDetailsId), [educationDetailsId]);

    return (
        <div>
            <Layout stickyNavbar={true}>
                <div className="px-3 px-md-5 py-4">
                    <Breadcrumb blogId={educationDetailsId} />
                    <DetailsSection {...detailData} />
                </div>
            </Layout>
        </div>
    );
};

export default EducationDetails;