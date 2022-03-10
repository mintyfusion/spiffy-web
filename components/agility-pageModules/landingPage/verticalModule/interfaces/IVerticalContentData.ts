import { ImageProps } from "next/image";

export default interface IVerticalContentData {
    id: string;
    header: string;
    highlightedWord: string;
    image: ImageProps;
}