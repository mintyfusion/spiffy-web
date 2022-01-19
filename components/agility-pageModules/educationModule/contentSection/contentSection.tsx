import { ContentItem, ModuleProps } from "@agility/nextjs";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Nav, Navbar, Row, Stack } from "react-bootstrap";
import React from "react";

import api from "utils/api/api";
import Breakpoints from "common/style/breakpoints";
import CardContainer from "components/agility-pageModules/common/cardContainer/cardContainer";
import ContentCategory from "components/educationPage/contentSection/enums/contentCategory";
import FilterTypes from "utils/api/enums/filterTypes";
import flexbox from "utils/flexbox";
import ICardProps from "components/agility-pageModules/common/card/interfaces/ICardProps";
import IContentSectionProps from "components/agility-pageModules/educationModule/contentSection/interfaces/IContentSectionProps";
import PrimaryButton from "components/common/primaryButton/primaryButton";
import useBreakpoint from "hooks/useBreakpoint";

import styles from "components/educationPage/contentSection/contentSection.module.scss";

const horizontalAlign = flexbox({ hAlign: "center", vAlign: "center" });

const ContentSection = (props: ModuleProps<IContentSectionProps>): JSX.Element => {
    const [activeTab, setActiveTab] = React.useState<ContentCategory>(ContentCategory.all);
    const [expanded, setExpanded] = React.useState<boolean>(false);
    const [showMore, setShowMore] = React.useState({});
    const breakpoint = useBreakpoint(Breakpoints.LG);
    const [contentData, setContentData] = React.useState<{ items: ContentItem<ICardProps>[]; totalCount: number }>();

    const getContent = React.useCallback(async () => {
        const result = await api.getContentList<ICardProps>({
            referenceName: "EducationContent",
            languageCode: "en-us",
            contentLinkDepth: 2,
            depth: 2,
            take: 50,
            filters: activeTab !== ContentCategory.all && [
                {
                    property: "fields.tag_TextField",
                    operator: FilterTypes.EQUAL_TO,
                    value: activeTab
                }
            ]
        });

        return result;
    }, [activeTab]);

    React.useEffect(() => {
        getContent()
            .then(result => setContentData(result))
            .catch((err: unknown) => err);
    }, [getContent]);

    return (
        <div className={styles.contentContainer}>
            <Navbar
                bg={styles.dirtyWhite}
                expand="lg"
                expanded={expanded}
                onClick={() => breakpoint && setExpanded(!expanded)}
                className="mb-1 mb-md-4"
            >
                <Navbar.Brand href="#home" className="d-block d-lg-none">
                    <label className="w-100">
                        {activeTab}
                    </label>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav">
                    <FontAwesomeIcon icon={faChevronUp} width="30" height="35" />
                </Navbar.Toggle>
                <hr className={`d-block d-lg-none w-100 ${styles.activeTab} opacity-1`} />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className={`me-auto ${!breakpoint && "gap-4"} w-100`}>
                        {props.module.fields.educationTags.map(content =>
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
                                ${horizontalAlign}
                             `}
                            >
                                {content.fields.name}
                            </PrimaryButton>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {props.module.fields.educationTags.map(content =>
                <Stack
                    className={`
                        ${styles.content}
                        align-items-center
                        ${content.fields.name !== activeTab && "d-none"}
                     `}
                    gap={4}
                    key={content.fields.name}
                >
                    <Row className={`${styles.contentHeading} w-100 text-center`}>
                        <h2>{content.fields.name}</h2>
                        <h5>{props.module.fields.title}</h5>
                    </Row>
                    <CardContainer content={contentData} />
                    <Row>
                        {!showMore[content.fields.name] &&
                            <PrimaryButton
                                onClick={() => setShowMore({ [content.fields.name]: true })}
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