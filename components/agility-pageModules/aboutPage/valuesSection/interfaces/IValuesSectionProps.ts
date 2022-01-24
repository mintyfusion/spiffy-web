import { ContentItem } from "@agility/nextjs";

import IValuesData from "components/agility-pageModules/aboutPage/valuesSection/interfaces/IValuesData";

export default interface IValuesSectionProps {
    contents: ContentItem<IValuesData>[];
}