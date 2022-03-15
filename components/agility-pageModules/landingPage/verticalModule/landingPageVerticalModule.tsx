import { Col, Row } from "react-bootstrap";
import { ModuleProps } from "@agility/nextjs";
import Image from "next/image";
import React from "react";

import BreakpointChecks from "hooks/enums/breakpointChecks";
import Breakpoints from "common/style/breakpoints";
import flexbox from "utils/flexbox";
import ILandingPageVerticalModuleProps from "components/agility-pageModules/landingPage/verticalModule/interfaces/ILandingPageVerticalModuleProps";
import styleWords from "utils/styleWords";
import useBreakpoint from "hooks/useBreakpoint";

import styles from "components/agility-pageModules/landingPage/verticalModule/landingPageVerticalModule.module.scss";

const columnAlignCenter = flexbox({ vertical: true, hAlign: "center" });
const rowHAlignCenter = flexbox({ hAlign: "center" });

const VerticalContentSection = (props: ModuleProps<ILandingPageVerticalModuleProps>): JSX.Element => {
    const { verticalContentList } = props.module.fields;

    const isViewportDesktop = useBreakpoint(Breakpoints.MD, BreakpointChecks.Greater);

    return (
        <div className={`position-relative ${styles.content3}`}>
            {verticalContentList.map((content, index) =>
                <Row key={index} className={`${rowHAlignCenter} ${styles.container} w-100 m-0 position-sticky`}>
                    <Col className={`${columnAlignCenter} no-gutters ${styles.contentContainer} p-0 h-100`}>
                        <div>
                            <h1 className={`${styles.headerEmphasisText} position-absolute`}>
                                {verticalContentList[index].fields.highlightedWord}
                            </h1>
                            <aside className={`${styles.panel} ${columnAlignCenter} p-3`} >
                                <h2
                                    className={`${styles.panelHeader} text-center text-md-end m-0`}
                                    dangerouslySetInnerHTML={{
                                        __html: styleWords(content.fields.header, [{
                                            text: content.fields.highlightedWord,
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
                                src={content.fields.image.url}
                                width="1045"
                                height="1099"
                                layout="responsive"
                                priority={true}
                                objectFit="cover"
                            />
                            {isViewportDesktop && <div className="position-sticky bottom-100 text-end p-4">
                                <Image
                                    src="/images/homepage/common/watermark.svg"
                                    width="80px"
                                    height="80px"
                                    layout="intrinsic"
                                    priority={true}
                                />
                            </div>}
                        </Col>}
                </Row>)}
        </div>
    );
};

export default VerticalContentSection;