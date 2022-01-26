import { ContentItem } from "@agility/nextjs";

import IContentInfo from "types/IContentnfo";

export default interface IFaqContentModuleData extends IContentInfo {
    tag: ContentItem<{ name: string }>;
}