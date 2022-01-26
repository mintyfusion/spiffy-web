import { URLField } from "@agility/nextjs";

import IContentInfo from "types/IContentnfo";

export default interface IGameContentData {
    content: IContentInfo;
    href: URLField;
}