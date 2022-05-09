export type Styles = {
  "backgroundPattern": string;
  "bannerContainer": string;
  "carouselItem": string;
  "full": string;
  "half": string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
