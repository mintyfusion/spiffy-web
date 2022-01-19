import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Nav, Navbar } from "react-bootstrap";
import Image from "next/image";
import React from "react";

import flexbox from "utils/flexbox";
import IGameAvatarList from "components/game/gameAvatarList/interfaces/IAvatarList";
import Breakpoints from "common/style/breakpoints";
import PrimaryButton from "components/common/primaryButton/primaryButton";
import StepTypes from "../gameSection/enums/stepTypes";
import useBreakpoint from "hooks/useBreakpoint";
import Avatar from "../avatar/avatar";

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
const animationSplice = 2;
const donationTimeout = 6000;

const GameAvatarList = (props: IGameAvatarList): JSX.Element => {
    const [percentage, setPercentage] = React.useState<string>("1");
    const [avatars, setAvatars] = React.useState([]);
    const [expanded, setExpanded] = React.useState<boolean>(false);
    const breakpoint = useBreakpoint(Breakpoints.LG);

    const half = Math.ceil(avatars.length / animationSplice);

    const animationHandler = (percent: string) => {
        const avatar = [...mainAvatars];
        const fivePercent = 2;
        const tenPercent = 3;
        const twentyfivePercent = 4;
        const fiftyPercent = 6;
        const hundredPercent = 15;
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
            setAvatars([]);
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

    return (
        <div className={styles.gameStepFive}>
            <div className={`${colCenter}`}>
                <h2 className={`${styles.avatarHeading}`}>How much can you make?</h2>
                <h4>Click the percentage fill rate to unlock your potential. Higher the filled rate,
                    the more money you make.</h4>

                <Navbar expand="lg" className="w-100 justify-content-center"
                    expanded={expanded}
                    onClick={() => breakpoint && setExpanded(!expanded)}>
                    <Navbar.Brand href="#home" className="d-lg-none">{percentage}</Navbar.Brand>
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
                                    }}
                                    className={`${horizontalAlign} 
                                    ${styles.donationButton} 
                                    ${donation === percentage ? styles.active : styles.inactive}
                                     w-100 px-1 py-3`}
                                >
                                    %{donation}
                                </PrimaryButton>
                            )}

                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <div className={`${styles.donationInner} ${colCenter} w-100 position-relative`}>
                    {avatars.slice(0, half).map((i, k) => (
                        <div className={styles.confetti} key={k}>
                            <Image src={i} width={20} height={20} />
                        </div>
                    ))}
                    {avatars.slice(-half).map((i, k) => (
                        <div className={styles.confettiRight} key={k}>
                            <Image src={i} width={20} height={20} />
                        </div>
                    ))}
                    <div className={`${styles.avatarInner} ${colCenter}`}>
                        <h2 className={`${styles.avatarHeading} ${styles.yellow}`}>$69,905</h2>
                        <div className={`${props.friends.length ? styles.percentageSelected : ""}`}>
                            {props.seletedAvatar && <Avatar color={props.seletedAvatar} />}
                        </div>

                        <div className={styles.percentageFriends}>
                            {props.friends.map((i, k) => <Image {...i.image} key={k} width={87} height={87} />)}
                        </div>
                    </div>
                    <h6>{props.name}</h6>
                </div>
            </div>
        </div>
    );
};
export default GameAvatarList;