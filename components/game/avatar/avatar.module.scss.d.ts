export type Styles = {
  "backgroundPattern": string;
  "green": string;
  "orange": string;
  "purple": string;
  "red": string;
  "yellow": string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
