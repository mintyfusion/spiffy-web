import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Nav, Navbar } from "react-bootstrap";
import React from "react";

import Breakpoints from "common/style/breakpoints";
import flexbox from "utils/flexbox";
import IButtonListProps from "components/common/buttonList/interfaces/IButtonListProps";
import PrimaryButton from "components/common/primaryButton/primaryButton";
import useBoolean from "hooks/useBoolean";
import useBreakpoint from "hooks/useBreakpoint";

import styles from "components/common/buttonList/buttonList.module.scss";

const horizontalAlign = flexbox({ hAlign: "center", vAlign: "center" });

const ButtonList = (props: IButtonListProps): JSX.Element => {
    const [expanded, { toggle: navToggle }] = useBoolean(false);
    const isLG = useBreakpoint(Breakpoints.LG);

    const selected: string = props.selected;
    const valuePrefix: string = props.valuePrefix;
    const valueSuffix: string = props.valueSuffix;

    const donationCycle = React.useMemo(() =>
        props.lisItems.map((donation) =>
            <PrimaryButton
                key={donation}
                onClick={() => props.onButtonClick(donation)}
                className={`
              ${horizontalAlign} 
              ${styles.donationButton}
              ${donation === selected ? styles.active : styles.inactive}
              w-100 px-1 py-3`}
            >
                {`${valuePrefix ? valuePrefix : ""}${donation}${valueSuffix ? valueSuffix : ""}`}

            </PrimaryButton>
        ), [selected, valuePrefix, valueSuffix]);

    return <Navbar
        expand="lg"
        className={`${styles.nav} w-100 d-block text-center position-relative`}
        expanded={expanded}
        onClick={isLG ? navToggle : undefined}>
        <Navbar.Brand className="d-lg-none">{`${valuePrefix ? valuePrefix : ""}${selected}${valueSuffix ? valueSuffix : ""}`}</Navbar.Brand>
        <Navbar.Toggle className={styles.navToggle}>
            <FontAwesomeIcon icon={faChevronDown} width="30" height="35" />
        </Navbar.Toggle>
        <hr className={`d-block d-lg-none w-100 ${styles.activeTab} opacity-100`} />
        <Navbar.Collapse>
            <Nav className={`me-auto ${!isLG && "gap-4"} w-100`}>
                {donationCycle}
            </Nav>
        </Navbar.Collapse>
    </Navbar>;
};

export default ButtonList;