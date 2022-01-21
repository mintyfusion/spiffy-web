import { ModuleProps } from "@agility/nextjs";
import React from "react";

import IHeroSectionProps from "components/agility-pageModules/aboutPage/heroSection/interfaces/IHeroSectionProps";

import styles from "components/agility-pageModules/aboutPage/heroSection/heroSection.module.scss";

const BannerSection = (props: ModuleProps<IHeroSectionProps>): JSX.Element => {
    const { title, description, quoteText } = props.module.fields;

    return (
        <div className={`${styles.heroContainer} p-5`}>
            <div className="position-relative">
                <h1>{title}</h1>
                <h5>{description}</h5>
                <blockquote className="my-4">
                    <p>
                        {quoteText}
                    </p>
                </blockquote>
            </div>
        </div>
    );
};

export default BannerSection;