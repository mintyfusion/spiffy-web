import { ImageProps } from "next/image";

export default interface IBannerContentData {
    images: ImageProps[];
    content: {
        secondaryText: string;
        primaryText: string;
        primaryTextEmphasis: string;
        textList: string[];
    };
}