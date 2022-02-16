import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Nav, Navbar } from "react-bootstrap";
import React from "react";

import Breakpoints from "common/style/breakpoints";
import flexbox from "utils/flexbox";
import IGameDonationButtonProps from "components/game/gameDonationButton/interfaces/IGameDonationButtonProps";
import PrimaryButton from "components/common/primaryButton/primaryButton";
import useBoolean from "hooks/useBoolean";
import useBreakpoint from "hooks/useBreakpoint";

import styles from "components/game/gameDonationButton/gameDonationButton.module.scss";

const horizontalAlign = flexbox({ hAlign: "center", vAlign: "center" });

const GameDonationButton = (props: IGameDonationButtonProps): JSX.Element => {
    const [expanded, { toggle: navToggle }] = useBoolean(false);
    const isLG = useBreakpoint(Breakpoints.LG);

    const selected: string = props.selected;
    const amount: boolean = props.amount;

    const donationCycle = React.useMemo(() =>
        props.lisItems.map((donation) =>
            <PrimaryButton
                key={donation}
                onClick={() => props.onClickHandler(donation)}
                className={`
              ${horizontalAlign} 
              ${styles.donationButton}
              ${donation === selected ? styles.active : styles.inactive}
              w-100 px-1 py-3`}
            >
                {amount ? `$${donation}` : `${donation}%`}
            </PrimaryButton>
        ), [selected, amount]);

    return <Navbar
        expand="lg"
        className={`${styles.nav} w-100 d-block text-center position-relative`}
        expanded={expanded}
        onClick={isLG ? navToggle : undefined}>
        <Navbar.Brand className="d-lg-none">{props.amount ? `$${props.selected}` : `${props.selected}%`}</Navbar.Brand>
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

export default GameDonationButton;