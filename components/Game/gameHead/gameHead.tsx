import { Col } from "react-bootstrap";
import React from "react";

import gameheadContentData from "components/Game/gameHead/gameHeadContent";

import styles from "components/Game/gameHead/gameHead.module.scss";

const GameHead = (): JSX.Element => {
    const {
        secondaryText,
        primaryText
    } = gameheadContentData.content;

    return <div className={`${styles.gameHead}`}>
        <Col sm="6">
            <h1 className={`${styles.gameHeading}`}>{primaryText}</h1>
            <h6 className={`${styles.gameDesc}`}>{secondaryText}</h6>
        </Col>
    </div>;
};
export default GameHead;