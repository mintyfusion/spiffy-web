export type Styles = {
  "backgroundPattern": string;
  "bannerContainer": string;
  "carouselInner": string;
  "carouselItem": string;
  "full": string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
