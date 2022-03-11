import { Col, Row, Stack, } from "react-bootstrap";
import { ModuleProps } from "@agility/nextjs";
import React from "react";

import flexbox from "utils/flexbox";
import ILandingPageGetStarted from "components/agility-pageModules/landingPage/getStartedModule/interfaces/ILandingPageGetStartedProps";
import Section from "components/agility-pageModules/common/section/section";
import SectionSide from "components/agility-pageModules/common/section/enums/SectionSide";
import useBreakpoint from "hooks/useBreakpoint";

import styles from "components/agility-pageModules/landingPage/getStartedModule/getStarted.module.scss";
import primaryButtonArrows from "components/agility-pageModules/common/primaryButton/enums/primaryButtonArrows";

const columnAlignCenter = flexbox({ vertical: true, hAlign: "center", vAlign: "start" });
const columnAlignEnd = flexbox({ vertical: true, hAlign: "center", vAlign: "end" });
const rowReverse = flexbox({ vertical: true, reversed: true });
const layoutBreakpoint = 1200;

const LandingPageGetStarted = (props: ModuleProps<ILandingPageGetStarted>): JSX.Element => {
    const { fields } = props.module;
    const [isParentFocused, setIsParentFocused] = React.useState<boolean>(false);
    const [showClassLeft, setShowClassLeft] = React.useState<string>("");
    const [showClassRight, setShowClassRight] = React.useState<string>("");
    const [side, setSide] = React.useState<SectionSide | "">("");
    const isBreakpointMatched = useBreakpoint(layoutBreakpoint);
    const itemAlignment = React.useMemo(() => isBreakpointMatched && "align-items-center", [isBreakpointMatched]);

    const content = React.useMemo(() => ({
        leftPart: {
            title: fields.leftTitle,
            description: fields.leftDescription
        },
        rightPart: {
            title: fields.rightTitle,
            description: fields.rightDescription
        }
    }), [fields]);

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
            className={`${styles.content2} ${!isBreakpointMatched && `${showClassLeft} ${showClassRight}`} h-100`}
            onMouseEnter={() => handleFocus(true)}
            onMouseLeave={() => handleFocus(false)}
        >
            <Row className={`${styles.content2Container} ${rowReverse} flex-xl-row m-0 h-100`} >
                <Col
                    className={`${columnAlignEnd} p-0 ${styles.leftSection} ${itemAlignment}`}
                    onMouseEnter={() => handleGetStartedButtonLeft(true)}
                    onMouseLeave={() => handleGetStartedButtonLeft(false)}
                >
                    <Section
                        direction={SectionSide.left}
                        content={content.leftPart}
                        buttonClassName={`
                            ${styles.btnGetStarted} 
                            ${!isBreakpointMatched && side !== SectionSide.left && "opacity-0"}
                        `}
                        contentClassName={styles.leftSectionRight}
                        href={fields.leftSectionHref.href}
                        buttonText="Get Started"
                        responsiveBreakpoint={layoutBreakpoint}
                        showButtonArrowColor={primaryButtonArrows.white}
                    />
                </Col>
                <Col
                    className={`${columnAlignCenter} no-gutters ${styles.rightSection} ${itemAlignment}`}
                    onMouseEnter={() => handleGetStartedButtonRight(true)}
                    onMouseLeave={() => handleGetStartedButtonRight(false)}
                >
                    <Section
                        direction={SectionSide.right}
                        content={content.rightPart}
                        buttonClassName={`
                            ${styles.btnGetStarted}
                            ${!isBreakpointMatched && side !== SectionSide.right && "opacity-0"}
                        `}
                        contentClassName={styles.rightSectionLeft}
                        href={fields.rightSectionHref.href}
                        buttonText="Get Started"
                        responsiveBreakpoint={layoutBreakpoint}
                        showButtonArrowColor={primaryButtonArrows.red}
                    />
                </Col>
            </Row>
        </Stack>
    </div>;
};

export default LandingPageGetStarted;