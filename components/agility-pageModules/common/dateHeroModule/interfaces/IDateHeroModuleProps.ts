import { ImageField } from "@agility/nextjs";
import IContentInfo from "types/IContentnfo";

export default interface IDateHeroModuleProps extends Pick<IContentInfo, "title"> {
    lastUpdated: string;
    image: { media: [ImageField] };
}