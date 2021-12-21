import { Col, Row, Stack, } from "react-bootstrap";
import React from "react";

import flexbox from "utils/flexbox";
import IGetStartedSectionProps from "components/landingPage/getStartedSection/Interfaces/IGetStartedSectionProps";
import Section from "components/common/section/section";
import SectionSide from "components/common/section/enums/SectionSide";
import useBreakpoint from "hooks/useBreakpoint";

import styles from "components/landingPage/getStartedSection/getStarted.module.scss";

const columnAlignCenter = flexbox({ vertical: true, hAlign: "center", vAlign: "start" });
const columnAlignEnd = flexbox({ vertical: true, hAlign: "center", vAlign: "end" });
const rowReverse = flexbox({ vertical: true, reversed: true });
const layoutBreakpoint = 1200;

const GetStarted = (props: IGetStartedSectionProps): JSX.Element => {
    const [isParentFocused, setIsParentFocused] = React.useState<boolean>(false);
    const [showClassLeft, setShowClassLeft] = React.useState<string>("");
    const [showClassRight, setShowClassRight] = React.useState<string>("");
    const [side, setSide] = React.useState<SectionSide | "">("");
    const { leftPart, rightPart } = props.content;
    const isBreakpointMatched = useBreakpoint(layoutBreakpoint);

    const itemAlignment = React.useMemo(() => isBreakpointMatched && "align-items-center", [isBreakpointMatched]);

    // Handles if mouse is still hovered over the content div
    const handleFocus = React.useCallback((state: boolean) => {
        setIsParentFocused(!isParentFocused);
        setSide(!state ? "" : side);
    }, [isParentFocused, side]);

    const handleGetStartedButtonLeft = React.useCallback((state: boolean) => {
        setShowClassLeft(state
            ? side === SectionSide.right
                ? styles.showLeftIn
                : styles.showLeft
            : isParentFocused
                ? styles.resetLeft
                : "");

        setSide(SectionSide.left);
        setShowClassRight("");
    }, [side, isParentFocused]);

    const handleGetStartedButtonRight = React.useCallback((state: boolean) => {
        setShowClassRight(state
            ? side === SectionSide.left
                ? styles.showRightIn
                : styles.showRight
            : isParentFocused
                ? styles.resetRight
                : "");

        setSide(SectionSide.right);
        setShowClassLeft("");
    }, [side, isParentFocused]);

    return <div className={`position-relative overflow-hidden ${styles.wrapperDiv}`}>
        <Stack
            className={`${styles.content2} ${!isBreakpointMatched && `${showClassLeft} ${showClassRight}`}`}
            onMouseEnter={() => handleFocus(true)}
            onMouseLeave={() => handleFocus(false)}
        >
            <Row className={`${styles.content2Container} ${rowReverse} flex-xl-row m-0`} >
                <Col
                    className={`${columnAlignEnd} no-gutters h-100 ${styles.leftSection} ${itemAlignment}`}
                    onMouseEnter={() => handleGetStartedButtonLeft(true)}
                    onMouseLeave={() => handleGetStartedButtonLeft(false)}
                >
                    <Section
                        direction={SectionSide.left}
                        content={leftPart}
                        buttonClassName={`${styles.btnGetStarted} ${!isBreakpointMatched && "opacity-0"}`}
                        contentClassName={styles.leftSectionRight}
                        href="/"
                        buttonText="Get Started"
                        responsiveBreakpoint={layoutBreakpoint}
                    />
                </Col>
                <Col
                    className={`${columnAlignCenter} no-gutters h-100 ${styles.rightSection} ${itemAlignment}`}
                    onMouseEnter={() => handleGetStartedButtonRight(true)}
                    onMouseLeave={() => handleGetStartedButtonRight(false)}
                >
                    <Section
                        direction={SectionSide.right}
                        content={rightPart}
                        buttonClassName={`${styles.btnGetStarted} ${!isBreakpointMatched && "opacity-0"}`}
                        contentClassName={styles.rightSectionLeft}
                        href="/"
                        buttonText="Get Started"
                        responsiveBreakpoint={layoutBreakpoint}
                    />
                </Col>
            </Row>
        </Stack>
    </div>;
};

export default GetStarted;