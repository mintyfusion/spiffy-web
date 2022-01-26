import { ContentItem, URLField } from "@agility/nextjs";
import IContentInfo from "types/IContentnfo";

export default interface ICommonContent extends IContentInfo {
    href: URLField;
    section: ContentItem<{ name: string }>;
    invertedColors: string;
} 