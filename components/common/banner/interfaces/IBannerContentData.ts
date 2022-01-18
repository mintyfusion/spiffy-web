import { ImageProps } from "next/image";

import IContentInfo from "types/IContentnfo";

export default interface IBannerContentData {
    images: ImageProps[];
    content: IContentInfo;
}