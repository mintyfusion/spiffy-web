import { ContentItem } from "@agility/nextjs";

import IContentItemFields from "types/IContentItemFields";

export default function agilityTagGenerator(agilityTags: ContentItem<IContentItemFields<string>>[]): string[] {
    return agilityTags.map(tag => tag.fields.name);
}