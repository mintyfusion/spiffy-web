import { ImageField, URLField } from "@agility/nextjs";

export default interface IVideoSectionProps {
    thumbnail?: ImageField;
    url: URLField;
}