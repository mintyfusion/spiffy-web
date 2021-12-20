import { ImageProps as imageProps } from "next/image";

import IContentInfo from "types/IContentnfo";

export default interface IMonetizeSectionContentData extends IContentInfo {
    img: imageProps;
}