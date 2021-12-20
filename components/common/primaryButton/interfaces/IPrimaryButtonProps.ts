import { ButtonProps } from "react-bootstrap";

export default interface IPrimaryButtonProps extends ButtonProps {
    href: string;
    showArrow?: boolean;
}