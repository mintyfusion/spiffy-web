import IContentInfo from "types/IContentnfo";
import IImageField from "types/IImageFIeld";

export default interface IDateHeroModuleProps extends Pick<IContentInfo, "title">, IImageField {
    lastUpdated: string;
}