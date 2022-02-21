import { Col, Row } from "react-bootstrap";
import React, { HTMLAttributes } from "react";

import styles from "components/agility-pageModules/common/cardPlaceholder/cardPlaceholder.module.scss";

const CardPlaceHolder = (props: HTMLAttributes<HTMLDivElement>): JSX.Element =>
    <Row {...props}>
        <Col className="card p-3" aria-hidden="true">
            <svg className="">
                <rect width="100%" height="100%" fill={styles.placeholderColor}></rect>
            </svg>
            <div className="card-body py-2 px-0">
                <h5 className="card-title placeholder-glow">
                    <span className="placeholder col-6"/>
                </h5>
                <p className="card-text placeholder-glow">
                    <span className="placeholder col-7"/>
                    <span className="placeholder col-4"/>
                    <span className="placeholder col-4"/>
                    <span className="placeholder col-6"/>
                    <span className="placeholder col-8"/>
                </p>
                <a tabIndex={-1} className="btn btn-warning disabled placeholder col-6"></a>
            </div>
        </Col>
    </Row>;

export default CardPlaceHolder;