import { ContentItem } from "@agility/nextjs";

export default interface IContentSectionProps {
    educationTags: ContentItem<{ name: string }>[];
    title: string;
}