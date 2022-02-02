import IContentInfo from "types/IContentnfo";

export default interface IBannerSectionProps {
    content: IContentInfo & { highlightWord?: string };
}