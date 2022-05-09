import { Row } from "react-bootstrap";
import { scroller } from "react-scroll";
import React, { CSSProperties } from "react";

import Avatar from "components/agility-pageModules/game/avatar/gameAvatar";
import ButtonList from "components/agility-pageModules/common/buttonList/buttonList";
import flexbox from "utils/flexbox";
import GamePageAvatarType from "components/agility-pageModules/game/gameSection/enums/GamePageAvatarTypes";
import GamePageStepTypes from "components/agility-pageModules/game/gameSection/enums/gamePageStepTypes";
import IGameAvatarList from "components/agility-pageModules/game/gameAvatarList/interfaces/IAvatarList";
import percentages from "components/agility-pageModules/game/gameAvatarList/gameAvatarListContent";

import styles from "components/agility-pageModules/game/gameAvatarList/gameAvatarList.module.scss";

const colCenter = flexbox({ vertical: true, hAlign: "center", vAlign: "center" });
const rowHBetween = flexbox({ hAlign: "between" });
const marginFifteen = 15;
const marginFive = 5;
// Avatar random sizes numbers
// No need to understand the numbers, array itself tells the meaning.
const sizes = [20, 22, 25, 27, 30, 33, 35, 37, 40]; // eslint-disable-line @typescript-eslint/no-magic-numbers
const sizesMobile = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; // eslint-disable-line @typescript-eslint/no-magic-numbers
const mobile = 770;
const friendsSliceStartIndex = 2;
const friendsSliceEndIndex = 4;
const containerId = "containerElement";

const avatars = Object.values(GamePageAvatarType);

/**
 * Random margin for avatars.
 */
function getRandomMargin() {
    const width = window.innerWidth;
    if (width < mobile) {
        return Math.floor(Math.random() * marginFive + marginFive);
    }

    /** 
     * Plus marginFive is for random margin will not be generated below 5 
     */
    return Math.floor(Math.random() * marginFifteen + marginFive);
}

/**
 * Random size for avatars.
 */
function getRandomSize() {
    const width = window.innerWidth;

    if (width < mobile) {
        const randomIndex = Math.floor(Math.random() * sizesMobile.length);

        return sizesMobile[randomIndex];
    }

    const randomIndex = Math.floor(Math.random() * sizes.length);

    return sizes[randomIndex];
}

/**
 * Random flex-align for avatars.
 */
function getRandomAlignSelf() {
    const values = ["flex-end", "flex-start", "center"];
    const randomIndex = Math.floor(Math.random() * values.length);

    return values[randomIndex];
}

/**
 * Random colors for avatars.
 */
function getRandomAvatars() {
    const randomIndex = Math.floor(Math.random() * avatars.length);

    return avatars[randomIndex];
}

const percentage = Object.keys(percentages);
const GameAvatarList = (props: IGameAvatarList): JSX.Element => {
    const [selectedKey, setSelectedKey] = React.useState("1");

    const handleBtnClick = React.useCallback((key: string) => {
        setSelectedKey(key);
    }, []);

    /**
     * Rendering avatars
     */
    const avatars = React.useMemo(() => {
        const { totalAvatarsToShow } = percentages[selectedKey];
        const arr: JSX.Element[] = [];

        for (let i = 0; i < totalAvatarsToShow; i++) {
            const size = getRandomSize();
            const style: CSSProperties = {
                height: size,
                width: size,
                marginTop: getRandomMargin(),
                marginRight: getRandomMargin(),
                marginBottom: getRandomMargin(),
                marginLeft: getRandomMargin(),
                alignSelf: getRandomAlignSelf(),
                transition: ".3s",
            };

            arr.push(
                <div key={i} style={style}>
                    <Avatar
                        color={getRandomAvatars()}
                        size={size}
                    />
                </div>
            );
        }

        return arr;
    }, [selectedKey]);

    const renderAddedFriends = React.useCallback((isTop: boolean) => {
        const arrFriends = isTop
            ? props.friends.slice(0, friendsSliceStartIndex)
            : props.friends.slice(friendsSliceStartIndex, friendsSliceEndIndex);

        const style = isTop ? styles.friendsTop : styles.friendsBottom;

        return <Row className={`${style} w-100`}>
            <div className={`${rowHBetween} w-100`}>
                {arrFriends.map((avatar, index) =>
                    <Avatar color={avatar} key={index} size={87} />)}
            </div>
        </Row>;
    }, [props.friends]);

    /**
    * Section five animation and scroll on 100% to signup section.
    */
    const moveToSignupSection = React.useCallback(() => {
        scroller.scrollTo(GamePageStepTypes.SignupSection, {
            duration: 700,
            smooth: true,
            containerId,
            ignoreCancelEvents: true,
            delay: 3000
        });
    }, []);

    /**
     * Section five animation and scroll on 100% to signup section.
     */
    React.useEffect(() => {
        if (selectedKey === "100") {
            moveToSignupSection();
        }
    }, [selectedKey, moveToSignupSection]);

    return (
        <div className={styles.gameStepFive}>
            <div className={`${colCenter} h-100`}>
                <h2 className={`${styles.avatarHeading}`}>How much can you make?</h2>
                <h4 className="text-center">
                    Click the percentage fill rate to unlock your potential. Higher the filled rate,
                    the more money you make.
                </h4>

                <ButtonList
                    selected={selectedKey}
                    lisItems={percentage}
                    onButtonClick={handleBtnClick}
                    valueSuffix="%"
                />

                <div className={`${styles.donationInner} d-flex w-100 position-relative h-100`}>
                    <div className={`${styles.flex1} d-flex flex-wrap h-100`}>
                        {avatars}
                    </div>
                    <div className={`${styles.flex1} ${styles.friendsMain} text-center`}>
                        <div className={`${styles.avatarInner} ${colCenter} position-relative`}>
                            <h2 className={`${styles.avatarHeading}`}>
                                <span key={percentages[selectedKey].amount} className="d-block">
                                    ${percentages[selectedKey].amount}
                                </span>
                            </h2>
                            {renderAddedFriends(true)}
                            <div className={`${props.friends.length ? styles.percentageSelected : ""}`}>
                                {props.seletedAvatar && <Avatar color={props.seletedAvatar} />}
                            </div>
                            {renderAddedFriends(false)}
                        </div>
                        <h6>{props.name}</h6>
                    </div>
                    <div className={`${styles.flex1} d-flex flex-wrap h-100 flex-row-reverse`}>
                        {avatars}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default GameAvatarList;