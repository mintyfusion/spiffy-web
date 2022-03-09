import IContentInfo from "types/IContentnfo";
import SectionSide from "components/agility-pageModules/common/section/enums/SectionSide";

export default interface ISectionProps {
    direction: SectionSide;
    content: IContentInfo;
    buttonClassName?: string;
    contentClassName?: string;
    href: string;
    responsiveBreakpoint?: number;
    buttonText: string;
    showButtonArrow?: boolean;
}