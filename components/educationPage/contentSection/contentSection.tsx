import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Nav, Navbar, Row, Stack } from "react-bootstrap";
import React from "react";

import Breakpoints from "common/style/breakpoints";
import CardContainer from "components/common/cardContainer/cardContainer";
import ContentCategory from "components/educationPage/contentSection/enums/contentCategory";
import flexbox from "utils/flexbox";
import IContentSectionProps from "components/educationPage/contentSection/interfaces/IContentSectionProps";
import PrimaryButton from "components/common/primaryButton/primaryButton";
import useBreakpoint from "hooks/useBreakpoint";

import styles from "components/educationPage/contentSection/contentSection.module.scss";

const cardsOnView = 6;
const horizontalAlign = flexbox({ hAlign: "center", vAlign: "center" });

const ContentSection = (props: IContentSectionProps): JSX.Element => {
    const [activeTab, setActiveTab] = React.useState<ContentCategory>(ContentCategory.all);
    const [expanded, setExpanded] = React.useState<boolean>(false);
    const [showMore, setShowMore] = React.useState({});
    const breakpoint = useBreakpoint(Breakpoints.LG);

    const filterContent = React.useCallback((key: string) => {
        if (activeTab === ContentCategory.all) {
            return (
                showMore[ContentCategory.all]
                    ? props.content.map(data =>
                        data.cardContent).flat()
                    : props.content.map(data =>
                        data.cardContent).flat().splice(0, cardsOnView)
            );
        }

        return (
            showMore[key]
                ? props.content.filter(data => data.key === key).map(data =>
                    data.cardContent).flat()
                : props.content.filter(data => data.key === key).map(data =>
                    data.cardContent).flat().splice(0, cardsOnView)
        );
    }, [props.content, activeTab, showMore]);

    return (
        <div className={styles.contentContainer}>
            <Navbar
                bg={styles.dirtyWhite}
                expand="lg"
                expanded={expanded}
                onClick={() => breakpoint && setExpanded(!expanded)}
                className="mb-1 mb-md-4"
            >
                <Navbar.Brand href="#home">
                    <label className="d-block d-lg-none w-100">
                        {activeTab}
                    </label>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav">
                    <FontAwesomeIcon icon={faChevronUp} width="30" height="35" />
                </Navbar.Toggle>
                <hr className={`d-block d-lg-none w-100 ${styles.activeTab} opacity-1`} />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className={`me-auto ${!breakpoint && "gap-4"} w-100`}>
                        {props.content.map(content =>
                            <PrimaryButton
                                key={content.key}
                                onClick={() => setActiveTab(content.key)}
                                className={`
                                w-100
                                px-1
                                py-3 
                                ${styles.tab} 
                                ${activeTab === content.key
                                        ? styles.active
                                        : styles.inactive}
                                ${horizontalAlign}
                             `}
                            >
                                {content.key}
                            </PrimaryButton>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {props.content.map(content =>
                <Stack
                    className={`
                        ${styles.content}
                        align-items-center
                        ${content.key !== activeTab && "d-none"}
                     `}
                    gap={4}
                    key={content.key}
                >
                    <Row className={`${styles.contentHeading} w-100 text-center`}>
                        <h2>{content.title}</h2>
                        <h5>{content.description}</h5>
                    </Row>
                    <CardContainer content={filterContent(content.key)} />
                    <Row>
                        {!showMore[content.key] &&
                            <PrimaryButton
                                onClick={() => setShowMore({ [content.key]: true })}
                            >
                                Show More
                            </PrimaryButton>}
                    </Row>
                </Stack>
            )}
        </div>
    );
};

export default ContentSection;