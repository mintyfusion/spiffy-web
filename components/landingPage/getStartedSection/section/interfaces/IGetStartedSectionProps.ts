import GetStartedContentSectionSide from "components/landingPage/getStartedSection/section/enums/getStartedContentSectionSide";
import IGetStartedContentSectionDetailsData from "components/landingPage/getStartedSection/Interfaces/IGetStartedContentSectionDetailsData";

export default interface IGetStartedSectionProps {
    direction: GetStartedContentSectionSide;
    content: IGetStartedContentSectionDetailsData;
    buttonClassName?: string;
    contentClassName?: string;
}