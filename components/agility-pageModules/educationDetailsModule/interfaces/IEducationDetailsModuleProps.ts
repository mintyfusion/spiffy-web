import { ContentItem } from "@agility/nextjs";

import DetailsType from "components/agility-pageModules/educationDetailsModule/detailsSection/enums/detailsType";
import IContentInfo from "types/IContentnfo";
import IContentItemFields from "types/IContentItemFields";

export default interface IEducationDetailsModuleProps extends IContentInfo {
    contentType: ContentItem<IContentItemFields<DetailsType>>;
    mediaSrc: { href: string };
    name: string;
    htmlContent: string;
}