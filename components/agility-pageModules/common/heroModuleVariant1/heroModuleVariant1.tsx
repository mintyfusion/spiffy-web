import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ImageProps } from "next/image";
import { ModuleProps } from "@agility/nextjs";
import React from "react";

import { SearchContext } from "pages/[...slug]";
import Banner from "components/agility-pageModules/common/banner/banner";
import IHeroModuleVariant1Props from "components/agility-pageModules/common/heroModuleVariant1/interfaces/IHeroModuleVariant1Props";
import ISearchInfo from "components/agility-pageModules/common/heroModuleVariant1/interfaces/ISearchInfo";
import PrimaryButton from "components/agility-pageModules/common/primaryButton/primaryButton";

import styles from "components/agility-pageModules/common/heroModuleVariant1/heroModuleVariant1.module.scss";

const HeroModuleVariant1 = (props: ModuleProps<IHeroModuleVariant1Props>): JSX.Element => {
    const { title, description, image, showSearchBar } = props.module.fields;
    const [searchedText, setSearchedText] = React.useState<string>("");
    const [disableSearchInput, setDisableSearchInput] = React.useState<boolean>(false);
    const containerRef = React.useRef<HTMLDivElement>();
    const searchRef = React.useRef<HTMLInputElement>();
    const data: ISearchInfo = React.useContext(SearchContext);

    const galleryData: ImageProps[] = React.useMemo(() =>
        image.media.map(data => ({ src: data.url }))
        , [image.media]);

    // This sets the input value for the search field
    React.useEffect(() => {
        if (data.searchValue) {
            setSearchedText(data.searchValue);
            setDisableSearchInput(true);
        }
    }, [data.searchValue]);

    const handleSearch = React.useCallback((event: React.FormEvent<EventTarget>) => {
        event.preventDefault();
        if (!data.searchValue) {
            data.setSearch(searchedText);
            setDisableSearchInput(true);
        } else {
            data.setSearch("");
            setDisableSearchInput(false);
            containerRef.current.scrollIntoView();
        }
    }, [data, searchedText]);

    const handleInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        !disableSearchInput && setSearchedText(e.target.value);
    }, [disableSearchInput]);

    return (
        <Banner images={galleryData} fullHeight={false}>
            <div
                className={`text-start position-absolute bottom-0 ${styles.bannerContentContainer}`}
                ref={containerRef}
            >
                <h1 className={styles.title}>{title}</h1>
                <h5 className={styles.description}>{description}</h5>
                {showSearchBar &&
                    <div className={`position-relative ${styles.searchContainer} mt-3`} >
                        <form onSubmit={handleSearch}>
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchedText}
                                onChange={handleInputChange}
                                ref={searchRef}
                                disabled={disableSearchInput}
                            />
                            <PrimaryButton
                                variant="warning"
                                className="position-absolute h-100 top-0 end-0"
                                onClick={handleSearch}
                            >
                                <FontAwesomeIcon icon={data.searchValue ? faTimes : faSearch} width="19" height="19" />
                            </PrimaryButton>
                        </form>
                    </div>
                }
            </div>
        </Banner>
    );
};

export default HeroModuleVariant1;