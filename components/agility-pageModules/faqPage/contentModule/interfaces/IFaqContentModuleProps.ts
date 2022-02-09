import { ContentItem } from "@agility/nextjs";

import IContentInfo from "types/IContentnfo";

export default interface IFaqContentModuleProps extends Pick<IContentInfo,"title"> {
    tags: ContentItem<{ name: string }>[];
}