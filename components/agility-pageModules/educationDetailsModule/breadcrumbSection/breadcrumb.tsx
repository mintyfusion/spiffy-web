import Crumb from "react-bootstrap/Breadcrumb";
import React from "react";

import IBreadcrumbProps from "components/agility-pageModules/educationDetailsModule/breadcrumbSection/interfaces/IBreadcrumbProps";

import styles from "components/agility-pageModules/educationDetailsModule/breadcrumbSection/breadcrumb.module.scss";

const Breadcrumb = (props: IBreadcrumbProps): JSX.Element =>
    <Crumb className={`${styles.breadcrumbMain} mb-3 pb-md-1`}>
        <Crumb.Item href="/education">Education Page</Crumb.Item>
        <Crumb.Item active>
            {props.blogId.toString().replace(/-/g, " ")}
        </Crumb.Item>
    </Crumb >;

export default Breadcrumb;