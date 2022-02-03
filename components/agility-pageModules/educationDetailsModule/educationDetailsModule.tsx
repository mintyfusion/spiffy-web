import { DynamicModuleProps } from "@agility/nextjs";
import React from "react";

import Breadcrumb from "components/agility-pageModules/educationDetailsModule/breadcrumbSection/breadcrumb";
import DetailsSection from "components/agility-pageModules/educationDetailsModule/detailsSection/detailsSection";
import detailsSocialData from "components/agility-pageModules/educationDetailsModule/shareSection/shareSocials";
import IEducationDetailsModuleProps from "components/agility-pageModules/educationDetailsModule/interfaces/IEducationDetailsModuleProps";
import ShareSection from "components/agility-pageModules/educationDetailsModule/shareSection/shareSection";

import styles from "components/agility-pageModules/educationDetailsModule/educationDetails.module.scss";

const EducationDetailsModule =
    (props: DynamicModuleProps<IEducationDetailsModuleProps, IEducationDetailsModuleProps>): JSX.Element => {
        const { fields } = props.dynamicPageItem;
        const preparedData = {
            detailsType: fields.contentType.fields.name,
            title: fields.title,
            description: fields.description,
            mediaSrc: fields.mediaSrc.href,
            key: fields.name,
            htmlContent: fields.htmlContent
        };

        return (
            <div>
                <div className={styles.container}>
                    <Breadcrumb blogId={fields.name} />
                    <DetailsSection {...preparedData} />
                    <ShareSection content={detailsSocialData} />
                </div>
            </div>
        );
    };

export default EducationDetailsModule;