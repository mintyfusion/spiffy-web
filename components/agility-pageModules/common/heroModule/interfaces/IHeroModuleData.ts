import { ImageField } from "@agility/nextjs";
import IContentInfo from "types/IContentnfo";

export default interface IHeroModuleData extends IContentInfo {
    image: { media: [ImageField] };
}