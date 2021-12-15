import { Carousel, Col, Row, Stack, } from "react-bootstrap";
import Image, { ImageProps } from "next/image";
import React from "react";

import bannerContent from "components/landingPage/bannerSection/bannerContent";
import flexbox from "utils/flexbox";

import styles from "components/landingPage/bannerSection/bannerSection.module.scss";

const columnAlignCenter = flexbox({ vertical: true, hAlign: "center", vAlign: "start" });
const rowHAlignCenter = flexbox({ hAlign: "center" });

const BannerSection = (): JSX.Element => {
    const {
        secondaryText,
        primaryText,
        primaryTextEmphasis,
        textList
    } = bannerContent.content;

    return <div>
        {/* Static Carousel Content  */}
        <div className={`carousel-caption ${styles.caption}`}>
            <Stack className={`${styles.banner} columnAlignCenter`}>
                <Row className={`${rowHAlignCenter} ${styles.bannerContent}`}>
                    <Col className={`${columnAlignCenter} align-items-center no-gutters`}>
                        <h3>{secondaryText}</h3>
                        <h2>
                            {primaryText}
                            <label>
                                {primaryTextEmphasis}
                            </label>
                        </h2>
                        {textList.map((text: string, index) =>
                            <h4 key={index}>{text}</h4>)
                        }
                    </Col>
                </Row>
            </Stack>
        </div>
        <Carousel controls={false} indicators={false} pause={false} variant="dark">
            {bannerContent.images.map((banner: ImageProps, index) => {
                const { src, alt, width, height, layout, priority } = banner;

                return <Carousel.Item className={`${styles.carouselItem} vh-100`} key={index}>
                    <Image
                        src={src}
                        alt={alt}
                        width={width}
                        height={height}
                        layout={layout}
                        objectFit="cover"
                        priority={priority}
                    />
                </Carousel.Item>;
            }
            )}
        </Carousel>
    </div>;
};

export default BannerSection;