import { ModuleProps } from "@agility/nextjs";
import React from "react";

const BannerSection = (props?:ModuleProps<any>): JSX.Element => {
    console.log(props.module.fields);

    return <></>;

};

export default BannerSection;