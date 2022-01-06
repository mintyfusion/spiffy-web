import { ImageField } from "@agility/nextjs";

import IContentInfo from "types/IContentnfo";

export default interface ICardProps extends IContentInfo {
    image: ImageField;
    tag_TextField: string;
    educationDetailLink: string;
}