import { Button, Col, Row } from "react-bootstrap";
import Image from "next/image";
import React from "react";

import flexbox from "utils/flexbox";
import getStartedArrow from "public/images/homepage/get-started-section/getstarted-arrow.svg";
import ISectionProps from "components/landingPage/getStartedSection/section/interfaces/ISectionProps";
import Link from "components/common/link/link";
import SectionSide from "components/landingPage/getStartedSection/section/enums/sectionSide";
import useBreakpoint from "hooks/useBreakpoint";

import styles from "components/landingPage/getStartedSection/section/section.module.scss";

const columnAlign = flexbox({ vertical: true, hAlign: "center", vAlign: "center" });
const columnAlignEnd = flexbox({ vertical: true, hAlign: "center", vAlign: "end" });
const rowAlign = flexbox({ vAlign: "center", hAlign: "center" });

const Section = (props: ISectionProps): JSX.Element => {
    const { title, description } = props.content;
    const isBreakpointMatched = useBreakpoint(props.responsiveBreakpoint);

    const rowDirection = React.useMemo(() => {
        if (isBreakpointMatched) {
            return "flex-column-reverse gap-3";
        }

        switch (props.direction) {
            case SectionSide.left:
                return "flex-row";
            case SectionSide.right:
            default:
                return "flex-row-reverse";
        }
    }, [props.direction, isBreakpointMatched]);

    const colDirection = React.useMemo(() =>
        props.direction === SectionSide.left
            ? isBreakpointMatched
                ? columnAlign
                : columnAlignEnd
            : ""
        , [isBreakpointMatched, props.direction]);

    const alignment = React.useMemo(() => {
        if (isBreakpointMatched) {
            return "text-center w-100";
        }

        return props.direction === SectionSide.right
            ? "text-end text-xl-start"
            : "text-end";

    }, [isBreakpointMatched, props.direction]);

    return <Row className={`flex-nowrap ${rowDirection}`}>
        <Col className={`${rowAlign}`}>
            <Link href="/">
                <Button
                    variant="warning"
                    className={`${props.buttonClassName} ${styles.sectionButton} position-relative`}
                >
                    Get Started
                    <label className={`${rowAlign} position-absolute bg-white`}>
                        <Image src={getStartedArrow} layout="fill" />
                    </label>
                </Button>
            </Link>
        </Col>
        <Col
            className={`
              ${colDirection}
              no-gutters 
              ${props.contentClassName}
              ${alignment}
        `}
        >
            <h2 className="w-100">{title}</h2>
            <h5>
                {description}
            </h5>
        </Col>
    </Row>;
};

Section.defaultProps = {
    responsiveBreakpoint: 1200
};

export default Section;