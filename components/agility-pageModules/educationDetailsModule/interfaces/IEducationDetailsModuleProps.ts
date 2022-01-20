import { ContentItem } from "@agility/nextjs";

import DetailsType from "components/educationDetailsPage/detailsSection/enums/detailsType";
import IContentInfo from "types/IContentnfo";

export default interface IEducationDetailsModuleProps extends IContentInfo {
    contentType: ContentItem<{ name: DetailsType }>;
    mediaSrc: { href: string };
    name: string;
    htmlContent: string;
}