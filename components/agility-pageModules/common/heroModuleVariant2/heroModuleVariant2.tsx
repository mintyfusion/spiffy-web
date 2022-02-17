import { ImageProps } from "next/image";
import { ModuleProps } from "@agility/nextjs";
import dynamic from "next/dynamic";
import React from "react";

import IContentInfo from "types/IContentnfo";
import IImageField from "types/IImageFIeld";

import styles from "components/agility-pageModules/common/heroModuleVariant2/heroModuleVariant2.module.scss";

const Banner = dynamic(() => import("components/agility-pageModules/common/banner/banner"));
const Caption = dynamic(() => import("components/agility-pageModules/common/caption/caption"));

type HeroModuleVariant2PropType = IContentInfo & IImageField;

const HeroModuleVariant2 = (props: ModuleProps<HeroModuleVariant2PropType>): JSX.Element => {
    const { image } = props.module.fields;
    const galleryData: ImageProps[] = React.useMemo(() => image.media.map(data => ({ src: data.url })), [image.media]);

    return (
        <Banner images={galleryData} fullHeight={true}>
            <Caption
                content={props.module.fields}
                captionContainerClass={styles.bannerCaption}
            />
        </Banner>
    );
};

export default HeroModuleVariant2;