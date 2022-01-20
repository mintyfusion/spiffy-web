import { ContentItem } from "@agility/nextjs";
import IContentInfo from "types/IContentnfo";

export default interface ICommonContent extends IContentInfo {
    href: string;
    section: ContentItem<{ name: string }>;
} 