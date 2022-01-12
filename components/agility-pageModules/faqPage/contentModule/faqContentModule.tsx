/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Accordion, Nav, Navbar, Row, Stack } from "react-bootstrap";
import { ContentItem, ModuleProps } from "@agility/nextjs";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import agility from "@agility/content-fetch";
import React from "react";

import Breakpoints from "common/style/breakpoints";
import ContentCategory from "components/educationPage/contentSection/enums/contentCategory";
import flexbox from "utils/flexbox";
import IContentInfo from "types/IContentnfo";
import PrimaryButton from "components/common/primaryButton/primaryButton";
import useBreakpoint from "hooks/useBreakpoint";

import styles from "components/agility-pageModules/faqPage/contentModule/faqContentModule.module.scss";

const horizontalAlign = flexbox({ hAlign: "center", vAlign: "center" });

const FAQContentModule = (props: ModuleProps<any>): JSX.Element => {
    const [activeTab, setActiveTab] = React.useState<ContentCategory>(ContentCategory.payment);
    const breakpoint = useBreakpoint(Breakpoints.LG);
    const [expanded, setExpanded] = React.useState<boolean>(false);
    const [contentData, setContentData] = React.useState<{ items: ContentItem<IContentInfo>[] }>();

    const api = React.useMemo(() =>
        agility.getApi({
            guid: process.env.NEXT_PUBLIC_AGILITY_GUID,
            apiKey: process.env.NEXT_PUBLIC_AGILITY_API_PREVIEW_KEY,
            isPreview: true
        }), []);

    React.useEffect(() => {
        api.getContentList({
            referenceName: "FAQContentList",
            languageCode: "en-us",
            contentLinkDepth: 2,
            depth: 2,
            take: 50,
            filters: [{
                property: "fields.tag_TextField",
                operator: api.types.FilterOperators.EQUAL_TO,
                value: activeTab
            }]

        }).then((result) => {
            setContentData(result);
        });
    }, [api, activeTab]);

    return (
        <div className={styles.contentContainer}>
            <Stack
                className={`
                        ${styles.content}
                        align-items-center
                     `}
                gap={4}
            >
                <Row className={`${styles.contentHeading} w-100 text-start`}>
                    <h2>{props.module.fields.title}</h2>
                </Row>
            </Stack>
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
                        {props.module.fields.tags.map(content =>
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
            {contentData && contentData.items.map((post, index) =>
                <Accordion key={index}>
                    <Accordion.Item eventKey={index.toString()} >
                        <Accordion.Header>{post.fields.title}</Accordion.Header>
                        <Accordion.Body>
                            {post.fields.description}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            )}
        </div>
    );
};

export default FAQContentModule;
