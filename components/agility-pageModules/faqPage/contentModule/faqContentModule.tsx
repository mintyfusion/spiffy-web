import { Accordion, Nav, Navbar, Row, Stack } from "react-bootstrap";
import { ContentItem, ModuleProps, renderHTML } from "@agility/nextjs";
import { faCaretSquareLeft, faCaretSquareRight, faChevronLeft, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import { SearchContext } from "pages/[...slug]";
import api from "utils/api/api";
import Breakpoints from "common/style/breakpoints";
import ContentCategory from "components/agility-pageModules/educationPage/contentListModule/enums/contentCategory";
import flexbox from "utils/flexbox";
import IFaqContentModuleData from "components/agility-pageModules/faqPage/contentModule/interfaces/IFaqContentModuleData";
import IFaqContentModuleProps from "components/agility-pageModules/faqPage/contentModule/interfaces/IFaqContentModuleProps";
import PrimaryButton from "components/agility-pageModules/common/primaryButton/primaryButton";
import Spinner from "components/agility-pageModules/common/spinner/Spinner";
import useBoolean from "hooks/useBoolean";
import useBreakpoint from "hooks/useBreakpoint";

import styles from "components/agility-pageModules/faqPage/contentModule/faqContentModule.module.scss";

const horizontalAlign = flexbox({ hAlign: "center", vAlign: "center" });
const zeroPrefixLimit = 9;
const scrollAmount = 200;
const scrollParams = {
    top: 0,
    behavior: "smooth" as ScrollBehavior
};
const contentListParams = {
    contentLinkDepth: 2,
    depth: 2,
    take: 50
};

const FAQContentModule = (props: ModuleProps<IFaqContentModuleProps>): JSX.Element => {
    const [activeTab, setActiveTab] = React.useState<string>(ContentCategory.allTopics);
    const [contentData, setContentData] = React.useState<{ items: ContentItem<IFaqContentModuleData>[] }>();
    const breakpoint = useBreakpoint(Breakpoints.LG);
    const contentRef = React.useRef<HTMLDivElement>();
    const tabsRef = React.useRef<HTMLDivElement>();
    const data = React.useContext(SearchContext);
    const [expanded, { toggle: toggleExpanding }] = useBoolean(false);
    const [loading, { setTrue: setLoadingTrue, setFalse: setLoadingFalse }] = useBoolean(false);

    const handleArrowScrollLeft = React.useCallback(() => {
        tabsRef.current.scrollTo({ left: tabsRef.current.scrollLeft - scrollAmount, ...scrollParams });
    }, []);

    const handleArrowScrollRight = React.useCallback(() => {
        tabsRef.current.scrollTo({ left: tabsRef.current.scrollLeft + scrollAmount, ...scrollParams });
    }, []);

    const handleNavigation = React.useCallback(() => {
        breakpoint && toggleExpanding();
    }, [breakpoint, toggleExpanding]);

    const ContextAwareToggle = (props: React.PropsWithChildren<{ eventKey: string }>): JSX.Element =>
        <div className={` h-100 ${horizontalAlign} ${styles.customAccordianButton}`}>
            <div>
                <FontAwesomeIcon icon={faChevronLeft} width="20" height="35" />
                <FontAwesomeIcon icon={faChevronLeft} width="20" height="35" />
                {props.children}
            </div>
        </div>;

    const getFAQList = React.useCallback(async () => {
        setLoadingTrue();
        const result = await api.getContentList<IFaqContentModuleData>({
            referenceName: "FAQContentList",
            languageCode: "en-us",
            ...contentListParams
        }).finally(() => setLoadingFalse());

        return result;
    }, [setLoadingFalse, setLoadingTrue]);

    React.useEffect(() => {
        getFAQList()
            .then(result => setContentData(result))
            .catch((err: unknown) => err);
    }, [getFAQList]);

    const tags = React.useMemo(() => props.module.fields.tags.map(tag => tag.fields.name), [props.module.fields.tags]);

    const faqData = React.useMemo(() =>
        tags.map((tag, index) => {
            if (tag.toLowerCase().includes(ContentCategory.all.toLowerCase())) {
                return;
            } if (contentData?.items.filter(data => data.fields.tag.fields.name === tag).length === 0) {
                return <h1 className="text-center">No FAQ Found</h1>;
            }

            return (
                <React.Fragment key={index}>
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
                </React.Fragment>
            );
        }), [tags, contentData, activeTab]);

    React.useEffect(() => {
        data.searchValue && contentRef.current.scrollIntoView();
    }, [data.searchValue]);

    return (
        <div className={`${styles.contentContainer} px-2 px-md-5`}>
            <Stack className={`${styles.content} align-items-center`} gap={4}>
                <Row className={`${styles.contentHeading} w-100 text-start`}>
                    <h2>{props.module.fields.title}</h2>
                </Row>
            </Stack>
            {!data.searchValue &&
                <div className={`${horizontalAlign} gap-2 mb-1 mb-md-4`}>
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
                        <Navbar.Brand href="#home" className="d-block d-lg-none">
                            <label className="w-100">
                                {activeTab}
                            </label>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav">
                            <FontAwesomeIcon icon={faChevronUp} width="30" height="35" />
                        </Navbar.Toggle>
                        <hr className={`d-block d-lg-none w-100 ${styles.activeTab} opacity-100`} />
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
                    <FontAwesomeIcon
                        icon={faCaretSquareRight}
                        width="50"
                        height="50"
                        onClick={handleArrowScrollRight}
                        className={`${styles.tabArrow} ${breakpoint && "d-none"}`}
                    />
                </div>
            }
            <Stack className="gap-4" ref={contentRef}>
                {!loading && !contentData?.items.length
                    && <h1 className="text-center">No FAQ Found</h1>
                }
                {!loading
                    && contentData
                    && contentData.items
                        .filter(content => content.fields.title.indexOf(data.searchValue) >= 0)
                        .map((post, index) =>
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

                {loading && <Spinner className={horizontalAlign} />}
                {faqData.map((data, index) => <React.Fragment key={index}>{data}</React.Fragment>)}
            </Stack>
        </div>
    );
};

export default FAQContentModule;
