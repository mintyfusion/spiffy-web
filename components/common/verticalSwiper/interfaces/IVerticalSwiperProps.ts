import Swiper from "swiper";

export default interface IVerticalSwiperProps {
    onActiveIndexChange?(swiper: Swiper): void;
}