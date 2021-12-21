import { ImageProps } from "next/image";
import ICaptionContent from "components/common/caption/interfaces/ICaptionContent";

export default interface IBannerContentData {
    images: ImageProps[];
    content: ICaptionContent;
}