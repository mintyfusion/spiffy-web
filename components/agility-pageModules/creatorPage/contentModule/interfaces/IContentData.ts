import { ImageField } from "@agility/nextjs";

import IContentInfo from "types/IContentnfo";

export default interface IContentData extends IContentInfo {
    image: ImageField;
}