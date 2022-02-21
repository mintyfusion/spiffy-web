import { Accordion, Row, Stack } from "react-bootstrap";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModuleProps } from "@agility/nextjs";
import dynamic from "next/dynamic";
import React from "react";

import { SearchContext } from "pages/[...slug]";
import ContentCategory from "components/agility-pageModules/educationPage/contentListModule/enums/contentCategory";
import flexbox from "utils/flexbox";
import IFaqContentModuleData from "components/agility-pageModules/faqPage/contentModule/interfaces/IFaqContentModuleData";
import IFaqContentModuleProps from "components/agility-pageModules/faqPage/contentModule/interfaces/IFaqContentModuleProps";
import renderHtml from "utils/renderHtml";
import useGetContentList from "hooks/useGetContentList";

import styles from "components/agility-pageModules/faqPage/contentModule/faqContentModule.module.scss";

const Spinner = dynamic(() => import("components/agility-pageModules/common/spinner/Spinner"));
const TabsStack = dynamic(() => import("components/agility-pageModules/common/tabsStack/tabsStack"));

const rowCenter = flexbox({ hAlign: "center", vAlign: "center" });
const zeroPrefixLimit = 9;

const contentListParams = {
    languageCode: "en-us",
    contentLinkDepth: 2,
    depth: 2,
    take: 50
};

const FAQContentModule = (props: ModuleProps<IFaqContentModuleProps>): JSX.Element => {
    const [activeTab, setActiveTab] = React.useState<string>(ContentCategory.allTopics);
    const contentRef = React.useRef<HTMLDivElement>();
    const data = React.useContext(SearchContext);

    const ContextAwareToggle = (props: React.PropsWithChildren<{ eventKey: string }>): JSX.Element =>
        <div className={` h-100 ${rowCenter} ${styles.customAccordianButton}`}>
            <div>
                <FontAwesomeIcon icon={faChevronLeft} width="20" height="35" />
                <FontAwesomeIcon icon={faChevronLeft} width="20" height="35" />
                {props.children}
            </div>
        </div>;

    const finalParams = React.useMemo(() => ({
        referenceName: "FAQContentList",
        ...contentListParams
    }), []);

    const [{ isLoading, data: resultData }] = useGetContentList<IFaqContentModuleData>(finalParams);

    const tags = React.useMemo(() => props.module.fields.tags.map(tag => tag.fields.name), [props.module.fields.tags]);

    const faqData = React.useMemo(() =>
        tags.map((tag, index) => {
            if (tag.toLowerCase().includes(ContentCategory.all.toLowerCase())) {
                return;
            } if (resultData?.items.filter(data => data.fields.tag.fields.name === tag).length === 0) {
                return <h1 className="text-center">No FAQ Found</h1>;
            }

            return (
                <React.Fragment key={index}>
                    {resultData
                        && resultData.items.filter(data => data.fields.tag.fields.name === tag).map((post, index) =>
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
                                        <div dangerouslySetInnerHTML={renderHtml(post.fields.description)} />
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        )}
                </React.Fragment>
            );
        }), [tags, resultData, activeTab]);

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
            {!data.searchValue
                && <TabsStack activeTab={activeTab} setActiveTab={setActiveTab} tags={props.module.fields.tags} />
            }
            <Stack className="gap-4" ref={contentRef}>
                {!isLoading && !resultData?.items.length
                    && <h1 className="text-center">No FAQ Found</h1>
                }
                {!isLoading
                    && resultData
                    && resultData.items
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
                                        <div dangerouslySetInnerHTML={renderHtml(post.fields.description)} />
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        )}

                {isLoading && <Spinner className={rowCenter} />}
                {faqData.map((data, index) => <React.Fragment key={index}>{data}</React.Fragment>)}
            </Stack>
        </div>
    );
};

export default FAQContentModule;
