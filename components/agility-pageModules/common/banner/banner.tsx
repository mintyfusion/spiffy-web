import { Carousel } from "react-bootstrap";
import Image, { ImageProps } from "next/image";
import React, { PropsWithChildren } from "react";

import IBannerProps from "components/agility-pageModules/common/banner/interfaces/IBannerProps";

import styles from "components/agility-pageModules/common/banner/banner.module.scss";

const Banner = (props: PropsWithChildren<IBannerProps>): JSX.Element =>
    <div className={`position-relative ${styles.bannerContainer}`}>
        {props.children}
        <Carousel controls={false} indicators={false} pause={false} variant="dark" className="position-relative">
            {props.images.map((banner: ImageProps, index) =>
                <Carousel.Item
                    className={`
                    ${styles.carouselItem} 
                    ${props.fullHeight ? styles.full : styles.half}
                    position-relative`}
                    key={index}
                >
                    <Image objectFit="cover" {...banner} width="1366" height="500" layout="intrinsic" />
                </Carousel.Item>
            )}
        </Carousel>
    </div>;

Banner.defaultProps = {
    fullHeight: true
};

export default Banner;