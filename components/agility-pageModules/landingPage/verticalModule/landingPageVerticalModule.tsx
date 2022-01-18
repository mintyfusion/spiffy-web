import { ModuleProps } from "@agility/nextjs";
import React from "react";

import ILandingPageVerticalModuleProps from "components/agility-pageModules/landingPage/verticalModule/interfaces/ILandingPageVerticalModuleProps";
import VerticalContentSection from "components/landingPage/verticalContentSection/verticalContentSection";

const LandingPageVerticalModule = (props: ModuleProps<ILandingPageVerticalModuleProps>): JSX.Element => {
    const { fields } = props.module;

    return <VerticalContentSection content={fields.verticalContentList} />;
};

export default LandingPageVerticalModule;