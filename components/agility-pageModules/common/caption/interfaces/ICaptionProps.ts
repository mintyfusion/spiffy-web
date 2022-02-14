import IContentInfo from "types/IContentnfo";
import IHighlightWord from "types/IHighlightWord";

export default interface ICaptionProps {
    content: IContentInfo & IHighlightWord;
    captionContainerClass?: string;
}