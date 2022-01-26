import { URLField } from "@agility/nextjs";

import IContentInfo from "types/IContentnfo";

export default interface IFaqContentData {
    content: IContentInfo;
    href: URLField;
}