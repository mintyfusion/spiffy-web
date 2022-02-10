import { ImageField } from "@agility/nextjs";

import IContentInfo from "types/IContentnfo";

export default interface IHeroModuleVariant2Props extends IContentInfo{
    image: { media: [ImageField] };
}