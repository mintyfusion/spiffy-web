import { ContentItem } from "@agility/nextjs";

import ContentCategory from "components/agility-pageModules/educationPage/contentListModule/enums/contentCategory";
import IContentInfo from "types/IContentnfo";

export default interface IFaqContentModuleData extends IContentInfo {
    tag: ContentItem<{ name: ContentCategory }>;
}