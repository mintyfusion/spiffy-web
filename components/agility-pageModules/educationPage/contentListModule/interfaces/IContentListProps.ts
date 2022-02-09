import { ContentItem } from "@agility/nextjs";
import IContentInfo from "types/IContentnfo";

export default interface IContentSectionProps extends Pick<IContentInfo,"title"> {
    educationTags: ContentItem<{ name: string }>[];
}