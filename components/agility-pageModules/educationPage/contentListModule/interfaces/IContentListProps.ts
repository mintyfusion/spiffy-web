import { ContentItem } from "@agility/nextjs";

import IContentInfo from "types/IContentnfo";
import IContentItemFields from "types/IContentItemFields";

export default interface IContentSectionProps extends Pick<IContentInfo, "title"> {
    educationTags: ContentItem<IContentItemFields<string>>[];
}