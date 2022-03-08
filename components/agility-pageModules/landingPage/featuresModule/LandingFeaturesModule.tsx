import { Col, Container, Row, Stack } from "react-bootstrap";
import { ModuleProps } from "@agility/nextjs";
import Image from "next/image";
import React from "react";

import ArrowIcon from "components/agility-pageModules/common/arrowIcon/arrowIcon";
import flexbox from "utils/flexbox";
import ILandingFeaturesModuleProps from "components/agility-pageModules/landingPage/featuresModule/interfaces/ILandingFeaturesModuleProps";

import styles from "components/agility-pageModules/landingPage/featuresModule/featuresSection.module.scss";

const colAlignCenter = flexbox({ vertical: true, hAlign: "center", vAlign: "center" });
const colAlignStart = flexbox({ vertical: true, hAlign: "center", vAlign: "start" });
const rowReverseCenter = flexbox({ vertical: true, reversed: true, hAlign: "center", vAlign: "center" });
const contentAlignCenter = flexbox({ hAlign: "center" });
const alignCenter = flexbox({ vAlign: "center", hAlign: "center" });
const flex = flexbox();

const LandingFeaturesModule = (props: ModuleProps<ILandingFeaturesModuleProps>): JSX.Element => {
    const { fields } = props.module;

    return (
        <Stack className={`${styles.content1} ${colAlignCenter}`}>
            <Container fluid className={`${styles.container}`}>
                {fields.featuresCardList.map((feature, index) => {
                    const { title, description, image } = feature.fields;

                    return (
                        <Row
                            key={index}
                            className={`
                                ${rowReverseCenter} 
                                ${styles.sectionContainer} 
                                pt-0 
                                flex-lg-row
                                overflow-auto
                                position-sticky
                              `}
                        >
                            <Col className={` ${styles.leftSection}`} lg={8}>
                                <Row className={`${styles.cardStack} flex-sm-column`}>
                                    <Col className={`${styles.card} sticky-lg-top w-100`} key={index}>
                                        <div
                                            className={`
                                                    ${flex} 
                                                    ${styles.cardContainer}
                                                    justify-content-md-center
                                                    justify-content-lg-start
                                                    w-75
                                                  `}
                                        >
                                            <div className={`${styles.imageContainer} position-relative`}>
                                                <Image
                                                    width={353}
                                                    height={427}
                                                    layout="responsive"
                                                    priority={true}
                                                    src={image.url}
                                                    objectFit="cover"
                                                />
                                                <div className={`
                                                        ${styles.imageLogoContainer} 
                                                        position-absolute 
                                                        p-3 
                                                        bottom-0
                                                 `}>
                                                    <Image
                                                        src="/images/homepage/features-section/watermark.svg"
                                                        width={20}
                                                        height={20}
                                                        layout="responsive"
                                                    />
                                                </div>
                                            </div>
                                            <div className={`${colAlignStart} ${styles.cardContent} p-1 p-sm-4`}>
                                                <h4>{title}</h4>
                                                <h6>{description} </h6>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col
                                className={`
                                        ${styles.rightSection} 
                                        ${alignCenter}
                                        sticky-lg-top
                                        align-self-start 
                                        ${index > 0 && "invisible"}
                                     `}
                                lg={4}
                                xl="auto"
                            >
                                <Stack className={`${colAlignCenter} ${styles.rightSectionContainer}`}>
                                    <Stack
                                        direction="horizontal"
                                        className={`
                                                ${styles.arrowContainer} 
                                                ${contentAlignCenter}
                                                justify-content-xl-end
                                         `}
                                    >
                                        <div className="d-none d-lg-block">
                                            <ArrowIcon width={15} height={20} layout="intrinsic" quantity={5} />
                                        </div>
                                        <h2 className="ms-1">Our</h2>
                                    </Stack>
                                    <h2 className="text-xl-end text-center">Features</h2>
                                </Stack>
                            </Col>
                        </Row>
                    );
                }
                )}
            </Container>
        </Stack>
    );
};

export default LandingFeaturesModule;