import { ImageProps } from "next/image";
import { ModuleProps } from "@agility/nextjs";
import React from "react";

import Banner from "components/agility-pageModules/common/banner/banner";
import IDateHeroModuleProps from "components/agility-pageModules/common/dateHeroModule/interfaces/IDateHeroModuleProps";

import styles from "components/agility-pageModules/common/dateHeroModule/dateHeroModule.module.scss";

const DateHeroModule = (props: ModuleProps<IDateHeroModuleProps>): JSX.Element => {
    const { title, lastUpdated, image } = props.module.fields;
    const [formattedDate, setFormattedDate] = React.useState<string>("");
    const galleryData: ImageProps[] = React.useMemo(() => image.media.map(data => ({ src: data.url })), [image.media]);

    React.useEffect(() => {
        const date = new Date(lastUpdated);
        const month = date.toLocaleString("default", { month: "long" });
        setFormattedDate(`${date.getDate()} ${month}, ${date.getFullYear()}`);
    }, [lastUpdated]);

    return (
        <Banner images={galleryData} fullHeight={false}>
            <div className={`text-start position-absolute bottom-0 ${styles.bannerContentContainer}`}>
                <h1 className={styles.title}>{title}</h1>
                <h5 className={styles.date}>Updated {formattedDate}</h5>
            </div>
        </Banner>
    );
};

export default DateHeroModule;