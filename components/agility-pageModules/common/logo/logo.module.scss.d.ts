export type Styles = {
  "backgroundPattern": string;
  "footerLogoDimensions": string;
  "headerLogoDimensions": string;
  "red": string;
  "white": string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
