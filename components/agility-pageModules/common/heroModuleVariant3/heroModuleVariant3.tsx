import { ImageProps } from "next/image";
import { ModuleProps } from "@agility/nextjs";
import React from "react";

import Banner from "components/agility-pageModules/common/banner/banner";
import Caption from "components/agility-pageModules/common/caption/caption";
import IContentInfo from "types/IContentnfo";
import IHighlightWord from "types/IHighlightWord";
import IImageField from "types/IImageFIeld";

import styles from "components/agility-pageModules/common/heroModuleVariant3/heroModuleVariant3.module.scss";

type HeroModuleVariant3PropTypes = IContentInfo & IImageField & IHighlightWord;

const HeroModuleVariant3 = (props: ModuleProps<HeroModuleVariant3PropTypes>): JSX.Element => {
    const { fields } = props.module;

    const data: ImageProps[] = React.useMemo(() =>
        fields.image.media.map(data => ({ src: data.url }))
        , [fields.image.media]);

    return (
        <Banner images={data}>
            <Caption
                content={fields}
                captionContainerClass={styles.bannerCaption}
            />
        </Banner>
    );
};

export default HeroModuleVariant3;