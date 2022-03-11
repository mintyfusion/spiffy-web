import IContentInfo from "types/IContentnfo";
import SectionSide from "components/agility-pageModules/common/section/enums/SectionSide";
import primaryButtonArrows from "components/agility-pageModules/common/primaryButton/enums/primaryButtonArrows";

export default interface ISectionProps {
    direction: SectionSide;
    content: IContentInfo;
    buttonClassName?: string;
    contentClassName?: string;
    href: string;
    responsiveBreakpoint?: number;
    buttonText: string;
    showButtonArrow?: boolean;
    showButtonArrowColor?: primaryButtonArrows
}