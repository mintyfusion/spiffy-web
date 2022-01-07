/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { DynamicModuleProps } from "@agility/nextjs";
import React from "react";

import Breadcrumb from "components/educationDetailsPage/breadcrumbSection/breadcrumb";
import DetailsSection from "components/educationDetailsPage/detailsSection/detailsSection";
import detailsSocialData from "components/educationDetailsPage/shareSection/shareSocials";
import IEducationDetailsModuleProps from "components/agility-pageModules/educationDetailsModule/interfaces/IEducationDetailsModuleProps";
import Layout from "components/common/layout/layout";
import ShareSection from "components/educationDetailsPage/shareSection/shareSection";

import styles from "components/educationDetailsPage/educationDetails.module.scss";

const EducationDetailsModule = (props:
    DynamicModuleProps<IEducationDetailsModuleProps
        , IEducationDetailsModuleProps>): JSX.Element => {
    const { fields } = props.dynamicPageItem;
    const preparedData = {
        detailsType: fields.contentType_TextField,
        title: fields.title,
        description: fields.description,
        mediaSrc: fields.mediaSrc.href,
        key: fields.name,
        htmlContent: fields.htmlContent
    };

    return (
        <div>
            <Layout navbarProps={{ sticky: true }}>
                <div className={styles.container}>
                    <Breadcrumb blogId={fields.name} />
                    <DetailsSection {...preparedData} />
                    <ShareSection content={detailsSocialData} />
                </div>
            </Layout>
        </div>
    );
};

export default EducationDetailsModule;