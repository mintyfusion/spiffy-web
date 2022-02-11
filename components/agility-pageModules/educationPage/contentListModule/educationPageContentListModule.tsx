import { ContentItem, ModuleProps } from "@agility/nextjs";
import { faCaretSquareLeft, faCaretSquareRight, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Nav, Navbar, Row, Stack } from "react-bootstrap";
import React from "react";

import { SearchContext } from "pages/[...slug]";
import api from "utils/api/api";
import Breakpoints from "common/style/breakpoints";
import CardContainer from "components/agility-pageModules/common/cardContainer/cardContainer";
import ContentCategory from "components/agility-pageModules/educationPage/contentListModule/enums/contentCategory";
import FilterLogicTypes from "utils/api/enums/filterLogicTypes";
import FilterTypes from "utils/api/enums/filterTypes";
import flexbox from "utils/flexbox";
import ICardProps from "components/agility-pageModules/common/card/interfaces/ICardProps";
import IContentSectionProps from "components/agility-pageModules/educationPage/contentListModule/interfaces/IContentListProps";
import PrimaryButton from "components/agility-pageModules/common/primaryButton/primaryButton";
import Spinner from "components/agility-pageModules/common/spinner/Spinner";
import useBreakpoint from "hooks/useBreakpoint";

import styles from "components/agility-pageModules/educationPage/contentListModule/educationPageContentListModule.module.scss";

const horizontalAlign = flexbox({ hAlign: "center", vAlign: "center" });
const scrollAmount = 200;

const EducationPageContentListModule = (props: ModuleProps<IContentSectionProps>): JSX.Element => {
    const [activeTab, setActiveTab] = React.useState<string>(ContentCategory.all);
    const [expanded, setExpanded] = React.useState<boolean>(false);
    const [showMore, setShowMore] = React.useState({});
    const [contentData, setContentData] = React.useState<{ items: ContentItem<ICardProps>[]; totalCount: number }>();
    const [isLoading, setIsLoading] = React.useState<boolean>();
    const breakpoint = useBreakpoint(Breakpoints.LG);
    const data = React.useContext(SearchContext);
    const tabsRef = React.useRef<HTMLDivElement>();

    const handleArrowScrollLeft = React.useCallback(() => {
        tabsRef.current.scrollTo({ top: 0, left: tabsRef.current.scrollLeft - scrollAmount, behavior: "smooth" });
    }, [tabsRef]);

    const handleArrowScrollRight = React.useCallback(() => {
        tabsRef.current.scrollTo({ top: 0, left: tabsRef.current.scrollLeft + scrollAmount, behavior: "smooth" });
    }, [tabsRef]);

    const getContent = React.useCallback(async () => {
        setIsLoading(true);
        const result = !data.searchValue
            ? await api.getContentList<ICardProps>({
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
            }).finally(() => setIsLoading(false))
            : await api.getContentList<ICardProps>({
                referenceName: "EducationContent",
                languageCode: "en-us",
                contentLinkDepth: 2,
                depth: 2,
                take: 50,
                filters: [
                    {
                        property: "fields.title",
                        operator: FilterTypes.LIKE,
                        value: data.searchValue
                    },
                    {
                        property: "fields.tag_TextField",
                        operator: FilterTypes.LIKE,
                        value: data.searchValue
                    }
                ],
                filtersLogicOperator: FilterLogicTypes.OR
            }).finally(() => setIsLoading(false));

        return result;
    }, [activeTab, data.searchValue]);

    React.useEffect(() => {
        getContent()
            .then(result => {
                setIsLoading(true);
                setContentData({ items: [], totalCount: 0 });
                setContentData(result);
                setIsLoading(false);
            })
            .catch((err: unknown) => err);
    }, [getContent]);

    return (
        <div className={styles.contentContainer}>
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
                        onClick={() => breakpoint && setExpanded(!expanded)}
                        className={`overflow-hidden flex-grow-1 ${styles.navbar}`}
                        ref={tabsRef}
                    >
                        <Navbar.Brand href="#home" className="d-block d-lg-none">
                            <label className="w-100">
                                {activeTab.replace("_", " ")}
                            </label>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav">
                            <FontAwesomeIcon icon={faChevronUp} width="30" height="35" />
                        </Navbar.Toggle>
                        <hr className={`d-block d-lg-none w-100 ${styles.activeTab} opacity-100`} />
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
            }
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
                        <h2>{!data.searchValue ? content.fields.name.replace("_", " ") : "Search Results"}</h2>
                        <h5>
                            {!data.searchValue
                                ? props.module.fields.title
                                : `Showing search results for ${data.searchValue}`}
                        </h5>
                    </Row>
                    {isLoading && <Spinner className={horizontalAlign} />}
                    {!isLoading && !contentData?.items?.length
                        && <h1 className="text-center">No Blogs Found</h1>
                    }
                    {!isLoading && contentData && <CardContainer content={contentData} />}
                    {!isLoading &&
                        <Row>
                            {!showMore[content.fields.name] && !!contentData?.items?.length &&
                                <PrimaryButton
                                    onClick={() => setShowMore({ [content.fields.name]: true })}
                                >
                                    Show More
                                </PrimaryButton>}
                        </Row>}
                </Stack>
            )}
        </div>
    );
};

export default EducationPageContentListModule;