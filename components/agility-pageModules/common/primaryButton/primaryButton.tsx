import { Button } from "react-bootstrap";
import Image from "next/image";
import React, { PropsWithChildren } from "react";

import flexbox from "utils/flexbox";
import getStartedArrow from "public/images/homepage/get-started-section/getstarted-arrow.svg";
import IPrimaryButtonProps from "components/agility-pageModules/common/primaryButton/interfaces/IPrimaryButtonProps";
import Link from "components/agility-pageModules/common/link/link";

import styles from "components/agility-pageModules/common/primaryButton/primaryButton.module.scss";

const rowCenter = flexbox({ vAlign: "center", hAlign: "center" });

const PrimaryButton = ({ showArrow, linkProps, ...props }: PropsWithChildren<IPrimaryButtonProps>): JSX.Element => {
    const btn = (
        <Button
            variant="warning"
            {...props}
            className={`
                ${showArrow ? styles.sectionButton : styles.primaryButton} 
                position-relative
                ${props.className}
            `}
        >
            {props.children}
            {showArrow &&
                <label className={`${rowCenter} position-absolute bg-white`}>
                    <Image src={getStartedArrow} layout="fill" />
                </label>}
        </Button>
    );

    return linkProps
        ? <Link {...linkProps}>{btn}</Link>
        : btn;
};

PrimaryButton.defaultProps = {
    showArrow: false
};

export default PrimaryButton;