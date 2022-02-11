import { ContentItem, URLField } from "@agility/nextjs";

import IContentInfo from "types/IContentnfo";
import IContentItemFields from "types/IContentItemFields";

export default interface ICommonContent extends IContentInfo {
    href: URLField;
    section: ContentItem<IContentItemFields<string>>;
    invertedColors: string;
} 