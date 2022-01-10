import { renderHTML } from "@agility/nextjs";
import Image from "next/image";
import React from "react";

import DetailsType from "components/educationDetailsPage/detailsSection/enums/detailsType";
import flexbox from "utils/flexbox";
import IDetailsSectionProps from "components/educationDetailsPage/detailsSection/interfaces/IDetailsSectionProps";
import VideoPlayer from "components/common/videoPlayer/videoPlayer";

import styles from "components/educationDetailsPage/detailsSection/detailsSection.module.scss";

const colAlign = flexbox({ vertical: true });
const rowAlign = flexbox();

const DetailsSection = (props: IDetailsSectionProps): JSX.Element => {

    // Puts the blockquotes in a two colurm container with spiffy logos
    React.useEffect(() => {
        const blockElement = document.querySelectorAll("Blockquote");
        blockElement.forEach((element, index) => {
            const containerElement = document.getElementById(`blockquote${index}`) === null && document.createElement("div");
            if (containerElement) {
                containerElement.innerHTML = `<div class="${rowAlign} gap-2">
                                     <img class="${styles.logoIcon}" src="/images/educationDetailsPage/spiffy.svg"/>
                                     <img class="${styles.logoIcon}" src="/images/educationDetailsPage/spiffy.svg"/>
                                        </div>`;
                containerElement.id = `blockquote${index}`;
                containerElement.className = `${colAlign} flex-lg-row ${styles.blockContainer}`;
                element && element.parentNode.insertBefore(containerElement, element);
                element.remove();
                document.getElementById(`blockquote${index}`).appendChild(element);
            }
        });
    }, []);

    return (
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
        </div>
    );
};
export default DetailsSection;