import { ImageProps } from "next/image";

export default interface IArrowIconProps extends Partial<ImageProps> {
    quantity: number;
}