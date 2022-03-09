import { ImageField } from "@agility/nextjs";

import IContentInfo from "types/IContentnfo";

export default interface IValuesData extends IContentInfo {
    image: ImageField;
}