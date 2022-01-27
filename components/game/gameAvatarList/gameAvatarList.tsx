import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Nav, Navbar, Row } from "react-bootstrap";
import Image from "next/image";
import React from "react";

import Avatar from "../avatar/avatar";
import Breakpoints from "common/style/breakpoints";
import flexbox from "utils/flexbox";
import IGameAvatarList from "components/game/gameAvatarList/interfaces/IAvatarList";
import PrimaryButton from "components/common/primaryButton/primaryButton";
import StepTypes from "../gameSection/enums/stepTypes";
import useBreakpoint from "hooks/useBreakpoint";

import styles from "components/game/gameAvatarList/gameAvatarList.module.scss";

const colCenter = flexbox({ vertical: true, hAlign: "center", vAlign: "center" });
const horizontalAlign = flexbox({ hAlign: "center", vAlign: "center" });
const percent: string[] = ["1", "5", "10", "25", "50", "100"];
const mainAvatars = [
    "/images/Game/donationCycle/avatarPurple.png",
    "/images/Game/donationCycle/avatarGreen.png",
    "/images/Game/donationCycle/avatarYellow.png",
    "/images/Game/donationCycle/avatarOrange.png",
];
const donationTimeout = 6000;
const toggleTimeout = 1000;
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
const Ten = 10;
const sizes = [twenty, twentyTwo, twentyFive, twentySeven, thirty, thirtyThree, thirtyFive, thirtySeven, fourty];
const sizesMobile = [five, Ten, fifteenRandom];
const slice = 2;
const sliceTwo = 4;
const mobile = 770;

const GameAvatarList = (props: IGameAvatarList): JSX.Element => {
    const [percentage, setPercentage] = React.useState<string>("1");
    const [amount, setAmount] = React.useState<string>("");
    const [avatars, setAvatars] = React.useState(mainAvatars);
    const [expanded, setExpanded] = React.useState<boolean>(false);
    const [toggle, setToggle] = React.useState<boolean>(true);
    const breakpoint = useBreakpoint(Breakpoints.LG);

    const animationHandler = (percent: string) => {
        const avatar = [...mainAvatars];
        const fivePercent = 2;
        const tenPercent = 3;
        const twentyfivePercent = 4;
        const fiftyPercent = 6;
        const hundredPercent = 15;
        const onePercent = 1;
        if (percent === "5") {
            const avatarDuplicate = Array(fivePercent).fill(avatar);
            setAvatars(avatarDuplicate.flat());
        } else if (percent === "10") {
            const avatarDuplicate = Array(tenPercent).fill(avatar);
            setAvatars(avatarDuplicate.flat());
        }
        else if (percent === "25") {
            const avatarDuplicate = Array(twentyfivePercent).fill(avatar);
            setAvatars(avatarDuplicate.flat());
        }
        else if (percent === "50") {
            const avatarDuplicate = Array(fiftyPercent).fill(avatar);
            setAvatars(avatarDuplicate.flat());
        }
        else if (percent === "100") {
            const avatarDuplicate = Array(hundredPercent).fill(avatar);
            setAvatars(avatarDuplicate.flat());
            props.signupAnimation();
        }
        else if (percent === "1") {
            const avatarDuplicate = Array(onePercent).fill(avatar);
            setAvatars(avatarDuplicate.flat());
        }
    };

    React.useEffect(() => {
        let timer: NodeJS.Timeout;
        if (percentage !== "1") {
            timer = setTimeout(() => {
                window.scroll(0, 0);
                props.setStep(StepTypes.Six);
                clearTimeout(timer);
            }, donationTimeout);
        }

        return () => clearTimeout(timer);

    }, [percentage, props]);

    const avatarsFlex = React.useMemo(
        () => avatars.map((i, index) => <div key={index} className="avatar"><Image src={i} width={20} height={20} objectFit="contain" /></div>),
        [avatars]
    );

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


        return `${sizes[randomIndex]}px`;
    }

    function getRandomAlignSelf() {
        const values = ["flex-end", "flex-start", "center"];
        const randomIndex = Math.floor(Math.random() * values.length);

        return values[randomIndex];
    }

    React.useEffect(() => {
        const Avatars = document.querySelectorAll<HTMLElement>(".avatar");
        for (const avatar of Avatars) {
            avatar.style.marginTop = getRandomMargin();
            avatar.style.marginRight = getRandomMargin();
            avatar.style.marginBottom = getRandomMargin();
            avatar.style.marginLeft = getRandomMargin();

            const size = getRandomSize();
            avatar.style.width = size;
            avatar.style.height = size;
            avatar.style.alignSelf = getRandomAlignSelf();
            avatar.style.transition = "500ms";
        }
    }, [percentage]);

    React.useEffect(() => {
        switch (percentage) {
            case "1":
                setAmount("2,798");
                break;
            case "10":
                setAmount("27,980");
                break;
            case "25":
                setAmount("69,950");
                break;
            case "50":
                setAmount("139,900");
                break;
            case "100":
                setAmount("279,800");
                break;
            case "5":
                setAmount("13,990");
                break;
            default:
                setAmount("2,798");

        }
    }, [percentage]);

    return (
        <div className={styles.gameStepFive}>
            <div className={`${colCenter}`}>
                <h2 className={`${styles.avatarHeading}`}>How much can you make?</h2>
                <h4>Click the percentage fill rate to unlock your potential. Higher the filled rate,
                    the more money you make.</h4>

                <Navbar expand="lg" className="w-100 justify-content-center"
                    expanded={expanded}
                    onClick={() => breakpoint && setExpanded(!expanded)}>
                    <Navbar.Brand href="#home" className="d-lg-none">{percentage}%</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className={styles.navToggle}>
                        <FontAwesomeIcon icon={faChevronDown} width="30" height="35" />
                    </Navbar.Toggle>
                    <hr className={`d-block d-lg-none w-100 ${styles.activeTab} opacity-1`} />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className={`me-auto ${!breakpoint && "gap-4"} w-100`}>
                            {percent.map((donation, donationKey) =>
                                <PrimaryButton
                                    key={donationKey}
                                    onClick={() => {
                                        setPercentage(donation);
                                        animationHandler(donation);
                                        setToggle(false);
                                        setTimeout(() => {
                                            setToggle(true);
                                        }, toggleTimeout);
                                    }}
                                    className={`${horizontalAlign} 
                                    ${styles.donationButton} 
                                    ${donation === percentage ? styles.active : styles.inactive}
                                     w-100 px-1 py-3`}
                                >
                                    {donation}%
                                </PrimaryButton>
                            )}

                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <div className={`${styles.donationInner} w-100 position-relative`}>
                    <div className={`${styles.flexOne} ${styles.left}`}>
                        {avatarsFlex}
                    </div>
                    <div className={`${styles.flexOne} ${styles.friendsMain}`}>
                        <div className={`${styles.avatarInner} ${colCenter}`}>
                            <h2 className={`${styles.avatarHeading} ${styles.yellow}`}>
                                <span className={toggle ? `${styles.fadeIn}` : `${styles.fadeOut}`}>${amount}
                                </span></h2>
                            <Row className={`${styles.friendsTop} w-100`}>
                                <div>
                                    {props.friends.slice(0, slice)
                                        .map((i, k) => <Image {...i.image} key={k} width={87} height={87} />)}
                                </div>
                            </Row>
                            <div className={`${props.friends.length ? styles.percentageSelected : ""}`}>
                                {props.seletedAvatar && <Avatar color={props.seletedAvatar} />}
                            </div>
                            <Row className={`${styles.friendsBottom} w-100`}>
                                <div>
                                    {props.friends.slice(slice, sliceTwo)
                                        .map((i, k) => <Image {...i.image} key={k} width={87} height={87} />)}
                                </div>
                            </Row>
                        </div>
                        <h6>{props.name}</h6>
                    </div>
                    <div className={`${styles.flexOne} ${styles.left}`}>
                        {avatarsFlex}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default GameAvatarList;