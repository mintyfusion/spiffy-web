import DetailsType from "components/educationDetailsPage/detailsSection/enums/detailsType";
import IContentInfo from "types/IContentnfo";

export default interface IEducationDetailsModuleProps extends IContentInfo {
    contentType_TextField: DetailsType;
    mediaSrc: { href: string };
    name: string;
}