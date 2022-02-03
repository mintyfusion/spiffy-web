import IContentInfo from "types/IContentnfo";

export default interface ICaptionProps {
    content: IContentInfo & { highlightWord?: string };
    captionContainerClass?: string;
}