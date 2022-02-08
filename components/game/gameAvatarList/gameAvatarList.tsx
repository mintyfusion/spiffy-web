import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Nav, Navbar, Row } from "react-bootstrap";
import React, { CSSProperties } from "react";

import Avatar from "components/game/avatar/avatar";
import Breakpoints from "common/style/breakpoints";
import flexbox from "utils/flexbox";
import IGameAvatarList from "components/game/gameAvatarList/interfaces/IAvatarList";
import PrimaryButton from "components/common/primaryButton/primaryButton";
import UseBoolean from "hooks/useBoolean";
import useBreakpoint from "hooks/useBreakpoint";

import AvatarType from "components/game/gameSection/enums/avatarTypes";
import percentages from "components/game/gameAvatarList/gameAvatarListContent";
import styles from "components/game/gameAvatarList/gameAvatarList.module.scss";

const colCenter = flexbox({ vertical: true, hAlign: "center", vAlign: "center" });
const horizontalAlign = flexbox({ hAlign: "center", vAlign: "center" });
const rowHBetween = flexbox({ hAlign: "between" });
const fifteenRandom = 15;
const five = 5;
// Avatar random sizes numbers
// No need to understand the number, array itself tells the meaning.
const sizes = [20, 22, 25, 27, 30, 33, 35, 37, 40]; // eslint-disable-line @typescript-eslint/no-magic-numbers
const sizesMobile = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; // eslint-disable-line @typescript-eslint/no-magic-numbers
const mobile = 770;
const friendsSliceTwo = 2;
const friendsSliceFour = 4;

const avatars = Object.values(AvatarType);

/**
 * Random margin for avatars.
*/
function getRandomMargin() {
    const width = window.innerWidth;
    if (width < mobile) {
        return Math.floor(Math.random() * five + five);
    }

    return Math.floor(Math.random() * fifteenRandom + five);
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

const GameAvatarList = (props: IGameAvatarList): JSX.Element => {
    const [selectedKey, setSelectedKey] = React.useState("1");
    const [expanded, { toggle: navToggle }] = UseBoolean(false);
    const isLG = useBreakpoint(Breakpoints.LG);

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

    /**
     * Section five animation and scroll on 100% to signup section.
     */
    React.useEffect(() => {
        if (selectedKey === "100") {
            props.signupAnimation();
        }
    }, [selectedKey, props.signupAnimation]);

    /**
     * Donation percentage rendering.
     */
    const donationPercentage = React.useMemo(() => Object.entries(percentages).map(([key], index) => (
        <PrimaryButton key={index} onClick={() => {
            handleBtnClick(key);
        }}
            className={`
            ${horizontalAlign} 
            ${styles.donationButton} 
            ${selectedKey === key ? styles.active : styles.inactive}
             w-100 px-1 py-3`}>
            {key}%
        </PrimaryButton>
    )
    ), [handleBtnClick, selectedKey]);

    const addedFriendsRender = React.useCallback((isTop: boolean) => {
        const arrFriends = isTop
            ? props.friends.slice(0, friendsSliceTwo)
            : props.friends.slice(friendsSliceTwo, friendsSliceFour);

        const style = isTop
            ? styles.friendsTop
            : styles.friendsBottom;

        return <Row className={`${style} w-100`}>
            <div className={`${rowHBetween} w-100`}>
                {arrFriends.map((avatar, index) =>
                    <Avatar color={avatar} key={index} size={87} />)}
            </div>
        </Row>;
    }, [props.friends, friendsSliceTwo, friendsSliceFour]);

    return (
        <div className={styles.gameStepFive}>
            <div className={`${colCenter} h-100`}>
                <h2 className={`${styles.avatarHeading}`}>How much can you make?</h2>
                <h4>Click the percentage fill rate to unlock your potential. Higher the filled rate,
                    the more money you make.</h4>

                <Navbar
                    expand="lg"
                    className="w-100 d-block"
                    expanded={expanded}
                    onClick={() => isLG && navToggle()}>
                    <Navbar.Brand className="d-lg-none">{selectedKey}%</Navbar.Brand>
                    <Navbar.Toggle className={styles.navToggle}>
                        <FontAwesomeIcon icon={faChevronDown} width="30" height="35" />
                    </Navbar.Toggle>
                    <hr className={`d-block d-lg-none w-100 ${styles.activeTab} opacity-100`} />
                    <Navbar.Collapse>
                        <Nav className={`me-auto ${!isLG && "gap-4"} w-100`}>
                            {donationPercentage}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <div className={`${styles.donationInner} d-flex w-100 position-relative h-100`}>
                    <div className={`${styles.flexOne} d-flex flex-wrap h-100`}>
                        {avatars}
                    </div>
                    <div className={`${styles.flexOne} ${styles.friendsMain} text-center`}>
                        <div className={`${styles.avatarInner} ${colCenter} position-relative`}>
                            <h2 className={`${styles.avatarHeading}`}>
                                <span key={percentages[selectedKey].amount}>${percentages[selectedKey].amount}
                                </span>
                            </h2>
                            {addedFriendsRender(true)}
                            <div className={`${props.friends.length ? styles.percentageSelected : ""}`}>
                                {props.seletedAvatar && <Avatar color={props.seletedAvatar} />}
                            </div>
                            {addedFriendsRender(false)}
                        </div>
                        <h6>{props.name}</h6>
                    </div>
                    <div className={`${styles.flexOne} d-flex flex-wrap h-100 flex-row-reverse`}>
                        {avatars}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default GameAvatarList;