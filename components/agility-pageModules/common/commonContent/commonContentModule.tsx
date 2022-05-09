import { ModuleProps } from "@agility/nextjs";
import React from "react";

import ICommonContent from "components/agility-pageModules/common/commonContent/interfaces/ICommonContent";
import Section from "components/agility-pageModules/common/section/section";
import SectionSide from "components/agility-pageModules/common/section/enums/SectionSide";

import styles from "components/agility-pageModules/common/commonContent/commonContentmodule.module.scss";

const CommonContentModule = (props: ModuleProps<ICommonContent>): JSX.Element => {
    const { title, description, invertedColors, href } = props.module.fields;

    return (
        <div className={`${invertedColors === "true" && styles.inverted} gap-3 gap-sm-5 ${styles.commonWrapper}`}>
            <Section
                direction={SectionSide.center}
                href={href.href}
                buttonText={href.text}
                content={{ title, description }}
                contentClassName={styles.contentContainer}
                inverted={invertedColors}
            />
        </div>
    );
};

export default CommonContentModule;