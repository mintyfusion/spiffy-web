import { ModuleProps } from "@agility/nextjs";
import React from "react";

import CommonSection from "components/common/commonSection/commonSection";
import IContentModuleProps from "components/agility-pageModules/creatorPage/contentModule/interfaces/IContentModuleProps";

import styles from "components/agility-pageModules/creatorPage/contentModule/creatorPageContentModule.module.scss";

const CreatorPageContentModule = (props: ModuleProps<IContentModuleProps>): JSX.Element => {
    const { creatorContent, reversed } = props.module.fields;
    const { title, description, image } = creatorContent.fields;

    return (
        <CommonSection
            reversed={reversed}
            content={{ title, description }}
            image={image}
            arrows={5}
            containerClass={reversed ? styles.containerAlternate : styles.container}
        />
    );
};

export default CreatorPageContentModule;