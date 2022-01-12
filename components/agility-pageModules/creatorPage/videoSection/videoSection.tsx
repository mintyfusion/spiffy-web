import { ModuleProps } from "@agility/nextjs";
import { Row } from "react-bootstrap";
import React from "react";

import BreakpointChecks from "hooks/enums/breakpointChecks";
import Breakpoints from "common/style/breakpoints";
import IVideoSectionProps from "components/agility-pageModules/creatorPage/videoSection/interfaces/IVideoSectionProps";
import useBreakpoint from "hooks/useBreakpoint";
import VideoPlayer from "components/common/videoPlayer/videoPlayer";

import styles from "components/agility-pageModules/creatorPage/videoSection/videoSection.module.scss";

const VideoSection = (props: ModuleProps<IVideoSectionProps>): JSX.Element => {
    const breakpoint = useBreakpoint(Breakpoints.XXL, BreakpointChecks.Greater);
    const { fields } = props.module;

    const preparedData = {
        light: fields.thumbnail.url,
        url: fields.url.href
    };

    return (
        <Row className={`${styles.videoSectionContainer} m-0`}>
            <VideoPlayer width="100%" height={breakpoint ? "75vh" : "100%"} playing controls {...preparedData} />
        </Row>
    );
};

export default VideoSection;