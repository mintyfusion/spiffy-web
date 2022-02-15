import { faCaretSquareLeft, faCaretSquareRight, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Nav, Navbar } from "react-bootstrap";
import React from "react";

import Breakpoints from "common/style/breakpoints";
import flexbox from "utils/flexbox";
import ITabsStackProps from "components/agility-pageModules/common/tabsStack/interfaces/ITabsStackProps";
import PrimaryButton from "components/agility-pageModules/common/primaryButton/primaryButton";
import useBoolean from "hooks/useBoolean";
import useBreakpoint from "hooks/useBreakpoint";

import styles from "components/agility-pageModules/common/tabsStack/tabsStack.module.scss";

const horizontalAlign = flexbox({ hAlign: "center", vAlign: "center" });
const scrollAmount = 200;
const scrollParams = {
    top: 0,
    behavior: "smooth" as ScrollBehavior
};

const TabsStack = (props: ITabsStackProps): JSX.Element => {
    const { activeTab, setActiveTab, tags } = props;
    const breakpoint = useBreakpoint(Breakpoints.LG);
    const tabsRef = React.useRef<HTMLDivElement>();
    const [expanded, { toggle: toggleExpanding }] = useBoolean(false);

    const handleArrowScrollLeft = React.useCallback(() => {
        tabsRef.current.scrollTo({ left: tabsRef.current.scrollLeft - scrollAmount, ...scrollParams });
    }, []);

    const handleArrowScrollRight = React.useCallback(() => {
        tabsRef.current.scrollTo({ left: tabsRef.current.scrollLeft + scrollAmount, ...scrollParams });
    }, []);

    const handleNavigation = React.useCallback(() => {
        breakpoint && toggleExpanding();
    }, [breakpoint, toggleExpanding]);

    return (
        <div className={`${horizontalAlign} gap-2 mb-1 mb-md-4 ${styles.tabsStackContainer}`}>
            <FontAwesomeIcon
                icon={faCaretSquareLeft}
                width="50"
                height="50"
                onClick={handleArrowScrollLeft}
                id="arrowScrollLeft"
                className={`${styles.tabArrow} ${breakpoint && "d-none"}`}
            />
            <Navbar
                bg={styles.dirtyWhite}
                expand="lg"
                expanded={expanded}
                onClick={handleNavigation}
                className={`overflow-hidden ${styles.navbar} flex-grow-1`}
                ref={tabsRef}
            >
                <Navbar.Brand className="d-block d-lg-none">
                    <label className="w-100">
                        {activeTab.replace("_", " ")}
                    </label>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav">
                    <FontAwesomeIcon icon={faChevronUp} width="30" height="35" />
                </Navbar.Toggle>
                <hr className={`d-block d-lg-none w-100 ${styles.activeTab} opacity-100`} />
                <Navbar.Collapse>
                    <Nav className={`me-auto ${!breakpoint && "gap-4"} w-100`}>
                        {tags.map(content =>
                            <PrimaryButton
                                key={content.fields.name}
                                onClick={() => setActiveTab(content.fields.name)}
                                className={`
                                w-100
                                px-1
                                py-3 
                                ${styles.tab} 
                                ${props.activeTab === content.fields.name
                                        ? styles.active
                                        : styles.inactive}
                                ${horizontalAlign}
                             `}
                            >
                                {content.fields.name.replace("_", " ")}
                            </PrimaryButton>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <FontAwesomeIcon
                icon={faCaretSquareRight}
                width="50"
                height="50"
                onClick={handleArrowScrollRight}
                className={`${styles.tabArrow} ${breakpoint && "d-none"}`}
            />
        </div>
    );
};

export default TabsStack;