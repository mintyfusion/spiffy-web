import { ContentItem } from "@agility/nextjs";

import IContentData from "components/agility-pageModules/creatorPage/contentModule/interfaces/IContentData";

export default interface ICommonSectionProps extends ContentItem<IContentData> {
    reversed: boolean;
    arrows: number;
    containerClass: string;
}