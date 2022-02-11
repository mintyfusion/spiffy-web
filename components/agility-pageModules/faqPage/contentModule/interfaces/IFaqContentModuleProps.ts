import { ContentItem } from "@agility/nextjs";

import IContentInfo from "types/IContentnfo";
import IContentItemFields from "types/IContentItemFields";

export default interface IFaqContentModuleProps extends Pick<IContentInfo, "title"> {
    tags: ContentItem<IContentItemFields<string>>[];
}