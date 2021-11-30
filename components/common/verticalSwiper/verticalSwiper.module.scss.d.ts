export type Styles = {
  "activeBullets": string;
  "bullets": string;
  "swiper": string;
  "swiperWrapper": string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
