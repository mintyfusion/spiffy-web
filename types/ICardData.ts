import { ImageProps } from "next/image";

import IContentInfo from "types/IContentnfo";

export default interface ICardData extends IContentInfo {
    imageUrl: ImageProps;
    href: string;
}