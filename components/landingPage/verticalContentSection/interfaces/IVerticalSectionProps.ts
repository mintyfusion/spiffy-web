import { ContentItem } from "@agility/nextjs";

import IVerticalContentData from "components/landingPage/verticalContentSection/interfaces/IVerticalContentData";

export default interface IVerticalSectionProps {
    content: ContentItem<IVerticalContentData>[];
}