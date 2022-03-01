import { Col, Row } from "react-bootstrap";
import Image from "next/image";
import React from "react";

import BreakpointChecks from "hooks/enums/breakpointChecks";
import Breakpoints from "common/style/breakpoints";
import flexbox from "utils/flexbox";
import IVerticalContentData from "components/landingPage/verticalContentSection/interfaces/IVerticalContentData";
import IVerticalSectionProps from "components/landingPage/verticalContentSection/interfaces/IVerticalSectionProps";
import styleWords from "utils/styleWords";
import useBreakpoint from "hooks/useBreakpoint";

import styles from "components/landingPage/verticalContentSection/verticalContentSection.module.scss";

const columnAlignCenter = flexbox({ vertical: true, hAlign: "center" });
const rowHAlignCenter = flexbox({ hAlign: "center" });

const VerticalContentSection = (props: IVerticalSectionProps): JSX.Element => {
    const isViewportDesktop = useBreakpoint(Breakpoints.MD, BreakpointChecks.Greater);

    return (
        <div className={`position-relative ${styles.content3}`}>
            {props.content.map((content: IVerticalContentData, index) => <Row key={index} className={`${rowHAlignCenter} ${styles.container} w-100 m-0 position-sticky`} id="parallax">
                <Col className={`${columnAlignCenter} no-gutters ${styles.contentContainer} p-0`}>
                    <div>
                        <h1 className={`${styles.headerEmphasisText} position-absolute`}>
                            {props.content[index].highlightedWord}
                        </h1>
                        <aside className={`${styles.panel} ${columnAlignCenter} p-3`} >
                            <h2
                                className={`${styles.panelHeader} text-center text-md-end m-0`}
                                dangerouslySetInnerHTML={{
                                    __html: styleWords(content.header, [{
                                        text: content.highlightedWord,
                                        className: styles.highlightText,
                                    }])
                                }}
                            />
                        </aside>
                    </div>
                </Col>
                {isViewportDesktop &&
                    <Col className={`${styles.parallaxColumnRigth} p-0 h-100`}>
                        <Image
                            src={content.image.src}
                            width="1045"
                            height="1099"
                            layout="responsive"
                            priority={true}
                            objectFit="cover"
                        />
                        <div className="position-absolute bottom-0 end-0 h-100">
                            <Image
                                src="/images/homepage/common/watermark.svg"
                                width="80px"
                                height="80px"
                                layout="intrinsic"
                                priority={true}
                            />
                        </div>
                    </Col>}
            </Row>)}
        </div>
    );
};

export default VerticalContentSection;
