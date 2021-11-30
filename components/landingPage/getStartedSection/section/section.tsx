import { Button, Col, Row } from "react-bootstrap";
import Image from "next/image";
import React from "react";

import flexbox from "utils/flexbox";
import getStartedArrow from "public/images/homepage/get-started-section/getstarted-arrow.svg";
import GetStartedContentSectionSide from "components/landingPage/getStartedSection/section/enums/getStartedContentSectionSide";
import IGetStartedSectionProps from "components/landingPage/getStartedSection/section/interfaces/IGetStartedSectionProps";
import Link from "components/common/link/link";

import styles from "components/landingPage/getStartedSection/section/section.module.scss";

const columnAlignEnd = flexbox({ vertical: true, hAlign: "center", vAlign: "end" });
const rowAlign = flexbox({ vAlign: "center", hAlign: "center" });

const Section = (props: IGetStartedSectionProps): JSX.Element => {
    const { header, subHeader, description } = props.content;

    const direction = React.useMemo(() => {
        switch (props.direction) {
            case GetStartedContentSectionSide.left:
                return "flex-row";

            case GetStartedContentSectionSide.right:
            default:
                return "flex-row-reverse";
        }
    }, [props.direction]);

    return <Row className={`flex-nowrap ${direction}`}>
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
              ${props.direction === GetStartedContentSectionSide.left && columnAlignEnd} 
              no-gutters 
              ${props.contentClassName} 
              text-end
        `}
        >
            <h2>{header}</h2>
            <h2>{subHeader}</h2>
            <h5 className={`${props.direction === GetStartedContentSectionSide.right
                ? "text-end text-xl-start"
                : "text-end"
                }`}
            >
                {description}
            </h5>
        </Col>
    </Row>;
};

export default Section;