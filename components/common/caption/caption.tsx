import { Col, Row, Stack, } from "react-bootstrap";
import React from "react";

import flexbox from "utils/flexbox";
import ICaptionProps from "components/common/caption/interfaces/ICaptionProps";

import styles from "components/common/caption/caption.module.scss";

const columnAlignCenter = flexbox({ vertical: true, hAlign: "center", vAlign: "start" });
const rowHAlignCenter = flexbox({ hAlign: "center" });

const Caption = (props: ICaptionProps): JSX.Element => {
    const {
        title,
        description
    } = props.content;

    const preparedData = React.useMemo(() => title.split("\n"), [title]);

    return (
        <div className={`carousel-caption ${styles.caption} ${props.captionContainerClass}`}>
            <Stack className={`${styles.banner}`}>
                <Row className={`${rowHAlignCenter} ${styles.captionContent} `}>
                    <Col className={`${columnAlignCenter} align-items-center no-gutters`}>
                        {preparedData.length > 1
                            ? <>
                                <h3 role="secondary-text">{preparedData[0]}</h3>
                                <h2 role="primary-text">
                                    {preparedData[1]}
                                    <label role="emphasis-text">{preparedData[2]}</label>
                                </h2>
                            </>
                            : <h2 role="primary-text">
                                {preparedData[0]}
                            </h2>
                        }
                        {description.split("\n").map((text: string, index: number) =>
                            <h4 key={index} role="text-list">{text}</h4>)
                        }
                    </Col>
                </Row>
            </Stack>
        </div >
    );
};

export default Caption;