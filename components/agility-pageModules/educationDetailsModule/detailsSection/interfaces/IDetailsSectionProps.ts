import DetailsType from "components/agility-pageModules/educationDetailsModule/detailsSection/enums/detailsType";
import IContentInfo from "types/IContentnfo";

export default interface IDetailsSectionProps extends IContentInfo {
    detailsType: DetailsType;
    mediaSrc: string;
    key: string;
    htmlContent: string;
}