import { ImageField } from "@agility/nextjs";

export default interface IImageField {
    image: { media: [ImageField] };
}