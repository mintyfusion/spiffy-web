import { ModuleProps } from "@agility/nextjs";
import React from "react";

import CommonSection from "components/agility-pageModules/common/commonSection/commonSection";
import IContentModuleProps from "components/agility-pageModules/creatorPage/contentModule/interfaces/IContentModuleProps";

import styles from "components/agility-pageModules/creatorPage/contentModule/creatorPageContentModule.module.scss";

const arrowsIcons = 5;

const CreatorPageContentModule = (props: ModuleProps<IContentModuleProps>): JSX.Element => {
    const { content, reversed } = props.module.fields;

    return (
        <CommonSection
            reversed={reversed}
            arrows={!reversed && arrowsIcons}
            containerClass={reversed ? styles.containerAlternate : styles.container}
            {...content}
        />
    );
};

export default CreatorPageContentModule;