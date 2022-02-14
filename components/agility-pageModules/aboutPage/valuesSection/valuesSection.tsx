import { Col, Row, Stack } from "react-bootstrap";
import { ModuleProps } from "@agility/nextjs";
import Image from "next/image";
import React from "react";

import Breakpoints from "common/style/breakpoints";
import IValuesSectionProps from "components/agility-pageModules/aboutPage/valuesSection/interfaces/IValuesSectionProps";
import useBreakpoint from "hooks/useBreakpoint";

import styles from "components/agility-pageModules/aboutPage/valuesSection/valuesSection.module.scss";

const ValuesSection = (props: ModuleProps<IValuesSectionProps>): JSX.Element => {
    const breakpoint = useBreakpoint(Breakpoints.LG);
    const { fields } = props.module;
    const [cardFocused, setIsCardFocused] = React.useState<number>(0);

    const cardVisibility = React.useCallback((index: number) => cardFocused && cardFocused !== index + 1 && !breakpoint
        ? styles.hide
        : styles.show, [breakpoint, cardFocused]);

    const ImageVisibility = React.useCallback((index: number) => cardFocused === index + 1
        ? `d-block ${styles.show}`
        : breakpoint
            ? `d-block ${styles.show}`
            : "d-none", [breakpoint, cardFocused]);

    return (
        <div>
            <h2 className={`p-4 p-lg-5 text-center m-0 ${styles.headingText}`}>{fields.title}</h2>
            <Row
                className={`w-100 m-0 d-flex flex-column flex-lg-row ${styles.cardContainer} position-relative`}
            >
                {fields.contents.map((data, index) =>
                    <Col
                        key={index}
                        className={`p-0 w-100 ${styles.card}`}
                        onMouseEnter={() => setIsCardFocused(index + 1)}
                        onMouseLeave={() => setIsCardFocused(0)}
                    >
                        <Stack
                            direction="horizontal"
                            className={`
                                ${cardVisibility(index)}
                                w-100 
                                position-relative
                            `}
                        >
                            <Image
                                src={data.fields.image.url}
                                layout="intrinsic"
                                width="450px"
                                height={breakpoint ? "300px" : "450px"}
                                objectFit="cover"
                            />
                            <div
                                className={`
                                    ${ImageVisibility(index)} 
                                    ${styles.cardInfo} 
                                    position-absolute
                                    bottom-0 
                                    start-0
                                    p-5
                                `}
                            >
                                <h2>{data.fields.title}</h2>
                                <h5>{data.fields.description}</h5>
                            </div>
                        </Stack>
                    </Col>
                )}
            </Row>
        </div >
    );
};

export default ValuesSection;