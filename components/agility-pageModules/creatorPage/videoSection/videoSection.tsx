import { ModuleProps } from "@agility/nextjs";
import { Row } from "react-bootstrap";
import dynamic from "next/dynamic";
import React from "react";

import IVideoSectionProps from "components/agility-pageModules/creatorPage/videoSection/interfaces/IVideoSectionProps";
import styles from "components/agility-pageModules/creatorPage/videoSection/videoSection.module.scss";

const VideoPlayer = dynamic(() => import("components/agility-pageModules/common/videoPlayer/videoPlayer"));

const VideoSection = (props: ModuleProps<IVideoSectionProps>): JSX.Element => {
    const { fields } = props.module;

    const preparedData = React.useMemo(() => ({
        light: fields.thumbnail?.url,
        url: fields.url.href
    }), [fields?.thumbnail, fields.url]);

    return (
        <Row className={`${styles.videoSectionContainer} m-0`}>
            <VideoPlayer width="100%" height="75vh" controls {...preparedData} />
        </Row>
    );
};

export default VideoSection;