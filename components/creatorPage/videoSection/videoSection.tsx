import { BaseReactPlayerProps } from "react-player/base";
import { Row } from "react-bootstrap";
import React from "react";

import BreakpointChecks from "hooks/enums/breakpointChecks";
import Breakpoints from "common/style/breakpoints";
import useBreakpoint from "hooks/useBreakpoint";
import VideoPlayer from "components/common/videoPlayer/videoPlayer";

import styles from "components/creatorPage/videoSection/videoSection.module.scss";

const VideoSection = (props: BaseReactPlayerProps): JSX.Element => {
    const breakpoint = useBreakpoint(Breakpoints.XXL, BreakpointChecks.Greater);

    return (
        <Row className={`${styles.videoSectionContainer} m-0`}>
            <VideoPlayer width="100%" height={breakpoint ? "75vh" : "100%"} playing controls {...props.video} />
        </Row>
    );
};

export default VideoSection;