import { Col, Row, Stack, } from "react-bootstrap";
import React from "react";

import flexbox from "utils/flexbox";
import getStartedContentData from "components/landingPage/getStartedSection/getStartedContentData";
import GetStartedContentSectionSide from "components/landingPage/getStartedSection/section/enums/getStartedContentSectionSide";
import Section from "components/landingPage/getStartedSection/section/section";
import useBreakpoint from "hooks/useBreakpoint";

import styles from "components/landingPage/getStartedSection/getStarted.module.scss";

const columnAlignCenter = flexbox({ vertical: true, hAlign: "center", vAlign: "start" });
const columnAlignEnd = flexbox({ vertical: true, hAlign: "center", vAlign: "end" });
const rowReverse = flexbox({ vertical: true, reversed: true });
const layoutBreakpoint = 1200;

const GetStarted = (): JSX.Element => {
    const [isParentFocused, setIsParentFocused] = React.useState<boolean>(false);
    const [showClassLeft, setShowClassLeft] = React.useState<string>("");
    const [showClassRight, setShowClassRight] = React.useState<string>("");
    const [side, setSide] = React.useState<GetStartedContentSectionSide | "">("");
    const { leftPart, rightPart } = getStartedContentData;
    const isViewportTablet = useBreakpoint(layoutBreakpoint);

    // Handles if mouse is still hovered over the content div
    const handleFocus = React.useCallback((state: boolean) => {
        setIsParentFocused(!isParentFocused);
        setSide(!state ? "" : side);
    }, [isParentFocused, side]);

    const handleGetStartedButtonLeft = React.useCallback((state: boolean) => {
        setShowClassLeft(state
            ? side === GetStartedContentSectionSide.right
                ? styles.showLeftIn
                : styles.showLeft
            : isParentFocused
                ? styles.resetLeft
                : "");

        setSide(GetStartedContentSectionSide.left);
        setShowClassRight("");
    }, [side, isParentFocused]);

    const handleGetStartedButtonRight = React.useCallback((state: boolean) => {
        setShowClassRight(state
            ? side === GetStartedContentSectionSide.left
                ? styles.showRightIn
                : styles.showRight
            : isParentFocused
                ? styles.resetRight
                : "");

        setSide(GetStartedContentSectionSide.right);
        setShowClassLeft("");
    }, [side, isParentFocused]);

    return <div className={`position-relative overflow-hidden ${styles.wrapperDiv}`}>
        <Stack
            className={`${styles.content2} ${!isViewportTablet && `${showClassLeft} ${showClassRight}`}`}
            onMouseEnter={() => handleFocus(true)}
            onMouseLeave={() => handleFocus(false)}
        >
            <Row className={`${styles.content2Container} ${rowReverse} flex-xl-row m-0`} >
                <Col
                    className={`${columnAlignEnd} no-gutters h-100 ${styles.leftSection}`}
                    onMouseEnter={() => handleGetStartedButtonLeft(true)}
                    onMouseLeave={() => handleGetStartedButtonLeft(false)}
                >
                    <Section
                        direction={GetStartedContentSectionSide.left}
                        content={leftPart}
                        buttonClassName={styles.btnGetStarted}
                        contentClassName={styles.leftSectionRight}
                    />
                </Col>
                <Col
                    className={`${columnAlignCenter} no-gutters h-100 ${styles.rightSection}`}
                    onMouseEnter={() => handleGetStartedButtonRight(true)}
                    onMouseLeave={() => handleGetStartedButtonRight(false)}
                >
                    <Section
                        direction={GetStartedContentSectionSide.right}
                        content={rightPart}
                        buttonClassName={styles.btnGetStarted}
                        contentClassName={styles.rightSectionLeft}
                    />
                </Col>
            </Row>
        </Stack>
    </div>;
};

export default GetStarted;