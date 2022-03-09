export type Styles = {
  "backgroundPattern": string;
  "playButton": string;
  "playButtonContainer": string;
  "videoPlayer": string;
  "videoPlayerContainer": string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
