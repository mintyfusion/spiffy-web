import ContentCategory from "components/educationPage/contentSection/enums/contentCategory";
import ICardData from "types/ICardData";
import IContentInfo from "types/IContentnfo";

export default interface IContentData extends IContentInfo {
    key: ContentCategory;
    cardContent: ICardData[];
}