import { ImageField } from "@agility/nextjs";

import IContentInfo from "types/IContentnfo";

export default interface IHeroModuleVariant3Props extends IContentInfo {
    image: { media: [ImageField] };
    highlightWord: string;
}