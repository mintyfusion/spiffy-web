import { Col, Row, Stack } from "react-bootstrap";
import React from "react";

import Card from "components/common/card/card";
import flexbox from "utils/flexbox";
import learnContent from "components/landingPage/learnSection/learnContent";
import Link from "components/common/link/link";
import PrimaryButton from "components/common/primaryButton/primaryButton";

import styles from "components/landingPage/learnSection/learnSection.module.scss";

const columnAlignCenter = flexbox({ vertical: true, hAlign: "center", vAlign: "start" });
const horizontalAlign = flexbox({ hAlign: "center" });

const LearnSection = (): JSX.Element =>
    <Stack className={`${styles.content4} align-items-center`} gap={4}>
        <Row className={styles.contentHeading}>
            <h2>Learn how to use spiffy</h2>
        </Row>
        <Row className={`gap-1 gap-md-4 ${horizontalAlign}`}>
            {learnContent.map((card, index) =>
                <Col
                    key={index}
                    className={`
                    ${columnAlignCenter} 
                    ${styles.card} 
                        my-3 
                        col-12 
                        col-sm-5 
                        col-md-3 
                        flex-grow-1 
                        flex-md-grow-0
                    `}
                >
                    <Card {...card} />
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