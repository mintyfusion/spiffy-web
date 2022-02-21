import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Nav, Navbar } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";
import SwiperCore, { Navigation, Pagination, Virtual } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Breakpoints from "common/style/breakpoints";
import flexbox from "utils/flexbox";
import ITabsStackProps from "components/agility-pageModules/common/tabsStack/interfaces/ITabsStackProps";
import PrimaryButton from "components/agility-pageModules/common/primaryButton/primaryButton";
import useBoolean from "hooks/useBoolean";
import useBreakpoint from "hooks/useBreakpoint";

import styles from "components/agility-pageModules/common/tabsStack/tabsStack.module.scss";

const rowCenter = flexbox({ hAlign: "center", vAlign: "center" });
const menuTabsPerView = 4;
const smallScreenTabsPerView = 3;

SwiperCore.use([Virtual, Navigation, Pagination]);

const TabsStack = (props: ITabsStackProps): JSX.Element => {
    const { activeTab, setActiveTab, tags } = props;
    const breakpoint = useBreakpoint(Breakpoints.LG);
    const tabletBreakpoint = useBreakpoint(Breakpoints.XXL);
    const tabsRef = React.useRef<HTMLDivElement>();
    const [expanded, { toggle: toggleExpanding }] = useBoolean(false);

    const handleNavigation = React.useCallback(() => {
        breakpoint && toggleExpanding();
    }, [breakpoint, toggleExpanding]);

    const tabData = React.useMemo(() =>
        tags.map(content =>
            <SwiperSlide key={content.fields.name}>
                <PrimaryButton
                    key={content.fields.name}
                    onClick={() => setActiveTab(content.fields.name)}
                    className={`
                          w-100
                          px-1
                          py-3 
                          ${styles.tab} 
                          ${activeTab === content.fields.name
                            ? styles.active
                            : styles.inactive}
                          ${rowCenter}
                             `}
                >
                    {content.fields.name.replace("_", " ")}
                </PrimaryButton>
            </SwiperSlide>
        ), [activeTab, setActiveTab, tags]);

    const tabsContainer = React.useMemo(() =>
        breakpoint
            ? <div className={`${rowCenter} gap-2 mb-1 mb-md-4 ${styles.tabsStackContainer}`}>
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
                            {tabData}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
            : <div className={`position-relative ${tags.length > menuTabsPerView && "px-5"} mb-1 mb-md-4`} >
                <Swiper
                    slidesPerView={tabletBreakpoint ? smallScreenTabsPerView : menuTabsPerView}
                    centeredSlides={false}
                    spaceBetween={30}
                    navigation={true}
                    virtual
                    className="position-static"
                >
                    {tabData}
                </Swiper>
            </div>, [activeTab, breakpoint, tabletBreakpoint, expanded, handleNavigation, tabData, tags?.length]);

    return (
        <>
            {tabsContainer}
        </>
    );
};

export default TabsStack;