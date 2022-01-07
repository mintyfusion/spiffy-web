import { renderHTML } from "@agility/nextjs";
import Image from "next/image";
import React from "react";

import DetailsType from "components/educationDetailsPage/detailsSection/enums/detailsType";
import IDetailsSectionProps from "components/educationDetailsPage/detailsSection/interfaces/IDetailsSectionProps";
import VideoPlayer from "components/common/videoPlayer/videoPlayer";

import styles from "components/educationDetailsPage/detailsSection/detailsSection.module.scss";

const DetailsSection = (props: IDetailsSectionProps): JSX.Element =>
    <div className={styles.detailsContainer}>
        <h5>{props.title}</h5>
        <h1>{props.description}</h1>
        <div className={styles.mediaContainer}>
            {props.detailsType == DetailsType.guide
                ? <Image
                    src={props.mediaSrc}
                    layout="responsive"
                    width="1670px"
                    height="700px"
                    priority={true}
                />
                : <VideoPlayer width="100%" height="100%" url={props.mediaSrc} />
            }
        </div>
        <div dangerouslySetInnerHTML={renderHTML(props.htmlContent)} />
    </div>;

export default DetailsSection;