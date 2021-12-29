import { ImageProps } from "next/image";

interface IAvatar {
    id: string;
    image: ImageProps;
    friends: IAvatar[];
}

export default IAvatar;