export type Styles = {
  "backgroundPattern": string;
  "card": string;
  "cardPlaceholderContainer": string;
  "placeholderColor": string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
