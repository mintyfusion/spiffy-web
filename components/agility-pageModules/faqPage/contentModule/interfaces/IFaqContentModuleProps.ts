import { ContentItem } from "@agility/nextjs";

import ContentCategory from "components/educationPage/contentSection/enums/contentCategory";

export default interface IFaqContentModuleProps {
    tags: ContentItem<{ name: ContentCategory }>[];
    title: string;
}