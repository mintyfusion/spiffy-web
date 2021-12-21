import { ImageProps } from "next/image";

import IContentInfo from "types/IContentnfo";

export default interface ICommonSectionProps {
    reversed?: boolean;
    image: ImageProps;
    content: IContentInfo;
    arrows?: number;
    containerClass?: string;
}