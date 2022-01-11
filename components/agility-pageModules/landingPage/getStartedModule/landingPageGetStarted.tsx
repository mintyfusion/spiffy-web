import { ModuleProps } from "@agility/nextjs";
import React from "react";

import GetStarted from "components/landingPage/getStartedSection/getStartedSection";
import IGetStartedContentSectionData from "components/landingPage/getStartedSection/Interfaces/IGetStartedContentSectionData";
import ILandingPageGetStarted from "components/agility-pageModules/landingPage/getStartedModule/interfaces/ILandingPageGetStartedProps";

const LandingPageGetStarted = (props: ModuleProps<ILandingPageGetStarted>): JSX.Element => {
    const { fields } = props.module;
    const content: IGetStartedContentSectionData = {
        leftPart: {
            title: fields.leftTitle,
            description: fields.leftDescription
        },
        rightPart: {
            title: fields.rightTitle,
            description: fields.rightDescription
        }
    };

    return <GetStarted content={content} />;
};

export default LandingPageGetStarted;