import { renderHTML } from "@agility/nextjs";
import Image from "next/image";
import React from "react";

import DetailsType from "components/agility-pageModules/educationDetailsModule/detailsSection/enums/detailsType";
import IDetailsSectionProps from "components/agility-pageModules/educationDetailsModule/detailsSection/interfaces/IDetailsSectionProps";
import VideoPlayer from "components/agility-pageModules/common/videoPlayer/videoPlayer";

import styles from "components/agility-pageModules/educationDetailsModule/detailsSection/detailsSection.module.scss";

const DetailsSection = (props: IDetailsSectionProps): JSX.Element => 
        <div className={`${styles.detailsContainer} position-relative`}>
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