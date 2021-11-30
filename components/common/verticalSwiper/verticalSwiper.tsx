import { Swiper } from "swiper/react";
import React, { PropsWithChildren } from "react";
import SwiperCore, { Mousewheel, Pagination } from "swiper";

import IVerticalSwiperProps from "./interfaces/IVerticalSwiperProps";

// Importing css swiper
import "swiper/css";
import "swiper/css/pagination";

import styles from "components/common/verticalSwiper/verticalSwiper.module.scss";

// Rendering Custom Bullet
const handleRenderBullet = (_: number, className: string) => `<span class="${className}"></span>`;

// install Swiper modules
SwiperCore.use([Mousewheel, Pagination]);

export default function VerticalSwiper(props: PropsWithChildren<IVerticalSwiperProps>): JSX.Element {
    return (
        <div className={`${styles.swiperWrapper} position-relative`}>
            <Swiper
                className={styles.swiper}
                direction={props.isViewportDesktop ? "vertical" : "horizontal"}
                mousewheel={{ releaseOnEdges: true }}
                pagination={{
                    clickable: true,
                    renderBullet: handleRenderBullet,
                    bulletClass: styles.bullets,
                    bulletActiveClass: styles.activeBullets
                }}
                onActiveIndexChange={props.onActiveIndexChange}
            >
                {props.children}
            </Swiper>
        </div >
    );
}