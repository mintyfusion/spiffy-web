import ICardData from "types/ICardData";
import IContentInfo from "types/IContentnfo";

export default interface IContentData extends IContentInfo {
    key: string;
    cardContent: ICardData[];
}