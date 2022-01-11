import { ContentItem } from "@agility/nextjs";
import ICardProps from "components/agility-pageModules/common/card/interfaces/ICardProps";
import IContentInfo from "types/IContentnfo";

export default interface ILandingPageEducationProps extends IContentInfo {
    educationTiles: ContentItem<ICardProps>[];
}