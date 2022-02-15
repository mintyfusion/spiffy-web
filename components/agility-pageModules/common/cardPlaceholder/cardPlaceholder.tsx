import { Col, Row } from "react-bootstrap";
import React, { HTMLAttributes } from "react";

const CardPlaceHolder = (props: HTMLAttributes<HTMLDivElement>): JSX.Element =>
    <Row {...props}>
        <Col className="card p-3" aria-hidden="true">
            <svg className="">
                <rect width="100%" height="100%" fill="#868e96"></rect>
            </svg>
            <div className="card-body py-2 px-0">
                <h5 className="card-title placeholder-glow">
                    <span className="placeholder col-6"></span>
                </h5>
                <p className="card-text placeholder-glow">
                    <span className="placeholder col-7"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-6"></span>
                    <span className="placeholder col-8"></span>
                </p>
                <a href="#" tabIndex={-1} className="btn btn-warning disabled placeholder col-6"></a>
            </div>
        </Col>
    </Row>;

export default CardPlaceHolder;