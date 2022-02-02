import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Nav, Navbar, Row } from "react-bootstrap";
import React, { CSSProperties } from "react";

import Avatar from "components/game/avatar/avatar";
import Breakpoints from "common/style/breakpoints";
import flexbox from "utils/flexbox";
import IGameAvatarList from "components/game/gameAvatarList/interfaces/IAvatarList";
import PrimaryButton from "components/common/primaryButton/primaryButton";
import useBreakpoint from "hooks/useBreakpoint";

import AvatarType from "../gameSection/enums/avatarTypes";
import percentages from "./gameAvatarListContent";
import styles from "components/game/gameAvatarList/gameAvatarList.module.scss";

const colCenter = flexbox({ vertical: true, hAlign: "center", vAlign: "center" });
const horizontalAlign = flexbox({ hAlign: "center", vAlign: "center" });
const toggleTimeout = 500;
const twenty = 20;
const twentyTwo = 22;
const twentyFive = 25;
const twentySeven = 27;
const thirty = 30;
const thirtyThree = 33;
const thirtyFive = 35;
const thirtySeven = 37;
const fourty = 40;
const fifteenRandom = 15;
const five = 5;
const ten = 10;
const six = 6;
const seven = 7;
const eigth = 8;
const nine = 9;
const eleven = 11;
const twelve = 12;
const thirteen = 13;
const fourteen = 14;
const sizes = [twenty, twentyTwo, twentyFive, twentySeven, thirty, thirtyThree, thirtyFive, thirtySeven, fourty];
const sizesMobile = [five, six, seven, eigth, nine, ten, eleven, twelve, thirteen, fourteen, fifteenRandom];
const slice = 2;
const sliceTwo = 4;
const mobile = 770;

const avatars = Object.values(AvatarType);

function getRandomMargin() {
    const width = window.innerWidth;
    if (width < mobile) {
        return `${Math.floor(Math.random() * five + five)}px`;
    }

    return `${Math.floor(Math.random() * fifteenRandom + five)}px`;

}

function getRandomSize() {
    const width = window.innerWidth;
    let randomIndex: number;

    if (width < mobile) {
        randomIndex = Math.floor(Math.random() * sizesMobile.length);
    }
    else {
        randomIndex = Math.floor(Math.random() * sizes.length);
    }


    return sizes[randomIndex];
}

function getRandomAlignSelf() {
    const values = ["flex-end", "flex-start", "center"];
    const randomIndex = Math.floor(Math.random() * values.length);

    return values[randomIndex];
}

function getRandomAvatars() {
    const randomIndex = Math.floor(Math.random() * avatars.length);

    return avatars[randomIndex];
}

const GameAvatarList = (props: IGameAvatarList): JSX.Element => {
    const [selectedKey, setSelectedKey] = React.useState("1");
    const [expanded, setExpanded] = React.useState<boolean>(false);
    const [toggle, setToggle] = React.useState<boolean>(true);
    const breakpoint = useBreakpoint(Breakpoints.LG);

    const handleBtnClick = React.useCallback((key: string) => {
        setSelectedKey(key);
    }, []);

    const avatarArr = React.useMemo(() => {
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
                transition: ".5s",
            };
            arr.push(
                <div key={i} style={style}>
                    <Avatar
                        color={getRandomAvatars()}
                        width={size}
                        height={size}
                    />
                </div>
            );
        }

        return arr;
    }, [selectedKey]);

    React.useEffect(() => {
        if (selectedKey === "100") {
            props.signupAnimation();
        }
    }, [selectedKey]);

    return (
        <div className={styles.gameStepFive}>
            <div className={`${colCenter} h-100`}>
                <h2 className={`${styles.avatarHeading}`}>How much can you make?</h2>
                <h4>Click the percentage fill rate to unlock your potential. Higher the filled rate,
                    the more money you make.</h4>

                <Navbar expand="lg" className="w-100 d-block"
                    expanded={expanded}
                    onClick={() => breakpoint && setExpanded(!expanded)}>
                    <Navbar.Brand href="#home" className="d-lg-none">{selectedKey}%</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className={styles.navToggle}>
                        <FontAwesomeIcon icon={faChevronDown} width="30" height="35" />
                    </Navbar.Toggle>
                    <hr className={`d-block d-lg-none w-100 ${styles.activeTab} opacity-1`} />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className={`me-auto ${!breakpoint && "gap-4"} w-100`}>
                            {Object.entries(percentages).map(([key], index) => (
                                <PrimaryButton key={index} onClick={() => {
                                    handleBtnClick(key);
                                    setToggle(false);
                                    setTimeout(() => {
                                        setToggle(true);
                                    }, toggleTimeout);
                                }} className={`${horizontalAlign} 
                                ${styles.donationButton} 
                                ${selectedKey === key ? styles.active : styles.inactive}
                                 w-100 px-1 py-3`}>
                                    {key}
                                </PrimaryButton>
                            ))}

                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <div className={`${styles.donationInner} w-100 position-relative h-100`}>
                    <div className="d-flex flex-wrap h-100 flex-row-reverse" style={{ flex: 1 }}>
                        {avatarArr}
                    </div>
                    <div className={`${styles.flexOne} ${styles.friendsMain}`}>
                        <div className={`${styles.avatarInner} ${colCenter}`}>
                            <h2 className={`${styles.avatarHeading} ${styles.yellow}`}>
                                <span
                                    className={toggle ? `${styles.fadeIn}`
                                        : `${styles.fadeOut}`}>${percentages[selectedKey].amount}
                                </span></h2>
                            <Row className={`${styles.friendsTop} w-100`}>
                                <div>
                                    {props.friends.slice(0, slice)
                                        .map((i, k) => <Avatar color={i.id} key={k} width={87} height={87} />)}
                                </div>
                            </Row>
                            <div className={`${props.friends.length ? styles.percentageSelected : ""}`}>
                                {props.seletedAvatar && <Avatar color={props.seletedAvatar} />}
                            </div>
                            <Row className={`${styles.friendsBottom} w-100`}>
                                <div>
                                    {props.friends.slice(slice, sliceTwo)
                                        .map((i, k) => <Avatar color={i.id} key={k} width={87} height={87} />)}
                                </div>
                            </Row>
                        </div>
                        <h6>{props.name}</h6>
                    </div>
                    <div className="d-flex flex-wrap h-100 flex-row-reverse" style={{ flex: 1 }}>
                        {avatarArr}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default GameAvatarList;