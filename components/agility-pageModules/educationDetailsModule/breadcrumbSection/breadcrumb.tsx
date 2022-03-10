import Crumb from "react-bootstrap/Breadcrumb";
import React from "react";

import IBreadcrumbProps from "components/agility-pageModules/educationDetailsModule/breadcrumbSection/interfaces/IBreadcrumbProps";

import styles from "components/agility-pageModules/educationDetailsModule/breadcrumbSection/breadcrumb.module.scss";

const Breadcrumb = (props: IBreadcrumbProps): JSX.Element => {
    const blogId = props.blogId.toString().replace(/-/g, " ");

    return (
        <Crumb className={`${styles.breadcrumbMain} mb-3 pb-md-1`}>
            <Crumb.Item href="/education">Education</Crumb.Item>
            <Crumb.Item active className="text-capitalize text-truncate">
                <div title={blogId} className="text-truncate">
                    {blogId}
                </div>
            </Crumb.Item>
        </Crumb>
    );
};

export default Breadcrumb;