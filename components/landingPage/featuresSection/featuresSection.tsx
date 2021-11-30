import { Col, Container, Row, Stack } from "react-bootstrap";
import Image from "next/image";
import React from "react";

import featuresSectionContentData from "components/landingPage/featuresSection/featuresSectionContentData";
import flexbox from "utils/flexbox";
import IFeaturesContentData from "components/landingPage/featuresSection/interfaces/IFeaturesContentData";

import styles from "components/landingPage/featuresSection/featuresSection.module.scss";

const columnAlignCenter = flexbox({ vertical: true, hAlign: "center", vAlign: "center" });
const columnAlignStart = flexbox({ vertical: true, hAlign: "center", vAlign: "start" });
const rowReverseCenter = flexbox({ vertical: true, reversed: true, hAlign: "center" });
const contentAlignCenter = flexbox({ hAlign: "center" });
const flex = flexbox();
const numOfArrows = 5;

const arrowsGeneration =
    Array.from(Array(numOfArrows), (_, index) =>
        <div className="d-none d-lg-block" key={index}>
            <Image
                src="/images/homepage/features-section/arrow-left.svg"
                alt=""
                width={45}
                height={60}
                layout="intrinsic"
                priority={true}
            />
        </div>
    );

const FeaturesSection = (): JSX.Element =>
    <Stack className={`${styles.content1} ${columnAlignCenter}`}>
        <Container fluid className={`${styles.container}`}>
            <Row
                className={`
                 ${rowReverseCenter} 
                 ${styles.sectionContainer} 
                 pt-0 
                 flex-lg-row
                 overflow-auto
                 position-relative
                 align-items-stretch
            `}
            >
                <Col
                    className={` ${styles.leftSection}`}
                    lg={8}
                >
                    <Row className={`${styles.cardStack} flex-sm-column`}>
                        {featuresSectionContentData.map((feature: IFeaturesContentData, index) =>
                            <Col className={`${styles.card} sticky-lg-top w-100`} key={index}>
                                <div
                                    className={`
                                          ${flex} 
                                          ${styles.cardContainer}
                                          justify-content-md-center
                                          justify-content-lg-start
                                    `}
                                >
                                    <div className={`${styles.imageContainer} position-relative`}>
                                        <Image
                                            {...feature.img}
                                            width={353}
                                            height={427}
                                            layout="responsive"
                                            priority={true}
                                        />
                                        <div className={`${styles.imageLogoContainer} position-absolute p-3 bottom-0`}>
                                            <Image
                                                src="/images/homepage/features-section/watermark.svg"
                                                width={20}
                                                height={20}
                                                layout="responsive"
                                            />
                                        </div>
                                    </div>
                                    <div className={`${columnAlignStart} ${styles.cardContent} p-4`}>
                                        <h4>{feature.content.title}</h4>
                                        <h6>{feature.content.description} </h6>
                                    </div>
                                </div>
                            </Col>
                        )}
                    </Row>
                </Col>
                <Col
                    className={`${styles.rightSection} sticky-lg-top align-self-start`}
                    lg={4}
                    xl="auto"
                >
                    <Stack className={`${columnAlignCenter} ${styles.rightSectionContainer}`}>
                        <Stack
                            direction="horizontal"
                            className={`${styles.arrowContainer} ${contentAlignCenter} justify-content-xl-end`}
                        >
                            {arrowsGeneration}
                            <h2 className="ms-1">Our</h2>
                        </Stack>
                        <h2 className="text-xl-end text-center">Features</h2>
                    </Stack>
                </Col>
            </Row>
        </Container>
    </Stack>;

export default FeaturesSection;