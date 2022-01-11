import { ImageField } from "@agility/nextjs";
import IContentInfo from "types/IContentnfo";

export default interface IFeatureContentData extends IContentInfo {
    image: ImageField;
}