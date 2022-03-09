import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";

import BreakpointChecks from "hooks/enums/breakpointChecks";
import Breakpoints from "common/style/breakpoints";
import DetailsType from "components/agility-pageModules/educationDetailsModule/detailsSection/enums/detailsType";
import IDetailsSectionProps from "components/agility-pageModules/educationDetailsModule/detailsSection/interfaces/IDetailsSectionProps";
import renderHtml from "utils/renderHtml";
import useBreakpoint from "hooks/useBreakpoint";

import styles from "components/agility-pageModules/educationDetailsModule/detailsSection/detailsSection.module.scss";

const VideoPlayer = dynamic(() => import("components/agility-pageModules/common/videoPlayer/videoPlayer"));

const DetailsSection = (props: IDetailsSectionProps): JSX.Element => {
    const breakpoint = useBreakpoint(Breakpoints.LG, BreakpointChecks.Greater);

    return (
        <div className={`${styles.detailsContainer} position-relative`}>
            {breakpoint && <h5 className="text-capitalize">{props.title}</h5>}
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
            <div dangerouslySetInnerHTML={renderHtml(props.htmlContent)} />
        </div>
    );
};

export default DetailsSection;