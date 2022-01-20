import { ContentItem, ImageField } from "@agility/nextjs";

import IContentInfo from "types/IContentnfo";

export default interface ICardProps extends IContentInfo {
    image: ImageField;
    tag: ContentItem<{ name: string }>;
    educationDetailLink: string;
}