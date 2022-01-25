import { Accordion, Nav, Navbar, Row, Stack } from "react-bootstrap";
import { ContentItem, ModuleProps, renderHTML } from "@agility/nextjs";
import { faChevronLeft, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import api from "utils/api/api";
import Breakpoints from "common/style/breakpoints";
import ContentCategory from "components/agility-pageModules/educationPage/contentListModule/enums/contentCategory";
import flexbox from "utils/flexbox";
import IFaqContentModuleData from "components/agility-pageModules/faqPage/contentModule/interfaces/IFaqContentModuleData";
import IFaqContentModuleProps from "components/agility-pageModules/faqPage/contentModule/interfaces/IFaqContentModuleProps";
import PrimaryButton from "components/common/primaryButton/primaryButton";
import useBreakpoint from "hooks/useBreakpoint";

import styles from "components/agility-pageModules/faqPage/contentModule/faqContentModule.module.scss";

const horizontalAlign = flexbox({ hAlign: "center", vAlign: "center" });
const zeroPrefixLimit = 9;

const FAQContentModule = (props: ModuleProps<IFaqContentModuleProps>): JSX.Element => {
    const [activeTab, setActiveTab] = React.useState<ContentCategory>(ContentCategory.allTopics);
    const breakpoint = useBreakpoint(Breakpoints.LG);
    const [expanded, setExpanded] = React.useState<boolean>(false);
    const [contentData, setContentData] = React.useState<{ items: ContentItem<IFaqContentModuleData>[] }>();
    const [isLoading, setIsLoading] = React.useState<boolean>();

    const ContextAwareToggle = (props: React.PropsWithChildren<{ eventKey: string }>): JSX.Element =>
        <div className={` h-100 ${horizontalAlign} ${styles.customAccordianButton}`}>
            <div>
                <FontAwesomeIcon icon={faChevronLeft} width="20" height="35" />
                <FontAwesomeIcon icon={faChevronLeft} width="20" height="35" />
                {props.children}
            </div>
        </div>;

    const getFAQList = React.useCallback(async () => {
        setIsLoading(true);
        const result = await api.getContentList<IFaqContentModuleData>({
            referenceName: "FAQContentList",
            languageCode: "en-us",
            contentLinkDepth: 2,
            depth: 2,
            take: 50
        }).finally(() => setIsLoading(false));

        return result;
    }, []);

    React.useEffect(() => {
        getFAQList()
            .then(result => setContentData(result))
            .catch((err: unknown) => err);
    }, [getFAQList]);

    const tags = props.module.fields.tags.map(tag => tag.fields.name);

    const data = React.useMemo(() =>
        tags.map((tag) => {
            if (tag === ContentCategory.all) {
                return;
            }

            return (
                <>
                    {contentData
                        && contentData.items.filter(data => data.fields.tag.fields.name === tag).map((post, index) =>
                            <Accordion key={`${tag} ${index}`} className={`${styles.accordion} ${tag !== activeTab && "d-none"}`}>
                                <Accordion.Item eventKey={`${tag} ${index}`} className="position-relative border-0">
                                    <Accordion.Header className={styles.accordianHeader}>
                                        <Stack className="gap-1 gap-md-4 w-100" direction="horizontal">
                                            <div className={`${styles.faqIndex} p-3`}>
                                                {`${index < zeroPrefixLimit ? "0" : ""}${index + 1}`}
                                            </div>
                                            <div className="w-100 p-2">{post.fields.title}</div>
                                            <ContextAwareToggle eventKey={`${tag} ${index}`} />
                                        </Stack>
                                    </Accordion.Header>
                                    <Accordion.Body className={styles.accordianBody}>
                                        <div dangerouslySetInnerHTML={renderHTML(post.fields.description)} />
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        )}
                </>
            );
        }), [tags, contentData, activeTab]);

    return (
        <div className={`${styles.contentContainer} px-2 px-md-5`}>
            <Stack className={`${styles.content} align-items-center`} gap={4}>
                <Row className={`${styles.contentHeading} w-100 text-start`}>
                    <h2>{props.module.fields.title}</h2>
                </Row>
            </Stack>
            <Navbar
                bg={styles.dirtyWhite}
                expand="lg"
                expanded={expanded}
                onClick={() => breakpoint && setExpanded(!expanded)}
                className={`mb-1 mb-md-4 overflow-auto ${styles.navbar}`}
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
            <Stack className="gap-4">
                {!isLoading && !contentData?.items.length
                    && <h1 className="text-center">No FAQ Found</h1>
                }
                {!isLoading && contentData && contentData.items.map((post, index) =>
                    <Accordion
                        key={index}
                        className={`${styles.accordion} ${activeTab !== ContentCategory.allTopics && "d-none"}`}
                    >
                        <Accordion.Item eventKey={index.toString()} className="position-relative border-0">
                            <Accordion.Header className={styles.accordianHeader}>
                                <Stack className="gap-1 gap-md-4 w-100" direction="horizontal">
                                    <div className={`${styles.faqIndex} p-3`}>
                                        {`${index < zeroPrefixLimit ? "0" : ""}${index + 1}`}
                                    </div>
                                    <div className="w-100 p-2">{post.fields.title}</div>
                                    <ContextAwareToggle eventKey={index.toString()} />
                                </Stack>
                            </Accordion.Header>
                            <Accordion.Body className={styles.accordianBody}>
                                <div dangerouslySetInnerHTML={renderHTML(post.fields.description)} />
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                )}
                {data.map(data => data)}
            </Stack>
        </div>
    );
};

export default FAQContentModule;
