import IContentInfo from "types/IContentnfo";
import primaryButtonArrows from "components/agility-pageModules/common/primaryButton/enums/primaryButtonArrows";
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
    showButtonArrowColor?: primaryButtonArrows;
    inverted?: string;
}