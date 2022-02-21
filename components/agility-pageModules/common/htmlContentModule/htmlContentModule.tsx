import { ModuleProps } from "@agility/nextjs";
import React from "react";

import IHtmlContentModuleProps from "components/agility-pageModules/common/htmlContentModule/interfaces/IHtmlContentModuleProps";
import renderHtml from "utils/renderHtml";

import styles from "components/agility-pageModules/common/htmlContentModule/htmlContentModule.module.scss";

const HtmlContentModule = (props: ModuleProps<IHtmlContentModuleProps>): JSX.Element => {
    const { content } = props.module.fields;

    return (
        <div className={`${styles.contentContainer} p-3 p-md-5`} dangerouslySetInnerHTML={renderHtml(content)} />
    );

};

export default HtmlContentModule;