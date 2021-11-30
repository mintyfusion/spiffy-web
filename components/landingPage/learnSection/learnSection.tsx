import { Card, Col, Row, Stack } from "react-bootstrap";
import Image from "next/image";
import React from "react";

import flexbox from "utils/flexbox";
import learnContent from "components/landingPage/learnSection/learnContent";
import Link from "components/common/link/link";
import PrimaryButton from "components/common/primaryButton/primaryButton";

import styles from "components/landingPage/learnSection/learnSection.module.scss";

const columnAlignCenter = flexbox({ vertical: true, hAlign: "center", vAlign: "start" });
const columnAlign = flexbox({ vertical: true });

const LearnSection = (): JSX.Element =>
    <Stack className={`${styles.content4} align-items-center`} gap={4}>
        <Row className={styles.contentHeading}>
            <h2>Learn how to use spiffy</h2>
        </Row>
        <Row className="gap-1 gap-md-4">
            {learnContent.map((card, index) =>
                <Col
                    key={index}
                    className={`${columnAlignCenter} ${styles.container} flex-grow-1 my-3`}
                >
                    <Card className={`${styles.card} ${columnAlign} p-3 flex-grow-1`}>
                        <div className="cardImageContainer">
                            <Image src={card.imageUrl.src} width="10px" height="5px" layout="responsive" />
                        </div>
                        <Card.Body className={columnAlignCenter}>
                            <Card.Title className={`${styles.cardTitle} mb-3`}>
                                {card.title}
                            </Card.Title>
                            <Card.Text className={`${styles.cardText} py-2} w-100 flex-grow-1`} >
                                {card.description}
                            </Card.Text>
                            <Link href={card.href} className={`${styles.link} text-decoration-underline`}>
                                Read More
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            )}
        </Row>
        <Row>
            <Link href="/" >
                <PrimaryButton>Learn More</PrimaryButton>
            </Link>
        </Row>
    </Stack >;

export default LearnSection;