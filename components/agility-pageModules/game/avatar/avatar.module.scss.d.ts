export type Styles = {
  "backgroundPattern": string;
  "black": string;
  "brown": string;
  "green": string;
  "orange": string;
  "purple": string;
  "red": string;
  "white": string;
  "yellow": string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
