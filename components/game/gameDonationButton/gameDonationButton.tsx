import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Nav, Navbar } from "react-bootstrap";
import React from "react";

import styles from "components/game/gameDonationButton/gameDonationButton.module.scss";

import Breakpoints from "common/style/breakpoints";
import IGameDonationButtonProps from "components/game/gameDonationButton/interfaces/IGameDonationButtonProps";
import useBreakpoint from "hooks/useBreakpoint";

const GameDonationButton = (props: IGameDonationButtonProps): JSX.Element => {
    const isLG = useBreakpoint(Breakpoints.LG);

    return <Navbar
        expand="lg"
        className="w-100 d-block text-center"
        expanded={props.expanded}
        onClick={isLG ? props.navToggle : undefined}>
        <Navbar.Brand className="d-lg-none">{props.selected}</Navbar.Brand>
        <Navbar.Toggle className={styles.navToggle}>
            <FontAwesomeIcon icon={faChevronDown} width="30" height="35" />
        </Navbar.Toggle>
        <hr className={`d-block d-lg-none w-100 ${styles.activeTab} opacity-100`} />
        <Navbar.Collapse>
            <Nav className={`me-auto ${!isLG && "gap-4"} w-100`}>
                {props.Amount}
            </Nav>
        </Navbar.Collapse>
    </Navbar>;
};

export default GameDonationButton;