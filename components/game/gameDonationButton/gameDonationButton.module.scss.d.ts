export type Styles = {
  "activeTab": string;
  "backgroundPattern": string;
  "navToggle": string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
