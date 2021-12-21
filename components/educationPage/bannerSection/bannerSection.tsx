import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import IContentInfo from "types/IContentnfo";
import PrimaryButton from "components/common/primaryButton/primaryButton";

import styles from "components/educationPage/bannerSection/bannerSection.module.scss";

const BannerSection = (props: IContentInfo): JSX.Element => {
    const { title, description } = props;

    return (
        <div className={`text-start position-absolute bottom-0 ${styles.bannerContentContainer}`}>
            <h1 className={styles.title}>{title}</h1>
            <h5 className={styles.description}>{description}</h5>
            <div className={`position-relative ${styles.searchContainer} mt-3`}>
                <input type="text" placeholder="Search" />
                <PrimaryButton href="#" variant="warning" className="position-absolute end-0 h-100">
                    <FontAwesomeIcon icon={faSearch} width="25" height="25"/>
                </PrimaryButton>
            </div>
        </div>
    );
};

export default BannerSection;