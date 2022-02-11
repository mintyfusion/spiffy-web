import { ContentItem } from "@agility/nextjs";

import IContentInfo from "types/IContentnfo";
import IContentItemFields from "types/IContentItemFields";

export default interface IFaqContentModuleData extends IContentInfo {
    tag: ContentItem<IContentItemFields<string>>;
}