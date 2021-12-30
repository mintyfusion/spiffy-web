import { ImageProps } from "next/image";

interface IAvatar {
    id: string;
    image: ImageProps;
    className?: string;
}

export default IAvatar;