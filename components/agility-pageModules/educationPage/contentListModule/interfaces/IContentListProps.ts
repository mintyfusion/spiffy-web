import { ContentItem } from "@agility/nextjs";

import ContentCategory from "components/educationPage/contentSection/enums/contentCategory";

export default interface IContentSectionProps {
    educationTags: ContentItem<{ name: ContentCategory }>[];
    title: string;
}