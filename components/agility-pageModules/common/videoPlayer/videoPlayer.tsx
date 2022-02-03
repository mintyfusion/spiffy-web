import { BaseReactPlayerProps } from "react-player/base";
import React from "react";
import ReactPlayer from "react-player";

import styles from "components/agility-pageModules/common/videoPlayer/videoPlayer.module.scss";

const VideoPlayer = (props: BaseReactPlayerProps): JSX.Element =>
    <div className={styles.videoPlayerContainer} >
        <ReactPlayer
            className={styles.videoPlayer}
            playIcon={
                <div className={` ${styles.playButtonContainer} `}>
                    <button className={`${styles.playButton} bg-transparent`} />
                </div>}
            {...props}
        />
    </div>;

export default VideoPlayer;