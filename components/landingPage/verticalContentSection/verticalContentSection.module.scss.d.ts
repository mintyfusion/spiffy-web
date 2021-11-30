export type Styles = {
  "active": string;
  "backgroundPattern": string;
  "bold109": string;
  "bold150": string;
  "bold178": string;
  "bold24": string;
  "bold60": string;
  "bold67": string;
  "container": string;
  "content3": string;
  "contentContainer": string;
  "headerEmphasisText": string;
  "hide": string;
  "highlightText": string;
  "panel": string;
  "panelHeader": string;
  "regular16": string;
  "regular24": string;
  "regular25": string;
  "selector": string;
  "selectors": string;
  "show": string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
