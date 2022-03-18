import { Col, Row } from "react-bootstrap";
import React, { HTMLAttributes } from "react";

import BreakpointChecks from "hooks/enums/breakpointChecks";
import Breakpoints from "common/style/breakpoints";
import flexbox from "utils/flexbox";
import useBreakpoint from "hooks/useBreakpoint";

import styles from "components/agility-pageModules/common/cardPlaceholder/cardPlaceholder.module.scss";

const rowHCenter = flexbox({ hAlign: "center" });

const cardsXL = 3;
const cardsLG = 2;
const minCards = 1;

const CardPlaceHolder = (props: HTMLAttributes<HTMLDivElement>): JSX.Element => {
    const breakpointXXL = useBreakpoint(Breakpoints.XXL, BreakpointChecks.Greater);
    const breakpointLG = useBreakpoint(Breakpoints.LG, BreakpointChecks.Greater);

    const placeholderCards = React.useMemo(() => {
        const card: JSX.Element[] = [];
        const numberOfCards = breakpointXXL ? cardsXL : breakpointLG ? cardsLG : minCards;

        for (let i = 0; i < numberOfCards; i++) {

            card.push(<Col className="card p-3" aria-hidden="true" key={i}>
                <svg className="">
                    <rect width="100%" height="100%" fill={styles.placeholderColor}></rect>
                </svg>
                <div className="card-body py-2 px-0">
                    <h5 className="card-title placeholder-glow">
                        <span className="placeholder col-6" />
                    </h5>
                    <p className="card-text placeholder-glow">
                        <span className="placeholder col-7" />
                        <span className="placeholder col-4" />
                        <span className="placeholder col-4" />
                        <span className="placeholder col-6" />
                        <span className="placeholder col-8" />
                    </p>
                    <a tabIndex={-1} className="btn btn-warning disabled placeholder col-6"></a>
                </div>
            </Col>);
        }

        return card;
    }, [breakpointLG, breakpointXXL]);

    return (
        <Row {...props} className={`gap-4 ${rowHCenter}`}>
            {placeholderCards.map(card => card)}
        </Row>
    );
};

export default CardPlaceHolder;