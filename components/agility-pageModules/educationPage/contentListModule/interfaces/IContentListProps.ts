import { ContentItem } from "@agility/nextjs";

import ContentCategory from "components/agility-pageModules/educationPage/contentListModule/enums/contentCategory";

export default interface IContentSectionProps {
    educationTags: ContentItem<{ name: ContentCategory }>[];
    title: string;
}