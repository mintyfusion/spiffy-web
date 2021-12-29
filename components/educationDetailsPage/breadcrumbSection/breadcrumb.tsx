import Crumb from "react-bootstrap/Breadcrumb";
import React from "react";

import IBreadcrumbProps from "components/educationDetailsPage/breadcrumbSection/interfaces/IBreadcrumbProps";

import styles from "components/educationDetailsPage/breadcrumbSection/breadcrumb.module.scss";

const Breadcrumb = (props: IBreadcrumbProps): JSX.Element =>
    <Crumb className={styles.breadcrumbMain}>
        <Crumb.Item href="/education">Education Page</Crumb.Item>
        <Crumb.Item active>
            {props.blogId}
        </Crumb.Item>
    </Crumb >;

export default Breadcrumb;