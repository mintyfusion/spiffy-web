import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import IContentInfo from "types/IContentnfo";

export default interface IShareSectionData extends Pick<IContentInfo, "title"> {
    href: string;
    icon: IconDefinition;
}