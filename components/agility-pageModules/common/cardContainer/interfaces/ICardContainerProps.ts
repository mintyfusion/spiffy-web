import { ContentItem } from "@agility/nextjs";
import { StackProps } from "react-bootstrap";

import ICardProps from "components/agility-pageModules/common/card/interfaces/ICardProps";

export default interface ICardContainerProps extends StackProps {
    content: { items: ContentItem<ICardProps>[] };
}