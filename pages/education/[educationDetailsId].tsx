import { useRouter } from "next/router";
import React from "react";

import Breadcrumb from "components/educationDetailsPage/breadcrumbSection/breadcrumb";
import detailsContent from "components/educationDetailsPage/detailsSection/detailsContent";
import DetailsSection from "components/educationDetailsPage/detailsSection/detailsSection";
import detailsSocialData from "components/educationDetailsPage/shareSection/shareSocials";
import IDetailsSectionProps from "components/educationDetailsPage/detailsSection/interfaces/IDetailsSectionProps";
import Layout from "components/common/layout/layout";
import ShareSection from "components/educationDetailsPage/shareSection/shareSection";

import styles from "components/educationDetailsPage/educationDetails.module.scss";

const EducationDetails = (): JSX.Element => {
    const router = useRouter();
    const { educationDetailsId } = router.query;

    const detailData: IDetailsSectionProps = React.useMemo(() =>
        detailsContent.find(data => data.key === educationDetailsId), [educationDetailsId]);

    return (
        <div>
            <Layout navbarProps={{ sticky: true }}>
                <div className={styles.container}>
                    <Breadcrumb blogId={educationDetailsId} />
                    <DetailsSection {...detailData} />
                    <ShareSection content={detailsSocialData} />
                </div>
            </Layout>
        </div>
    );
};

export default EducationDetails;