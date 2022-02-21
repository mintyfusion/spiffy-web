import { ModuleProps } from "@agility/nextjs";
import { Row, Stack } from "react-bootstrap";
import React from "react";

import { SearchContext } from "pages/[...slug]";
import CardContainer from "components/agility-pageModules/common/cardContainer/cardContainer";
import CardPlaceHolder from "components/agility-pageModules/common/cardPlaceholder/cardPlaceholder";
import ContentCategory from "components/agility-pageModules/educationPage/contentListModule/enums/contentCategory";
import FilterLogicTypes from "utils/api/enums/filterLogicTypes";
import FilterTypes from "utils/api/enums/filterTypes";
import flexbox from "utils/flexbox";
import ICardProps from "components/agility-pageModules/common/card/interfaces/ICardProps";
import IContentSectionProps from "components/agility-pageModules/educationPage/contentListModule/interfaces/IContentListProps";
import PrimaryButton from "components/agility-pageModules/common/primaryButton/primaryButton";
import TabsStack from "components/agility-pageModules/common/tabsStack/tabsStack";
import useGetContentList from "hooks/useGetContentList";

import styles from "components/agility-pageModules/educationPage/contentListModule/educationPageContentListModule.module.scss";

const horizontalAlign = flexbox({ hAlign: "center", vAlign: "center" });

const EducationPageContentListModule = (props: ModuleProps<IContentSectionProps>): JSX.Element => {
    const [activeTab, setActiveTab] = React.useState<string>(ContentCategory.all);
    const [showMore, setShowMore] = React.useState({});
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
        take: 50,
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
    }), [activeTab, searchData.searchValue, searchFilterParams]);

    const [{ isLoading, data: resultData }] = useGetContentList<ICardProps>(finalParams);

    return (
        <div className={styles.contentContainer}>
            {!searchData.searchValue &&
                <TabsStack activeTab={activeTab} setActiveTab={setActiveTab} tags={props.module.fields.educationTags} />
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
                        <h5>
                            {!searchData.searchValue
                                ? props.module.fields.title
                                : `Showing search results for ${searchData.searchValue}`}
                        </h5>
                    </Row>
                    {isLoading && <CardPlaceHolder className={horizontalAlign} />}
                    {!isLoading
                        ? !resultData?.items?.length
                            ? <h1 className="text-center">No Blogs Found</h1>
                            : resultData &&
                            <>
                                <CardContainer content={resultData} />
                            </>
                        : ""
                    }
                </Stack>
            )}
        </div>
    );
};

export default EducationPageContentListModule;