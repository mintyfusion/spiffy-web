import { URLField } from "@agility/nextjs";

export default interface ILandingPageGetStarted {
    leftTitle: string;
    leftDescription: string;
    leftSectionHref:URLField;
    rightTitle: string;
    rightDescription: string;
    rightSectionHref: URLField;
}