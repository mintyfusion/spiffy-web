import { ContentItem } from "@agility/nextjs";
import IVerticalContentData from "components/landingPage/verticalContentSection/interfaces/IVerticalContentData";

export default interface ILandingPageVerticalModuleProps {
    verticalContentList: ContentItem<IVerticalContentData>[];
}