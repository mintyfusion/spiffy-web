import { BaseReactPlayerProps } from "react-player/base";
import dynamic from "next/dynamic";
import React from "react";

import styles from "components/agility-pageModules/common/videoPlayer/videoPlayer.module.scss";

const ReactPlayer = dynamic(() => import("react-player"));

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