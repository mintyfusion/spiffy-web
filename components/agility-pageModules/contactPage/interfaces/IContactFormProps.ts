import { URLField } from "@agility/nextjs";
import IContentInfo from "types/IContentnfo";

export default interface IContactFormProps extends IContentInfo {
    redirectPageButton: URLField;
    subTitle: string;
    subDescription: string;
}