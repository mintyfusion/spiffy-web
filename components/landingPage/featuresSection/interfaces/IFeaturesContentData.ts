import { ImageProps as imageProps } from "next/image";
import IContentInfo from "types/IContentnfo";

export default interface IFeaturesContentData {
    img: imageProps;
    content: IContentInfo;
}