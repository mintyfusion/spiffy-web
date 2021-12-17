import { Col, Row, Stack, } from "react-bootstrap";
import React from "react";

import flexbox from "utils/flexbox";
import ICaptionProps from "components/common/caption/interfaces/ICaptionProps";

import styles from "components/common/caption/caption.module.scss";

const columnAlignCenter = flexbox({ vertical: true, hAlign: "center", vAlign: "start" });
const rowHAlignCenter = flexbox({ hAlign: "center" });

const Caption = (props: ICaptionProps): JSX.Element => {
    const {
        secondaryText,
        primaryText,
        primaryTextEmphasis,
        textList
    } = props.content;

    return (
        <div className={`carousel-caption ${styles.caption} ${props.captionContainerClass}`}>
            <Stack className={`${styles.banner}`}>
                <Row className={`${rowHAlignCenter} ${styles.captionContent} `}>
                    <Col className={`${columnAlignCenter} align-items-center no-gutters`}>
                        <h3 role="secondary-text">{secondaryText}</h3>
                        <h2 role="primary-text">
                            {primaryText}
                            <label role="emphasis-text">{primaryTextEmphasis}</label>
                        </h2>
                        {textList.map((text: string, index: number) =>
                            <h4 key={index} role="text-list">{text}</h4>)
                        }
                    </Col>
                </Row>
            </Stack>
        </div>
    );
};

export default Caption;