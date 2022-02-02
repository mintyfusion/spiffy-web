import { ImageField } from "@agility/nextjs";
import IContentInfo from "types/IContentnfo";

export default interface IHeroModuleVariant1Props extends IContentInfo {
    showSearchBar?: boolean;
    image: { media: [ImageField] };
}