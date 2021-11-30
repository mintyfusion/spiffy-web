import Swiper from "swiper";

export default interface IVerticalSwiperProps {
    isViewportDesktop: boolean;
    onActiveIndexChange?(swiper: Swiper): void;
}