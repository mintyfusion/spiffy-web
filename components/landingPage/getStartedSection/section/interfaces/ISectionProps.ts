import IContentInfo from "types/IContentnfo";
import SectionSide from "components/landingPage/getStartedSection/section/enums/sectionSide";

export default interface ISectionProps {
    direction: SectionSide;
    content: IContentInfo;
    buttonClassName?: string;
    contentClassName?: string;
    responsiveBreakpoint?: number;
}