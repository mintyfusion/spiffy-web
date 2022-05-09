import { Col } from "react-bootstrap";
import React from "react";

import gameheadContentData from "components/agility-pageModules/game/gameHead/gameHeadContent";

import styles from "components/agility-pageModules/game/gameHead/gameHead.module.scss";

const GameHead = (): JSX.Element => {
    const { title, description } = gameheadContentData.content;

    return <div className={`${styles.gameHead}`}>
        <Col sm="6">
            <h1 className={`${styles.gameHeading}`}>{title}</h1>
            <h6 className={`${styles.gameDesc}`}>{description}</h6>
        </Col>
    </div>;
};

export default GameHead;