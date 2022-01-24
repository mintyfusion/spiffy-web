export type Styles = {
  "backgroundPattern": string;
  "cardContainer": string;
  "cardInfo": string;
  "container": string;
  "overlay": string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
