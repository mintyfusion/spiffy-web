export type Styles = {
  "backgroundPattern": string;
  "container": string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
