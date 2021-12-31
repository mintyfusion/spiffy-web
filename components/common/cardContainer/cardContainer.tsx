import { Col, Row } from "react-bootstrap";
import React from "react";

import Card from "components/common/card/card";
import flexbox from "utils/flexbox";
import ICardContainerProps from "components/common/cardContainer/interfaces/ICardContainerProps";

import styles from "components/common/cardContainer/cardContainer.module.scss";

const columnAlignCenter = flexbox({ vertical: true, hAlign: "center", vAlign: "start" });
const horizontalAlign = flexbox({ hAlign: "center" });

const CardContainer = (props: ICardContainerProps): JSX.Element =>
    <Row className={`gap-1 gap-md-4 ${horizontalAlign} w-100`}>
        {props.content.map((card, index) =>
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
    </Row>;


export default CardContainer;