export type Styles = {
  "backgroundPattern": string;
  "bannerCaption": string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
