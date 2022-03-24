import { ModuleProps } from "@agility/nextjs";
import React from "react";

import flexbox from "utils/flexbox";
import IHeroSectionProps from "components/agility-pageModules/aboutPage/heroSection/interfaces/IHeroSectionProps";

import styles from "components/agility-pageModules/aboutPage/heroSection/heroSection.module.scss";

const columnAlignCenter = flexbox({ vertical: true });

const HeroSection = (props: ModuleProps<IHeroSectionProps>): JSX.Element => {
    const { title, description, quoteText } = props.module.fields;

    return (
        <div className={styles.heroContainer}>
            <div className="position-relative">
                <h1>{title}</h1>
                <h5>{description}</h5>
                <blockquote className={`my-4 ${columnAlignCenter}`}>
                    <p>
                        {quoteText}
                    </p>
                </blockquote>
            </div>
        </div>
    );
};

export default HeroSection;