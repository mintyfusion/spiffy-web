import { ContentItem, ImageField } from "@agility/nextjs";

import IContentInfo from "types/IContentnfo";
import IContentItemFields from "types/IContentItemFields";

export default interface ICardProps extends IContentInfo {
    image: ImageField;
    tag: ContentItem<IContentItemFields<string>>;
    educationDetailLink: string;
}