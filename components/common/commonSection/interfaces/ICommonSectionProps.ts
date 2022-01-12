import { ImageField } from "@agility/nextjs";

import IContentInfo from "types/IContentnfo";

export default interface ICommonSectionProps {
    reversed?: boolean;
    image: ImageField;
    content: IContentInfo;
    arrows?: number;
    containerClass?: string;
}