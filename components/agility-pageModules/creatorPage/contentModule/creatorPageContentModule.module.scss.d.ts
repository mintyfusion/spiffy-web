export type Styles = {
  "backgroundPattern": string;
  "container": string;
  "containerAlternate": string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
