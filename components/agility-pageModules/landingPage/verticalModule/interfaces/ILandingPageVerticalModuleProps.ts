import { ContentItem } from "@agility/nextjs";

import IVerticalContentData from "components/agility-pageModules/landingPage/verticalModule/interfaces/IVerticalContentData";

export default interface ILandingPageVerticalModuleProps {
    verticalContentList: ContentItem<IVerticalContentData>[];
}