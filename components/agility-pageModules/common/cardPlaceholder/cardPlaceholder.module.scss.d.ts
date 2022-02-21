export type Styles = {
  "backgroundPattern": string;
  "placeholderColor": string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
