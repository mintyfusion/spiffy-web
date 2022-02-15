import { ContentItem } from "@agility/nextjs";
import React from "react";

import IContentItemFields from "types/IContentItemFields";

export default interface ITabsStackProps {
    activeTab: string;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
    tags: ContentItem<IContentItemFields<string>>[];
}