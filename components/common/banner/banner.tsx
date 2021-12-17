import { Carousel } from "react-bootstrap";
import Image, { ImageProps } from "next/image";
import React, { PropsWithChildren } from "react";

import IBannerProps from "components/common/banner/interfaces/IBannerProps";

import styles from "components/common/banner/banner.module.scss";

const Banner = (props: PropsWithChildren<IBannerProps>): JSX.Element =>
    <div>
        {props.children}
        <Carousel controls={false} indicators={false} pause={false} variant="dark" className="position-relative">
            {props.images.map((banner: ImageProps, index) =>
                <Carousel.Item className={`${styles.carouselItem} position-relative`} key={index}>
                    <Image {...banner} objectFit="cover"/>
                </Carousel.Item>
            )}
        </Carousel>
    </div>;

export default Banner;