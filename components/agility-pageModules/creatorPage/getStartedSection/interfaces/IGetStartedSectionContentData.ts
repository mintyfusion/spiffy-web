import { URLField } from "@agility/nextjs";

import IContentInfo from "types/IContentnfo";

export default interface IGetStartedSectionContentData {
    href: URLField;
    content: IContentInfo;
}