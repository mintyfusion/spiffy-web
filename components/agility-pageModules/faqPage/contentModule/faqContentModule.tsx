import { Accordion, Row, Stack } from "react-bootstrap";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModuleProps } from "@agility/nextjs";
import dynamic from "next/dynamic";
import React from "react";

import { SearchContext } from "pages/[...slug]";
import agilityTagGenerator from "utils/agilityTag";
import ContentCategory from "components/agility-pageModules/educationPage/contentListModule/enums/contentCategory";
import flexbox from "utils/flexbox";
import IFaqContentModuleProps from "components/agility-pageModules/faqPage/contentModule/interfaces/IFaqContentModuleProps";
import renderHtml from "utils/renderHtml";

import styles from "components/agility-pageModules/faqPage/contentModule/faqContentModule.module.scss";

const Message = dynamic(() => import("components/agility-pageModules/common/message/message"));
const TabsStack = dynamic(() => import("components/agility-pageModules/common/tabsStack/tabsStack"));

const rowCenter = flexbox({ hAlign: "center", vAlign: "center" });
const zeroPrefixLimit = 9;

const FAQContentModule = (props: ModuleProps<IFaqContentModuleProps>): JSX.Element => {
    const [activeTab, setActiveTab] = React.useState<string>(ContentCategory.all);
    const contentRef = React.useRef<HTMLDivElement>();
    const data = React.useContext(SearchContext);
    const ContextAwareToggle = (props: React.PropsWithChildren<{ eventKey: string }>): JSX.Element =>
        <div className={` h-100 ${rowCenter} ${styles.customAccordianButton}`}>
            <div>
                <FontAwesomeIcon icon={faChevronLeft} width="15" height="30" />
                <FontAwesomeIcon icon={faChevronLeft} width="15" height="30" />
                {props.children}
            </div>
        </div>;

    const resultData = React.useMemo(() => props.module.fields.faqList, [props.module.fields.faqList]);

    const tags = React.useMemo(() => props.module.fields.tags.map(tag => tag.fields.name), [props.module.fields.tags]);

    const faqData = React.useMemo(() =>
        tags.map((tag, index) => {
            if (tag.toLowerCase().includes(ContentCategory.all.toLowerCase())) {
                return;
            } if (resultData?.filter(data => data.fields.tag.fields.name === tag).length === 0) {
                return <Message message="No FAQ Found" error />;
            }

            return (
                <React.Fragment key={index}>
                    {resultData
                        && resultData.filter(data => data.fields.tag.fields.name === tag).map((post, index) =>
                            <Accordion key={`${tag} ${index}`} className={`${styles.accordion} ${tag !== activeTab && "d-none"}`}>
                                <Accordion.Item eventKey={`${tag} ${index}`} className="position-relative border-0">
                                    <Accordion.Header className={styles.accordianHeader}>
                                        <Stack className={`${styles.headerInner} gap-1 gap-md-4 w-100`} direction="horizontal">
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

    const tabs = React.useMemo(() => agilityTagGenerator(props.module.fields.tags),
        [props.module.fields.tags]);

    return (
        <div className={`${styles.contentContainer} px-2 px-md-5`} ref={contentRef}>
            <Stack className={`${styles.content} align-items-center`}>
                <Row className={`${styles.contentHeading} w-100 text-start`} >
                    <h2>{props.module.fields.title}</h2>
                </Row>
            </Stack>
            {!data.searchValue
                && <TabsStack
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    tabs={tabs}
                />
            }
            <Stack className={styles.faqAccordionContainer}>
                {resultData
                    && resultData
                        .filter(content => content.fields.title.indexOf(data.searchValue) >= 0)
                        .map((post, index) =>
                            <Accordion
                                key={index}
                                className={`${styles.accordion} ${activeTab !== ContentCategory.all && "d-none"}`}
                            >
                                <Accordion.Item eventKey={index.toString()} className="position-relative border-0">
                                    <Accordion.Header className={styles.accordianHeader}>
                                        <Stack className="w-100" direction="horizontal">
                                            <div className={`${styles.faqIndex} p-3`}>
                                                {`${index < zeroPrefixLimit ? "0" : ""}${index + 1}`}
                                            </div>
                                            <div className="w-100 p-2">{post.fields.title}</div>
                                            <ContextAwareToggle eventKey={index.toString()} />
                                        </Stack>
                                    </Accordion.Header>
                                    <Accordion.Body className={styles.accordianBody}>
                                        <div
                                            dangerouslySetInnerHTML={renderHtml(post.fields.description)}
                                            className={styles.accordianBodyInner}
                                        />
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        )}

                {!resultData?.length
                    || data.searchValue
                    && resultData?.filter(content => content.fields.title.indexOf(data.searchValue) !== -1).length === 0
                    && <Message message="No FAQ Found" error />
                }
                {faqData.map((data, index) => <React.Fragment key={index}>{data}</React.Fragment>)}
            </Stack>
        </div>
    );
};

export default FAQContentModule;
