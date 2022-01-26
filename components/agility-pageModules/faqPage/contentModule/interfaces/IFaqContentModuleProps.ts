import { ContentItem } from "@agility/nextjs";

export default interface IFaqContentModuleProps {
    tags: ContentItem<{ name: string }>[];
    title: string;
}