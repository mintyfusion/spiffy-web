import { ImageProps } from "next/image";

import IContentInfo from "types/IContentnfo";

export default interface IWhySectionContentData extends IContentInfo {
    img: ImageProps;
}