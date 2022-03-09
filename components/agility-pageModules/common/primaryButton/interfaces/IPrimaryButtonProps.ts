import { ButtonProps } from "react-bootstrap";

import ILinkProps from "components/agility-pageModules/common/link/interfaces/ILinkProps";

export default interface IPrimaryButtonProps extends Omit<ButtonProps, "href"> {
    showArrow?: boolean;
    linkProps?: ILinkProps;
}