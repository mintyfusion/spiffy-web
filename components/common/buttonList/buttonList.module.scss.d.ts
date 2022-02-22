export type Styles = {
  "active": string;
  "activeTab": string;
  "backgroundPattern": string;
  "donationButton": string;
  "inactive": string;
  "nav": string;
  "navToggle": string;
  "show": string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
