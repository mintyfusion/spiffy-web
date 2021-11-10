import { Button, ButtonProps } from "react-bootstrap";
import React from "react";

import styles from "components/common/primaryButton/primaryButton.module.scss";

const PrimaryButton = (props: React.PropsWithChildren<ButtonProps>): JSX.Element =>
    <Button variant="warning" className={`white ${styles.primaryButton}`} {...props}>
        {props.children}
    </Button>;

export default PrimaryButton;