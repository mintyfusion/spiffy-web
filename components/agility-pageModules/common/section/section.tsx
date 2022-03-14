import { Col, Row } from "react-bootstrap";
import React from "react";

import flexbox from "utils/flexbox";
import ISectionProps from "components/agility-pageModules/common/section/interfaces/ISectionProps";
import PrimaryButton from "components/agility-pageModules/common/primaryButton/primaryButton";
import primaryButtonArrows from "components/agility-pageModules/common/primaryButton/enums/primaryButtonArrows";
import SectionSide from "components/agility-pageModules/common/section/enums/SectionSide";
import useBreakpoint from "hooks/useBreakpoint";

import styles from "components/agility-pageModules/common/section/section.module.scss";

const colCenter = flexbox({ vertical: true, hAlign: "center", vAlign: "center" });
const colEnd = flexbox({ vertical: true, hAlign: "center", vAlign: "end" });
const rowAlign = flexbox({ vAlign: "center", hAlign: "center" });

const Section = (props: ISectionProps): JSX.Element => {
    const { title, description } = props.content;
    const isBreakpointMatched = useBreakpoint(props.responsiveBreakpoint);

    const rowDirection = React.useMemo(() => {
        if (isBreakpointMatched || props.direction === SectionSide.center) {
            return "flex-column-reverse gap-3 align-self-center";
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
                ? colCenter
                : colEnd
            : ""
        , [isBreakpointMatched, props.direction]);

    const alignment = React.useMemo(() => {
        if (isBreakpointMatched || props.direction === SectionSide.center) {
            return "text-center w-100";
        }

        return props.direction === SectionSide.right
            ? "text-end text-xl-start"
            : "text-end";

    }, [isBreakpointMatched, props.direction]);

    const linkHref = React.useMemo(() => ({
        href: props.href
    }), [props.href]);

    const arrowColor = React.useMemo(() => {
        switch (props.inverted) {
            case "true":
                return primaryButtonArrows.darkGrey;
            case "false":
                return primaryButtonArrows.grey;
            default:
                return props.showButtonArrowColor;
        }
    }, []);

    return <Row className={`flex-nowrap ${rowDirection}`}>
        <Col className={`${rowAlign}`}>
            <PrimaryButton
                className={`
                        ${styles.sectionButton}
                        ${props.buttonClassName} 
                        position-relative
                        ${props.direction === SectionSide.center && "opacity-100"}
                        ${!props.showButtonArrow && "p-3"}
                    `}
                showArrow={props.showButtonArrow}
                linkProps={linkHref}
                arrowColor={arrowColor}
            >
                {props.buttonText}
            </PrimaryButton>
        </Col>
        <Col
            className={`
              ${colDirection}
              no-gutters 
              ${props.contentClassName}
              ${alignment}
        `}
        >
            <h2 className={`w-100 ${props.direction === SectionSide.center && "mb-2 mb-md-3"}`}>
                {title}
            </h2>
            <h5>
                {description}
            </h5>
        </Col>
    </Row>;
};

Section.defaultProps = {
    responsiveBreakpoint: 1200,
    showButtonArrow: true
};

export default Section;