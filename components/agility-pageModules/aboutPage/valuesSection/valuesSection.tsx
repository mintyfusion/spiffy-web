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

    return (
        <Row
            className={`w-100 m-0 d-flex flex-column flex-lg-row ${styles.container} position-relative`}
        >
            {fields.contents.map((data, index) =>
                <Col
                    key={index}
                    className={`p-0 w-100 ${styles.cardContainer}`}
                    onMouseEnter={() => setIsCardFocused(index + 1)}
                    onMouseLeave={() => setIsCardFocused(0)}
                >
                    <Stack
                        direction="horizontal"
                        className={`
                        w-100 
                        ${cardFocused && cardFocused !== index + 1 && !breakpoint && "d-none"}
                        position-relative
                         `}
                    >
                        <Image
                            className="test"
                            src={data.fields.image.url}
                            layout="intrinsic"
                            width="450px"
                            height="400px"
                            objectFit="cover"
                        />
                        <div
                            className={`
                               ${cardFocused === index + 1
                                    ? "d-block"
                                    : breakpoint
                                        ? "d-block"
                                        : "d-none"
                                } 
                                ${styles.cardInfo} 
                                position-absolute
                                bottom-0 
                                start-0
                                p-5
                                w-75
                            `}
                        >
                            <h2>{data.fields.title}</h2>
                            <h5>{data.fields.description}</h5>
                        </div>
                    </Stack>
                </Col>
            )}
        </Row>
    );
};

export default ValuesSection;