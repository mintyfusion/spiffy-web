export type Styles = {
  "backgroundPattern": string;
  "bold20": string;
  "bold24": string;
  "medium18": string;
  "medium20": string;
  "medium25": string;
  "primaryButton": string;
  "regular12": string;
  "regular13": string;
  "regular15": string;
  "regular16": string;
  "regular18": string;
  "regular20": string;
  "regular24": string;
  "regular25": string;
  "semiBold16": string;
  "semiBold20": string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
