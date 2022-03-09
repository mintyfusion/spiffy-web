import { ContentItem } from "@agility/nextjs";

import IContentInfo from "types/IContentnfo";
import IContentItemFields from "types/IContentItemFields";
import IFaqContentModuleData from "components/agility-pageModules/faqPage/contentModule/interfaces/IFaqContentModuleData";

export default interface IFaqContentModuleProps extends Pick<IContentInfo, "title"> {
    tags: ContentItem<IContentItemFields<string>>[];
    faqList: ContentItem<IFaqContentModuleData>[];
}