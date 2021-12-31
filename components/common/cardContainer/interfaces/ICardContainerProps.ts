import { StackProps } from "react-bootstrap";

import ICardData from "types/ICardData";

export default interface ICardContainerProps extends StackProps {
    content: ICardData[];
}