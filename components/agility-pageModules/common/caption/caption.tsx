import { Col, Row, Stack, } from "react-bootstrap";
import React from "react";

import flexbox from "utils/flexbox";
import ICaptionProps from "components/agility-pageModules/common/caption/interfaces/ICaptionProps";
import styleWords from "utils/styleWords";

import styles from "components/agility-pageModules/common/caption/caption.module.scss";

const columnAlignCenter = flexbox({ vertical: true, hAlign: "center", vAlign: "center" });
const rowHAlignCenter = flexbox({ hAlign: "center" });

const Caption = (props: ICaptionProps): JSX.Element => {
    const { title, description, highlightWord } = props.content;

    const preparedData = React.useMemo(() => title.split("\n"), [title]);

    return (
        <div className={`carousel-caption ${styles.caption} ${props.captionContainerClass}`}>
            <Stack className={`${styles.banner}`}>
                <Row className={`${rowHAlignCenter} ${styles.captionContent} `}>
                    <Col className={`${columnAlignCenter} no-gutters`} lg="4" md="12" sm="12">
                        {preparedData.length > 1
                            ? <>
                                <h3
                                    role="secondary-text"
                                    dangerouslySetInnerHTML={{
                                        __html: styleWords(preparedData[0], [{
                                            text: highlightWord,
                                            className: styles.highlightWord,
                                        }])
                                    }}
                                />
                                <h2
                                    role="primary-text"
                                    dangerouslySetInnerHTML={{
                                        __html: styleWords(preparedData[1], [{
                                            text: highlightWord,
                                            className: styles.highlightWord,
                                        }])
                                    }}
                                />
                            </>
                            : <h2
                                role="primary-text"
                                dangerouslySetInnerHTML={{
                                    __html: styleWords(preparedData[0], [{
                                        text: highlightWord,
                                        className: styles.highlightWord,
                                    }])
                                }}
                            />
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