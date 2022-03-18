import { ContentItem, ModuleProps } from "@agility/nextjs";
import { Row, Stack } from "react-bootstrap";
import dynamic from "next/dynamic";
import React from "react";

import { SearchContext } from "pages/[...slug]";
import agilityTagGenerator from "utils/agilityTag";
import CardPlaceHolder from "components/agility-pageModules/common/cardPlaceholder/cardPlaceholder";
import ContentCategory from "components/agility-pageModules/educationPage/contentListModule/enums/contentCategory";
import FilterLogicTypes from "utils/api/enums/filterLogicTypes";
import FilterTypes from "utils/api/enums/filterTypes";
import flexbox from "utils/flexbox";
import ICardProps from "components/agility-pageModules/common/card/interfaces/ICardProps";
import IContentSectionProps from "components/agility-pageModules/educationPage/contentListModule/interfaces/IContentListProps";
import PrimaryButton from "components/agility-pageModules/common/primaryButton/primaryButton";
import Spinner from "components/agility-pageModules/common/spinner/Spinner";
import TabsStack from "components/agility-pageModules/common/tabsStack/tabsStack";
import useGetContentList from "hooks/useGetContentList";

import styles from "components/agility-pageModules/educationPage/contentListModule/educationPageContentListModule.module.scss";

const Message = dynamic(() => import("components/agility-pageModules/common/message/message"));
const CardContainer = dynamic(() => import("components/agility-pageModules/common/cardContainer/cardContainer"));

const horizontalAlign = flexbox({ hAlign: "center", vAlign: "center" });

const defaultCards = 18;

const EducationPageContentListModule = (props: ModuleProps<IContentSectionProps>): JSX.Element => {
    const [activeTab, setActiveTab] = React.useState<string>(ContentCategory.all);
    const [noOfCards, setNoOfCards] = React.useState(defaultCards);
    const [showMore, setShowMore] = React.useState({});
    const [finalCards, setFinalCards] = React.useState<ContentItem<ICardProps>[]>();
    const searchData = React.useContext(SearchContext);
    const searchFilterParams = React.useMemo(() => ({
        operator: FilterTypes.LIKE,
        value: `"${searchData.searchValue}"`
    }), [searchData.searchValue]);

    const finalParams = React.useMemo(() => ({
        referenceName: "EducationContent",
        languageCode: "en-us",
        contentLinkDepth: 2,
        depth: 2,
        take: noOfCards,
        filters: !searchData.searchValue
            ? activeTab !== ContentCategory.all && [
                {
                    property: "fields.tag_TextField",
                    operator: FilterTypes.EQUAL_TO,
                    value: activeTab
                }]
            : [
                {
                    property: "fields.title",
                    ...searchFilterParams
                },
                {
                    property: "fields.tag_TextField",
                    ...searchFilterParams
                }
            ],
        filtersLogicOperator: FilterLogicTypes.OR
    }), [activeTab, searchData.searchValue, searchFilterParams, noOfCards]);

    const [{ isLoading, data: resultData }] = useGetContentList<ICardProps>(finalParams);
    const handleShowMore = React.useCallback((name: string) => {
        if (resultData.totalCount > resultData.items.length) {
            const remainingItems = Math.min(resultData.totalCount - resultData.items.length, defaultCards);
            setNoOfCards(resultData.items.length + remainingItems);
            setShowMore({ [name]: true });
        }
    }, [resultData]);

    React.useEffect(() => {
        setFinalCards(resultData?.items);
    }, [resultData]);

    React.useEffect(() => {
        setFinalCards([]);
        setNoOfCards(defaultCards);
        setShowMore({});
    }, [activeTab]);

    const tabs = React.useMemo(() => agilityTagGenerator(props.module.fields.educationTags),
        [props.module.fields.educationTags]);

    return (
        <div className={styles.contentContainer}>
            {!searchData.searchValue &&
                <TabsStack
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    tabs={tabs}
                />
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
                        <h2>{!searchData.searchValue ? content.fields.name.replace("_", " ") : "Search Results"}</h2>
                        <h5 className="mb-0">
                            {!searchData.searchValue
                                ? props.module.fields.title
                                : `Showing search results for "${searchData.searchValue}"`}
                        </h5>
                    </Row>
                    {
                        !isLoading
                            ? !finalCards?.length
                                ? <Message message="No Blogs Found" error />
                                : <CardContainer content={{ items: finalCards }} />
                            : showMore[content.fields.name] && <CardContainer content={{ items: finalCards }} />
                    }
                    {isLoading && (!showMore[content.fields.name]
                        ? <CardPlaceHolder className={horizontalAlign} />
                        : <Spinner className={horizontalAlign} />
                    )}
                    <Row>
                        {!isLoading && finalCards?.length < resultData?.totalCount
                            && <PrimaryButton onClick={() => handleShowMore(content.fields.name)}>
                                Show More
                            </PrimaryButton>
                        }
                    </Row>
                </Stack>
            )}
        </div>
    );
};

export default EducationPageContentListModule;