import { ImageField } from "@agility/nextjs";
import IContentInfo from "types/IContentnfo";

export default interface IHeroModuleProps extends IContentInfo {
    image: { media: [ImageField] };
}