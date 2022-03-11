import { ButtonProps } from "react-bootstrap";

import ILinkProps from "components/agility-pageModules/common/link/interfaces/ILinkProps";
import primaryButtonArrows from "components/agility-pageModules/common/primaryButton/enums/primaryButtonArrows";

export default interface IPrimaryButtonProps extends Omit<ButtonProps, "href"> {
    showArrow?: boolean;
    linkProps?: ILinkProps;
    arrowColor?: primaryButtonArrows
}