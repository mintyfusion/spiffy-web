import { ImageField } from "@agility/nextjs";

export default interface IVerticalContentData {
    id: string;
    header: string;
    highlightedWord: string;
    image: Partial<ImageField>;
}