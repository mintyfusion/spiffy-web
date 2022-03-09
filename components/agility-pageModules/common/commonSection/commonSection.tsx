import { Col, Container, Row, Stack } from "react-bootstrap";
import Image from "next/image";
import React from "react";

import ArrowIcon from "components/agility-pageModules/common/arrowIcon/arrowIcon";
import flexbox from "utils/flexbox";
import ICommonSectionProps from "components/agility-pageModules/common/commonSection/interfaces/ICommonSectionProps";

import styles from "components/agility-pageModules/common/commonSection/commonSection.module.scss";

const colCenter = flexbox({ vertical: true, hAlign: "center", vAlign: "center" });
const rowCenter = flexbox({ vAlign: "center", hAlign: "center" });

const CommonSection = (props: ICommonSectionProps): JSX.Element => {
    const { title, description, image } = props.fields;

    return (
        <Stack className={`${styles.content} ${colCenter} ${props.containerClass}`}>
            <Container fluid className={`${styles.container}`}>
                <Row
                    className={`
                        ${rowCenter} 
                        ${props.reversed ? "flex-md-row-reverse" : "flex-md-row"} 
                        flex-column
                        w-100 
                        m-0
                    `}
                >
                    <Col>
                        <Row className={`${colCenter} ${styles.contentContainer} h-100 ${props.reversed && "text-end"}`}>
                            <Stack direction="horizontal">
                                <h2 className={`${styles.title} w-100`}>
                                    {title}
                                    {!!props.arrows &&
                                        <Row
                                            className={`
                                            ${styles.arrowContainer} 
                                            d-inline-flex 
                                            flex-nowrap
                                            ms-2 
                                            ms-md-3 
                                            align-middle 
                                            me-5
                                         `}
                                        >
                                            <ArrowIcon quantity={props.arrows} width={32} height={60} layout="fixed" />
                                        </Row>
                                    }
                                </h2>
                            </Stack>
                            <h4 className={`${styles.description} mt-md-3`}>
                                {description}
                            </h4>
                        </Row>
                    </Col>
                    <Col className="w-100 p-0">
                        <Image src={image.url} width="960" height="780" layout="responsive" />
                    </Col>
                </Row>
            </Container>
        </Stack>);
};

CommonSection.defaultProps = {
    arrows: 0,
    reversed: false,
    containerClass: ""
};

export default CommonSection;