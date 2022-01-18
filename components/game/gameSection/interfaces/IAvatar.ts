import { ImageProps } from "next/image";

interface IAvatar {
    id: string;
    image: ImageProps;
    done: boolean;
}

export default IAvatar;