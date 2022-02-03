import { Swiper } from "swiper/react";
import React, { PropsWithChildren } from "react";
import SwiperCore, { Mousewheel, Pagination } from "swiper";

import IVerticalSwiperProps from "components/agility-pageModules/common/verticalSwiper/interfaces/IVerticalSwiperProps";

// Importing css swiper
import "swiper/css";
import "swiper/css/pagination";

import styles from "components/agility-pageModules/common/verticalSwiper/verticalSwiper.module.scss";

// install Swiper modules
SwiperCore.use([Mousewheel, Pagination]);

export default function VerticalSwiper(props: PropsWithChildren<IVerticalSwiperProps>): JSX.Element {
    return (
        <div className={`${styles.swiperWrapper} position-relative`}>
            <Swiper
                className={styles.swiper}
                direction="vertical"
                mousewheel={{ releaseOnEdges: true }}
                onActiveIndexChange={props.onActiveIndexChange}
            >
                {props.children}
            </Swiper>
        </div >
    );
}