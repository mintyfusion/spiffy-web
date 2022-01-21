import { ContentItem } from "@agility/nextjs";

import IContentData from "components/agility-pageModules/creatorPage/contentModule/interfaces/IContentData";

export default interface IContentModuleProps {
    content: ContentItem<IContentData>;
    reversed: boolean;
}