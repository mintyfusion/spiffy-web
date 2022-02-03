import { Col, Row, Stack, } from "react-bootstrap";
import { ContentItem } from "@agility/nextjs";
import { Swiper } from "swiper";
import { SwiperSlide } from "swiper/react";
import Image from "next/image";
import React from "react";

import BreakpointChecks from "hooks/enums/breakpointChecks";
import Breakpoints from "common/style/breakpoints";
import flexbox from "utils/flexbox";
import IVerticalContentData from "components/landingPage/verticalContentSection/interfaces/IVerticalContentData";
import IVerticalSectionProps from "components/landingPage/verticalContentSection/interfaces/IVerticalSectionProps";
import styleWords from "utils/styleWords";
import useBreakpoint from "hooks/useBreakpoint";
import VerticalSwiper from "components/agility-pageModules/common/verticalSwiper/verticalSwiper";

import styles from "components/landingPage/verticalContentSection/verticalContentSection.module.scss";

const columnAlignCenter = flexbox({ vertical: true, hAlign: "center" });
const rowHAlignCenter = flexbox({ hAlign: "center" });

const VerticalContentSection = (props: IVerticalSectionProps): JSX.Element => {
    const [currentIndex, setCurrentIndex] = React.useState<number>(0);
    const isViewportDesktop = useBreakpoint(Breakpoints.MD, BreakpointChecks.Greater);

    const onActiveIndexChange = React.useCallback((swiper: Swiper) => {
        setCurrentIndex(swiper.activeIndex);
    }, []);

    return <Stack className={`${styles.content3} position-relative`} >
        <Row className={`m-0 ${styles.container}`}>
            <h1 className={`${styles.headerEmphasisText} position-absolute`}>
                {props.content[currentIndex].fields.highlightedWord}
            </h1>
            <Col
                className={`${columnAlignCenter} no-gutters ${styles.contentContainer} p-0`}
            >
                <VerticalSwiper onActiveIndexChange={onActiveIndexChange}>
                    {props.content.map((content: ContentItem<IVerticalContentData>, index) =>
                        <SwiperSlide key={index}>
                            <Row className={`${rowHAlignCenter} w-100 m-0`}>
                                <Col>
                                    <Stack
                                        direction="horizontal"
                                        className="flex-sm-column-reverse flex-column-reverse flex-md-row gap-sm-4 gap-1"
                                    >
                                        <div>
                                            <aside className={`${styles.panel} ${columnAlignCenter} pt-3 p-1`} >
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
                                    </Stack>
                                </Col>
                                {isViewportDesktop &&
                                    <Col className="p-0 ms-3">
                                        <Image
                                            src={content.fields.image.url}
                                            width="1045"
                                            height="1099"
                                            layout="responsive"
                                            priority={true}
                                        />
                                        <div className="position-absolute bottom-0 end-0">
                                            <Image
                                                src="/images/homepage/common/watermark.svg"
                                                width="80px"
                                                height="80px"
                                                layout="intrinsic"
                                                priority={true}
                                            />
                                        </div>
                                    </Col>}
                            </Row>
                        </SwiperSlide>
                    )}
                </VerticalSwiper>
            </Col>
        </Row>
    </Stack>;
};

export default VerticalContentSection;
