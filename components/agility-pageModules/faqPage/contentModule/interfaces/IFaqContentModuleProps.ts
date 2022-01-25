import { ContentItem } from "@agility/nextjs";

import ContentCategory from "components/agility-pageModules/educationPage/contentListModule/enums/contentCategory";

export default interface IFaqContentModuleProps {
    tags: ContentItem<{ name: ContentCategory }>[];
    title: string;
}