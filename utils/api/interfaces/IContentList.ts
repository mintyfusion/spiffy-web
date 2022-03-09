import { ContentItem } from "@agility/nextjs";

export default interface IContentList<T> {
    items: ContentItem<T>[];
    totalCount: number;
}