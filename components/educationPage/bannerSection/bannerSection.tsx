import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import { SearchContext } from "pages/[...slug]";
import IContentInfo from "types/IContentnfo";
import ISearchInfo from "components/educationPage/bannerSection/interfaces/ISearchInfo";
import PrimaryButton from "components/common/primaryButton/primaryButton";

import styles from "components/educationPage/bannerSection/bannerSection.module.scss";

const BannerSection = (props: IContentInfo): JSX.Element => {
    const { title, description } = props;
    const [searchedText, setSearchedText] = React.useState<string>("");
    const [disableSearchInput, setDisableSearchInput] = React.useState<boolean>(false);
    const searchRef = React.useRef<HTMLInputElement>();
    const data: ISearchInfo = React.useContext(SearchContext);

    // This sets the input value for the search field
    React.useEffect(() => {
        if (data.searchValue) {
            setSearchedText(data.searchValue);
            setDisableSearchInput(true);
        }
    }, [data.searchValue]);

    const handleSearch = React.useCallback(() => {
        if (!data.searchValue) {
            data.setSearch(searchedText);
            setDisableSearchInput(true);
        } else {
            data.setSearch("");
            setDisableSearchInput(false);
        }
    }, [data, searchedText]);

    return (
        <div className={`text-start position-absolute bottom-0 ${styles.bannerContentContainer}`}>
            <h1 className={styles.title}>{title}</h1>
            <h5 className={styles.description}>{description}</h5>
            <div className={`position-relative ${styles.searchContainer} mt-3`}>
                <input
                    type="text"
                    placeholder="Search"
                    value={searchedText}
                    onChange={(e) => !disableSearchInput && setSearchedText(e.target.value)}
                    ref={searchRef}
                    disabled={disableSearchInput}
                />
                <PrimaryButton
                    variant="warning"
                    className="position-absolute h-100 top-0 end-0"
                    onClick={handleSearch}
                >
                    <FontAwesomeIcon icon={data.searchValue ? faTimes : faSearch} width="25" height="25" />
                </PrimaryButton>
            </div>
        </div >
    );
};

export default BannerSection;