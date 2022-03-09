import { ContentItem } from "@agility/nextjs";

import IContentInfo from "types/IContentnfo";
import IValuesData from "components/agility-pageModules/aboutPage/valuesSection/interfaces/IValuesData";

export default interface IValuesSectionProps extends Pick<IContentInfo,"title"> {
    contents: ContentItem<IValuesData>[];
}