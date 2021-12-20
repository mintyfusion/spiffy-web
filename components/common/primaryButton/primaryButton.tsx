import { Button } from "react-bootstrap";
import Image from "next/image";
import React, { PropsWithChildren } from "react";

import flexbox from "utils/flexbox";
import getStartedArrow from "public/images/homepage/get-started-section/getstarted-arrow.svg";
import IPrimaryButtonProps from "components/common/primaryButton/interfaces/IPrimaryButtonProps";
import Link from "components/common/link/link";

import styles from "components/common/primaryButton/primaryButton.module.scss";

const rowCenter = flexbox({ vAlign: "center", hAlign: "center" });

const PrimaryButton = ({ showArrow, ...props }: PropsWithChildren<IPrimaryButtonProps>): JSX.Element =>
    <Link href={props.href}>
        <Button
            variant="warning"
            {...props}
            className={`
                ${props.className} 
                ${showArrow ? styles.sectionButton : styles.primaryButton} 
                position-relative
            `}
        >
            {props.children}
            {showArrow &&
                <label className={`${rowCenter} position-absolute bg-white`}>
                    <Image src={getStartedArrow} layout="fill" />
                </label>}
        </Button>
    </Link>;

PrimaryButton.defaultProps = {
    showArrow: false
};

export default PrimaryButton;