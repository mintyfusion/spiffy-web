import { Col, Nav, Navbar, Row } from "react-bootstrap";
import { Element, Link, scroller } from "react-scroll";
import { faChevronDown, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-bootstrap/Modal";
import React, { CSSProperties } from "react";

import Avatar from "../avatar/avatar";
import AvatarType from "./enums/avatarTypes";
import Breakpoints from "common/style/breakpoints";
import data from "components/game/gameSection/gameSectionContent";
import flexbox from "utils/flexbox";
import GameAvatarList from "components/game/gameAvatarList/gameAvatarList";
import getUniqueId from "utils/getUniqueId";
import Image from "next/image";
import PrimaryButton from "components/common/primaryButton/primaryButton";
import setViewportHeight from "utils/setViewportHeight";
import StepTypes from "./enums/stepTypes";
import useBoolean from "hooks/useBoolean";
import useBreakpoint from "hooks/useBreakpoint";

import IFriendAvatar from "components/game/gameSection/interfaces/IFriendAvatar";
import styles from "components/game/gameSection/gameSection.module.scss";

const colCenter = flexbox({ vertical: true, hAlign: "center", vAlign: "center" });
const horizontalAlign = flexbox({ hAlign: "center", vAlign: "center" });
const rowHBetween = flexbox({ hAlign: "between" });
const rowHCenter = flexbox({ vAlign: "center", vertical: true, });
const donation: string[] = ["5", "10", "15", "25", "50"];
// const donationDivide = 2;
const friendsTimeout = 2000;
const avatarTimeout = 1000;
// const donationFormula = 5;
const boundDivide = 2;
const friendsLength = 4;
const containerId = "containerElement";
const phoneKeyboardTimeout = 500;
const donationTotalAvatars = 10;
const stepTwoTimeout = 2000;

const GameSection = (): JSX.Element => {
    const [addedFriends, setAddedFriends] = React.useState<IFriendAvatar[]>([]);
    const [seletedAvatar, setSeletedAvatar] = React.useState<AvatarType>();
    const [step, setStep] = React.useState<StepTypes>(StepTypes.One);
    const [avatarName, setAvatarName] = React.useState<string>("");
    const [donationAmount, setDonationAmount] = React.useState<string>("");
    const [animation, setAnimation] = React.useState<boolean>(false);
    const [isModalOpen, { setTrue: openModal, setFalse: closeModal }] = useBoolean(false);
    const [expanded, setExpanded] = React.useState<boolean>(false);
    const breakpoint = useBreakpoint(Breakpoints.LG);

    const avatarStyles = React.useRef<Record<AvatarType, CSSProperties>>();
    const [avatarStyleGUID, setAvatarStyleGUID] = React.useState("0");
    const friendsStyle = React.useRef<Record<AvatarType, CSSProperties>>();
    const [friendsStyleGUID, setFriendsStyleGUID] = React.useState("0");

    const start = React.useRef<HTMLDivElement>();
    const target = React.useRef<HTMLDivElement>();
    const stepThree = React.useRef<HTMLDivElement>();
    const fullscreen = React.useRef<HTMLDivElement>();
    const friendsRef = React.useRef<HTMLDivElement>();
    const coinRef = React.useRef<HTMLDivElement>();
    const coinStart = React.useRef<HTMLDivElement>();
    const coinStyles = React.useRef<CSSProperties>();
    let coinInterval;

    const step1Avatars = React.useMemo(() =>
        Object.entries(AvatarType).filter(([value]) => value !== AvatarType.Orange), []);

    const friendsAvatars = React.useMemo(() => data.filter((avatarObj) =>
        seletedAvatar && avatarObj.id !== seletedAvatar
    ), [seletedAvatar]) as IFriendAvatar[];

    // const donationMap = React.useMemo(() => data.concat(friends).map((i, k) => (
    //     <div className={styles.donationCycleItems} key={k}>
    //         <Image {...i.image} width={56} height={63} />
    //         <span>
    //             ${Number(donationAmount) / donationFormula / donationFormula}0
    //         </span>
    //     </div>
    // )), [friends, donationAmount, donationFormula]);

    React.useEffect(() => {
        if (addedFriends.length === friendsLength) {
            scroller.scrollTo(StepTypes.Four, {
                duration: 700,
                smooth: true,
                containerId,
                delay: 2000,
                ignoreCancelEvents: true
            });
            const timer = setTimeout(() => {
                setStep(StepTypes.Four);
                clearTimeout(timer);
            }, friendsTimeout);
        }
    }, [addedFriends]);

    const animationHandler = React.useCallback((donation: string) => {
        if (donation !== donationAmount) {
            scroller.scrollTo(StepTypes.Five, {
                duration: 700,
                smooth: true,
                containerId,
                delay: 2000,
                ignoreCancelEvents: true
            });
            setAnimation(false);
            setTimeout(() => {
                setAnimation(true);
            }, avatarTimeout);
        }
    }, [donationAmount]);

    const getStyles = React.useCallback(() => {
        if (start.current) {
            const mobile = 768;
            const mobileAvatar = 90;
            const desktopAvatar = 160;
            const width = window.innerWidth;
            const bounds = start.current.getBoundingClientRect();
            const avatarSize = width < mobile ? mobileAvatar : desktopAvatar;
            const cardMidPointX = (bounds.x + bounds.right) / boundDivide;
            const cardMidPointY = (bounds.y + bounds.bottom) / boundDivide;
            const space = 10;
            const left1 = Math.abs(cardMidPointX - avatarSize - space);
            const left2 = Math.abs(cardMidPointX + space);
            const top1 = Math.abs(cardMidPointY - avatarSize + space) + fullscreen.current.scrollTop;
            const top2 = Math.abs(cardMidPointY + space) + fullscreen.current.scrollLeft;
            const styles = {} as Record<AvatarType, CSSProperties>;

            Object.entries(AvatarType).forEach(([value]) => {
                switch (value) {
                    case AvatarType.Green:
                        styles[value] = {
                            left: left1,
                            top: top1,
                        };
                        break;
                    case AvatarType.Red:
                        styles[value] = {
                            left: left2,
                            top: top1,
                        };
                        break;
                    case AvatarType.Yellow:
                        styles[value] = {
                            left: left1,
                            top: top2,
                        };
                        break;
                    case AvatarType.Purple:
                    default:
                        styles[value] = {
                            left: left2,
                            top: top2,
                        };
                        break;
                }
            });

            return styles;
        }

        return null;
    }, []);

    const getFriendsStyle = React.useCallback(() => {
        if (friendsRef.current) {
            const bounds = friendsRef.current.getBoundingClientRect();
            const mobile = 1000;
            const mobileAvatar = 90;
            const desktopAvatar = 160;
            const avatarSize = window.innerWidth > mobile ? desktopAvatar : mobileAvatar;
            const cardMidPointX = (bounds.x + bounds.right) / boundDivide;
            const cardMidPointY = (bounds.y + bounds.bottom) / boundDivide;
            const space = 20;
            const left1 = Math.abs(cardMidPointX - avatarSize);
            const left2 = Math.abs(cardMidPointX + space);
            const top1 = Math.abs(cardMidPointY - avatarSize - space) + fullscreen.current.scrollTop;
            const top2 = Math.abs(cardMidPointY + space) + fullscreen.current.scrollTop;

            const styles = {} as Record<AvatarType, CSSProperties>;
            const keyTwo = 2;
            const keyThree = 3;

            friendsAvatars.map((value, index) => {
                switch (index) {
                    case 0:
                        if (!value.done) {
                            styles[value.id] = {
                                left: left1,
                                top: top1,
                            };
                        }
                        break;
                    case 1:
                        if (!value.done) {
                            styles[value.id] = {
                                left: left2,
                                top: top1,
                            };
                        }
                        break;
                    case keyTwo:
                        if (!value.done) {
                            styles[value.id] = {
                                left: left1,
                                top: top2,
                            };
                        }
                        break;
                    case keyThree:
                    default:
                        if (!value.done) {
                            styles[value.id] = {
                                left: left2,
                                top: top2,
                            };
                        }
                        break;
                }
            });

            return styles;
        }
    }, [friendsAvatars]);

    const handleAvatarClick = React.useCallback((avatar: AvatarType) => {
        if (target.current) {
            const bounds = target.current.getBoundingClientRect();
            avatarStyles.current = {
                ...avatarStyles.current,
                [avatar]: {
                    top: bounds.y + fullscreen.current.scrollTop,
                    left: bounds.x + fullscreen.current.scrollLeft,
                    transition: "2s"
                }
            };
            setAvatarStyleGUID(getUniqueId());
        }
        // const Selected = data.filter((filter) => filter.id !== avatar).map((i) => ({ ...i, done: false }));
        setSeletedAvatar(avatar);
        setStep(StepTypes.Two);
    }, []);

    const friendsAnimation = React.useCallback((index: number, value: IFriendAvatar) => {
        if (stepThree.current) {
            const width = window.innerWidth;
            const mobile = 1000;
            const desktopSmall = 1350;
            const mobileTop = 20;
            const desktopTop = 50;
            const desktopSmallTop = 50;
            const mobileTop2 = 50;
            const desktopTop2 = 120;
            const mobileLeft = 45;
            const desktopLeft = 110;
            const desktopSmallLeft = 110;
            const mobileLeft2 = 70;
            const desktopleft2 = 170;

            const topSpacing = width < mobile ? mobileTop : width < desktopSmall ? desktopSmallTop : desktopTop;
            const top2Spacing = width < mobile ? mobileTop2 : desktopTop2;
            const leftSpacing = width < mobile ? mobileLeft : width < desktopSmall ? desktopSmallLeft : desktopLeft;
            const left2Spacing = width < mobile ? mobileLeft2 : desktopleft2;

            const bounds = stepThree.current.getBoundingClientRect();
            const top = bounds.y + fullscreen.current.scrollTop - topSpacing;
            const left = bounds.x + fullscreen.current.scrollLeft - leftSpacing;
            const top2 = bounds.y + fullscreen.current.scrollTop + top2Spacing;
            const left2 = bounds.x + fullscreen.current.scrollLeft + left2Spacing;

            const keyTwo = 2;
            const keyThree = 3;

            const selectedFriends: IFriendAvatar[] = [];
            data.forEach(item => {
                if (item.id == value.id) {
                    selectedFriends.push({ ...item, done: true });
                }
            });
            setAddedFriends((currentFriends: IFriendAvatar[]) => [...currentFriends, ...selectedFriends]);

            const styles = {} as Record<AvatarType, CSSProperties>;

            switch (index) {
                case 0:
                    styles[value.id] = {
                        top,
                        left,
                        transition: "2s"

                    };

                    break;
                case 1:
                    styles[value.id] = {
                        top,
                        left: left2,
                        transition: "2s"
                    };

                    break;
                case keyTwo:
                    styles[value.id] = {
                        top: top2,
                        left,
                        transition: "2s"
                    };

                    break;
                case keyThree:
                    styles[value.id] = {
                        top: top2,
                        left: left2,
                        transition: "2s"
                    };

                    break;
            }
            friendsStyle.current = {
                ...friendsStyle.current,
                ...styles
            };

            setFriendsStyleGUID(getUniqueId());
        }
    }, [friendsStyleGUID]);

    const setAvatarPositions = React.useCallback(() => {
        const styles = getStyles();
        if (styles) {
            avatarStyles.current = { ...avatarStyles.current, ...styles };
            setAvatarStyleGUID(getUniqueId());
        }
    }, [getStyles]);

    const setFriendsPositions = React.useCallback(() => {
        const styles = getFriendsStyle();
        if (styles) {
            friendsStyle.current = { ...friendsStyle.current, ...styles };
            setFriendsStyleGUID(getUniqueId());
        }
    }, [getFriendsStyle]);

    const handleContinueBtnClick = React.useCallback(() => {
        const t = setTimeout(() => {
            if (stepThree.current && step === StepTypes.Two) {
                const bounds = stepThree.current.getBoundingClientRect();
                avatarStyles.current = {
                    ...avatarStyles.current,
                    [seletedAvatar]: {
                        top: bounds.y + fullscreen.current.scrollTop,
                        left: bounds.x + fullscreen.current.scrollLeft,
                        transition: "2s"
                    }
                };
                setAvatarStyleGUID(getUniqueId());
                setStep(StepTypes.Three);
                setFriendsPositions();
                scroller.scrollTo(StepTypes.Three, {
                    duration: 700,
                    smooth: true,
                    containerId,
                    ignoreCancelEvents: true,
                    offset: -20
                });
            }

            clearTimeout(t);
        }, phoneKeyboardTimeout);
    }, [setFriendsPositions, seletedAvatar]);

    React.useEffect(() => {
        if (step === StepTypes.One && isModalOpen && avatarStyleGUID === "0") {
            setAvatarPositions();
        }
    }, [setAvatarPositions, step, isModalOpen, avatarStyleGUID]);

    const signupAnimation = React.useCallback(() => {
        scroller.scrollTo(StepTypes.Six, {
            duration: 700,
            smooth: true,
            containerId,
            ignoreCancelEvents: true
        });
    }, []);

    const friendsResizeHandler = React.useCallback(() => {
        if (stepThree.current) {
            const width = window.innerWidth;
            const mobile = 1000;
            const desktopSmall = 1350;
            const mobileTop = 20;
            const desktopTop = 50;
            const desktopSmallTop = 50;
            const mobileTop2 = 50;
            const desktopTop2 = 120;
            const mobileLeft = 45;
            const desktopLeft = 110;
            const desktopSmallLeft = 110;
            const mobileLeft2 = 70;
            const desktopleft2 = 170;

            const topSpacing = width < mobile ? mobileTop : width < desktopSmall ? desktopSmallTop : desktopTop;
            const top2Spacing = width < mobile ? mobileTop2 : desktopTop2;
            const leftSpacing = width < mobile ? mobileLeft : width < desktopSmall ? desktopSmallLeft : desktopLeft;
            const left2Spacing = width < mobile ? mobileLeft2 : desktopleft2;

            const bounds = stepThree.current.getBoundingClientRect();
            const top = bounds.y + fullscreen.current.scrollTop - topSpacing;
            const left = bounds.x + fullscreen.current.scrollLeft - leftSpacing;
            const top2 = bounds.y + fullscreen.current.scrollTop + top2Spacing;
            const left2 = bounds.x + fullscreen.current.scrollLeft + left2Spacing;

            const keyTwo = 2;
            const keyThree = 3;

            const styles = {} as Record<AvatarType, CSSProperties>;

            addedFriends.map((value, index) => {
                switch (index) {
                    case 0:
                        if (value.done) {
                            styles[value.id] = {
                                top,
                                left,
                            };
                        }
                        break;
                    case 1:
                        if (value.done) {
                            styles[value.id] = {
                                top,
                                left: left2,
                            };
                        }
                        break;
                    case keyTwo:
                        if (value.done) {
                            styles[value.id] = {
                                top: top2,
                                left,
                            };
                        }
                        break;
                    case keyThree:
                    default:
                        if (value.done) {
                            styles[value.id] = {
                                top: top2,
                                left: left2,
                            };
                        }
                        break;
                }
            });

            friendsStyle.current = {
                ...friendsStyle.current,
                ...styles
            };

            setFriendsStyleGUID(getUniqueId());
        }
    }, []);

    const handleResize = React.useCallback(() => {
        switch (step) {
            case StepTypes.One:
                setViewportHeight();
                setAvatarPositions();
                break;

            case StepTypes.Two:
                const boundsFirst = target.current?.getBoundingClientRect();
                if (boundsFirst) {
                    avatarStyles.current = {
                        ...avatarStyles.current,
                        [seletedAvatar]: {
                            top: boundsFirst.y + fullscreen.current.scrollTop,
                            left: boundsFirst.x + fullscreen.current.scrollLeft,
                        }
                    };
                    setAvatarStyleGUID(getUniqueId());
                }
                break;

            case StepTypes.Three:
            default:
                setViewportHeight();
                setFriendsPositions();
                friendsResizeHandler();
                const boundsSecond = stepThree.current?.getBoundingClientRect();

                if (boundsSecond) {
                    avatarStyles.current = {
                        ...avatarStyles.current,
                        [seletedAvatar]: {
                            top: boundsSecond.y + fullscreen.current.scrollTop,
                            left: boundsSecond.x + fullscreen.current.scrollLeft,
                        }
                    };
                    setAvatarStyleGUID(getUniqueId());
                }

                break;
        }
    }, [setAvatarPositions, step, seletedAvatar]);

    React.useEffect(() => {
        setViewportHeight();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };

    }, [handleResize]);

    const handleModalCloseBtnClick = React.useCallback(() => {
        setStep(StepTypes.One);
        setAddedFriends([]);
        setSeletedAvatar(null);
        closeModal();
        setAddedFriends([]);
    }, []);

    const handlStepAnimation = React.useCallback((stepIndex) => {
        if (coinRef.current) {
            const avatar = document.querySelector(`[data-index='${stepIndex}']`);
            const keys = Number(avatar.getAttribute("data-index"));
            const bounds = avatar.getBoundingClientRect();
            const caseTwo = 2;
            const caseThree = 3;
            const caseFour = 4;
            const caseFive = 5;
            const caseSix = 6;
            const caseSeven = 7;
            const caseEight = 8;
            const caseNine = 9;
            const caseTen = 10;

            const caseZeroLeft = 75;
            const caseOneLeft = 170;
            const caseTwoLeft = 170;
            const caseTwoTop = 20;
            const caseThreeLeft = 170;
            const caseThreeTop = 20;
            const caseFourLeft = 170;
            const caseFourTop = 70;
            const caseFiveTop = 110;
            const caseSixLeft = 45;
            const caseSixTop = 70;
            const caseSevenTop = 20;
            const caseSevenLeft = 40;
            const caseEightLeft = 35;
            const caseEightTop = 75;
            const caseNineTop = 130;
            const caseNineLeft = 45;
            const caseTenLeft = 100;
            const caseTenTop = 80;

            switch (keys) {
                case 0:
                    coinStyles.current = {
                        left: bounds.x + document.getElementById("CoinAnimation").scrollLeft - caseZeroLeft,
                        top: bounds.y + document.getElementById("CoinAnimation").scrollTop
                    };
                    break;
                case 1:
                    coinStyles.current = {
                        left: bounds.x + document.getElementById("CoinAnimation").scrollLeft - caseOneLeft,
                        top: bounds.y + document.getElementById("CoinAnimation").scrollTop
                    };
                    break;
                case caseTwo:
                    coinStyles.current = {
                        left: bounds.x + document.getElementById("CoinAnimation").scrollLeft - caseTwoLeft,
                        top: bounds.y + document.getElementById("CoinAnimation").scrollTop - caseTwoTop
                    };
                    break;
                case caseThree:
                    coinStyles.current = {
                        left: bounds.x + document.getElementById("CoinAnimation").scrollLeft - caseThreeLeft,
                        top: bounds.y + document.getElementById("CoinAnimation").scrollTop - caseThreeTop
                    };
                    break;
                case caseFour:
                    coinStyles.current = {
                        left: bounds.x + document.getElementById("CoinAnimation").scrollLeft - caseFourLeft,
                        top: bounds.y + document.getElementById("CoinAnimation").scrollTop - caseFourTop
                    };
                    break;
                case caseFive:
                    coinStyles.current = {
                        left: bounds.x + document.getElementById("CoinAnimation").scrollLeft,
                        top: bounds.y + document.getElementById("CoinAnimation").scrollTop - caseFiveTop
                    };
                    break;
                case caseSix:
                    coinStyles.current = {
                        left: bounds.x + document.getElementById("CoinAnimation").scrollLeft + caseSixLeft,
                        top: bounds.y + document.getElementById("CoinAnimation").scrollTop - caseSixTop
                    };
                    break;
                case caseSeven:
                    coinStyles.current = {
                        left: bounds.x + document.getElementById("CoinAnimation").scrollLeft + caseSevenLeft,
                        top: bounds.y + document.getElementById("CoinAnimation").scrollTop + caseSevenTop
                    };
                    break;
                case caseEight:
                    coinStyles.current = {
                        left: bounds.x + document.getElementById("CoinAnimation").scrollLeft + caseEightLeft,
                        top: bounds.y + document.getElementById("CoinAnimation").scrollTop + caseEightTop
                    };
                    break;
                case caseNine:
                    coinStyles.current = {
                        left: bounds.x + document.getElementById("CoinAnimation").scrollLeft - caseNineLeft,
                        top: bounds.y + document.getElementById("CoinAnimation").scrollTop + caseNineTop
                    };
                    break;
                case caseTen:
                    coinStyles.current = {
                        left: bounds.x + document.getElementById("CoinAnimation").scrollLeft - caseTenLeft,
                        top: bounds.y + document.getElementById("CoinAnimation").scrollTop + caseTenTop
                    };
                    break;

            }

            setAvatarStyleGUID(getUniqueId());
        }
    }, []);

    React.useEffect(() => {
        if (donationAmount !== "") {
            let index = 0;
            handlStepAnimation(index);
            coinInterval = setInterval(() => {
                if (index < donationTotalAvatars) {
                    index = index + 1;
                    handlStepAnimation(index);
                } else {
                    clearInterval(coinInterval);
                }
            }, stepTwoTimeout);

            return () => {
                clearInterval(coinInterval);
            };
        }
    }, [donationAmount, handlStepAnimation]);

    return (
        <div className={`${colCenter} ${styles.wrapper}`}>
            <PrimaryButton onClick={openModal}>Play Game</PrimaryButton>
            <Modal show={isModalOpen} fullscreen={true} onHide={closeModal}>
                <Modal.Body className={`w-100 overflow-hidden inline-block p-0 ${styles.modalBody}`}
                    id={containerId} ref={fullscreen}>
                    <FontAwesomeIcon icon={faTimes} width="30" height="35" onClick={handleModalCloseBtnClick} className={styles.close} />
                    <div className={styles.container}>
                        <div className={`${styles.card}  ${styles.gameStepTwoWrapper}`} ref={start}>
                            <h2 className={`${styles.avatarHeading}`}>Choose your Avatar.</h2>
                            {step1Avatars.map(([key, value]) =>
                                <Link
                                    key={key}
                                    style={avatarStyles.current && avatarStyles.current[value]}
                                    onClick={() => handleAvatarClick(value)}
                                    to={StepTypes.Two}
                                    smooth={true}
                                    duration={700}
                                    containerId={containerId}
                                    className={`${styles.avatar}
                                     ${step === StepTypes.Two ? styles.avatarSelected : step === StepTypes.Three ? styles.avatarFriends : ""}`}
                                    ignoreCancelEvents={true}
                                    offset={-20}
                                >
                                    <Avatar color={value} />
                                </Link>
                            )}
                        </div>

                        <Element name={StepTypes.Two} className={styles.card} id="test">
                            <div className={`${colCenter} ${styles.gameStepTwoWrapper}`}>
                                <h2 className={`${styles.avatarHeading}`}>Name your avatar.</h2>
                                <div className={`${colCenter} ${styles.gameStepTwo}`}>
                                    <div className={styles.targetOne} ref={target}></div>
                                    <input
                                        placeholder="Name"
                                        className="w-100 text-center"
                                        onChange={(e) => setAvatarName(e.target.value)}
                                    />
                                    <PrimaryButton onClick={handleContinueBtnClick}>
                                        Continue
                                    </PrimaryButton>
                                </div>
                            </div>
                        </Element>

                        <Element name={StepTypes.Three} className={`${styles.card} ${styles.transparent}`}>
                            <div className={`${styles.gameStepThree} ${rowHBetween}`}>
                                <div className={`${styles.gameStepThreeUserColumn} ${colCenter}`}>
                                    <h2 className={styles.avatarHeading}>Add four friends.</h2>
                                    <div className={styles.targetTwo} ref={stepThree}></div>
                                    <h3>{avatarName}</h3>
                                </div>
                                <div className={`${styles.gameStepThreeFriendsColumn} ${rowHCenter}`} ref={friendsRef}>
                                    <h2 className={styles.avatarHeading}>Add four friends.</h2>
                                    {step === StepTypes.Three ?
                                        <div className={`${styles.percentageWrapper} ${rowHCenter} flex-wrap`}>
                                            {friendsAvatars.map((key: IFriendAvatar, index) =>
                                                <div
                                                    key={index}
                                                    style={friendsStyle.current && friendsStyle.current[key.id]}
                                                    onClick={() => !key.done ? friendsAnimation(index, key) : null}
                                                >
                                                    <Avatar color={key.id} />
                                                </div>
                                            )}
                                        </div>
                                        : null}
                                </div>
                            </div>
                        </Element>

                        <Element name={StepTypes.Four} className={styles.donationSections} id="CoinAnimation">
                            <div className={styles.card}>
                                <div className={`${rowHCenter} ${styles.stepFour}`}>
                                    <h2 className={`${styles.avatarHeading}`}>How much do you want to donate?</h2>
                                    <h4>Add donation in increments of $5 and discover where the donation is going.</h4>
                                    <Navbar expand="lg" className="justify-content-center"
                                        expanded={expanded}
                                        onClick={() => breakpoint && setExpanded(!expanded)}>
                                        <Navbar.Brand href="#home" className="d-lg-none">{donationAmount === "" ? "Select Amount" : donationAmount}</Navbar.Brand>
                                        <Navbar.Toggle aria-controls="basic-navbar-nav" className={styles.navToggle}>
                                            <FontAwesomeIcon icon={faChevronDown} width="30" height="35" />
                                        </Navbar.Toggle>
                                        <hr className={`d-block d-lg-none w-100 ${styles.activeTab} opacity-1`} />
                                        <Navbar.Collapse id="basic-navbar-nav">
                                            <Nav className={"me-auto w-100"}>
                                                {donation.map((donation, donationKey) =>
                                                    <PrimaryButton
                                                        key={donationKey}
                                                        onClick={() => {
                                                            setDonationAmount(donation);
                                                            animationHandler(donation);
                                                            document.getElementById("CoinAnimation").scroll({
                                                                top: 230,
                                                                behavior: "smooth"
                                                            });
                                                        }}
                                                        className={`${horizontalAlign} 
                                                        ${styles.donationButton}
                                                         ${donation === donationAmount
                                                                ? styles.active :
                                                                styles.inactive}
                                                          w-100 px-1 py-3`}
                                                    >
                                                        ${donation}
                                                    </PrimaryButton>
                                                )}

                                            </Nav>
                                        </Navbar.Collapse>
                                    </Navbar>

                                    <div className={`w-100 ${animation ?
                                        styles.contentAnimation :
                                        styles.donationCycle}`}>
                                        <div className={`${styles.donationInner} 
                                                ${colCenter}`}>
                                            <h2>Donation Cycle</h2>
                                            <div className={styles.coinTwo}
                                                ref={coinRef}
                                                style={coinStyles.current}>
                                                <Image src={"/images/Game/coin.png"} alt="Coin" width={76} height={76} />
                                            </div>
                                            <div ref={coinStart}></div>
                                            <div className={styles.userDonation}>
                                                <Image src={"/images/Game/user.png"} alt="User" width={149} height={129} />
                                            </div>
                                            {/* <p>
                                                {`${donationAmount !== "" ?
                                                    `$${Number(donationAmount) / donationDivide}0`
                                                    : ""}`}
                                            </p>
                                            <h3>Content Creators</h3> */}
                                        </div>
                                        <Row>
                                            <Col className={`${horizontalAlign} ${styles.heigth120}`}>
                                                <div className={`${styles.cycle0} ${styles.donationImage}`} data-index="0">
                                                    <Image src="/images/Game/avatars/avatarGreen.png" width={56} height={63} />
                                                    <span className={styles.donationAmount0}>0.20</span>
                                                </div>

                                            </Col>
                                        </Row>
                                        <Row className={`${styles.w25} ${styles.marginTopMinusFifty}`}>
                                            <Col className={`${horizontalAlign} ${styles.heigth120}`}>
                                                <div className={styles.donationCycleItems} data-index="10">
                                                    <Image src="/images/Game/avatars/avatarPurple.png" width={56} height={63} />
                                                    <span className={styles.donationAmount1}>0.20</span>
                                                </div>
                                            </Col>
                                            <Col className={`${horizontalAlign} ${styles.heigth120}`}>
                                                <div className={`${styles.cycle2} ${styles.donationImage}`} data-index="1">
                                                    <Image src="/images/Game/avatars/avatarRed.png" width={56} height={63} />
                                                    <span className={styles.donationAmount2}>0.20</span>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className={styles.w40}>
                                            <Col className={`${horizontalAlign} ${styles.heigth120}`}>
                                                <div className={styles.donationLogo}>
                                                    <div>
                                                        <label>Spiffy Corp.</label>
                                                        <span>
                                                            We’re totally reliant on these cents to keep us going.
                                                        </span>
                                                    </div>
                                                    <div className={`${styles.cycle3} ${styles.donationImage}`} data-index="9">
                                                        <Image src="/images/Game/donationCycle/spiffy.png" width={56} height={63} />
                                                        <span className={styles.donationAmount3}>0.20</span>
                                                    </div>
                                                </div>

                                            </Col>
                                            <Col className={`${horizontalAlign} ${styles.heigth120}`}>
                                                <div className={`${styles.cycle4} ${styles.donationImage}`} data-index="2">
                                                    <Image src="/images/Game/avatars/avatarYellow.png" width={56} height={63} />
                                                    <span className={styles.donationAmount4}>0.20</span>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className={styles.w55}>
                                            <Col className={`${horizontalAlign} ${styles.heigth120}`}>
                                                <div className={`${styles.cycle5} ${styles.donationImage}`} data-index="8">
                                                    <Image src="/images/Game/avatars/avatarGreen.png" width={56} height={63} />
                                                    <span className={styles.donationAmount5}>0.20</span>
                                                </div>
                                            </Col>
                                            <Col className={`${horizontalAlign} ${styles.heigth120}`}>
                                                <div className={`${styles.cycle6} ${styles.donationImage}`} data-index="3">
                                                    <Image src="/images/Game/avatars/avatarPurple.png" width={56} height={63} />
                                                    <span className={styles.donationAmount6}>0.20</span>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className={styles.w40}>
                                            <Col className={`${horizontalAlign} ${styles.heigth120}`}>
                                                <div className={`${styles.cycle7} ${styles.donationImage}`} data-index="7">
                                                    <Image src="/images/Game/avatars/avatarYellow.png" width={56} height={63} />
                                                    <span className={styles.donationAmount7}>0.20</span>
                                                </div>
                                            </Col>
                                            <Col className={`${horizontalAlign} ${styles.heigth120}`}>
                                                <div className={`${styles.cycle8} ${styles.donationImage}`} data-index="4">
                                                    <Image src="/images/Game/avatars/avatarYellow.png" width={56} height={63} />
                                                    <span className={styles.donationAmount8}>0.20</span>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className={`${styles.w25} ${styles.marginBottomMinusFifty}`}>
                                            <Col className={`${horizontalAlign} ${styles.heigth120}`}>
                                                <div className={`${styles.cycle9} ${styles.donationImage}`} data-index="6">
                                                    <Image src="/images/Game/avatars/avatarRed.png" width={56} height={63} />
                                                    <span className={styles.donationAmount9}>0.20</span>
                                                </div>
                                            </Col>
                                            <Col className={`${horizontalAlign} ${styles.heigth120}`}>
                                                <div className={`${styles.cycle10} ${styles.donationImage}`} data-index="3">
                                                    <Image src="/images/Game/avatars/avatarRed.png" width={56} height={63} />
                                                    <span className={styles.donationAmount10}>0.20</span>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className={`${horizontalAlign} ${styles.heigth120}`}>
                                                <div className={`${styles.cycle11} ${styles.donationImage}`} data-index="5">
                                                    <Image src="/images/Game/avatars/avatarGreen.png" width={56} height={63} />
                                                    <span className={styles.donationAmount11}>0.20</span>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    {/* <div className={`${styles.donationInner} 
                                    ${colCenter} ${animation ? styles.contentAnimation : ""}`}>
                                        <h2>Donation Cycle</h2>
                                        <div className={`${animation ? styles.coin : styles.coinDefault}`}>
                                            <Image src={"/images/Game/coin.png"} alt="Coin" width={76} height={76} />
                                        </div>
                                        <div className={styles.userDonation}>
                                            <Image src={"/images/Game/user.png"} alt="User" width={149} height={129} />
                                        </div>
                                        <p>
                                        {`${donationAmount !== "" ?
                                         `$${Number(donationAmount) / donationDivide}0` 
                                         : ""}`}
                                        </p>
                                        <h3>Content Creators</h3>
                                    </div>
                                    {animation ?
                                        <div className={`${animation 
                                            ? styles.animationGrid : 
                                            ""} position-relative`} >
                                            <div className={styles.donationCycleItems}>
                                                <Image 
                                                src={"/images/Game/donationCycle/avatarPurple.png"}
                                                width={56}
                                                height={63} />
                                                <span>
                                                    ${Number(donationAmount) / donationFormula / donationFormula}0
                                                </span>
                                                <h3 className="position-absolute">Early Adapters</h3>
                                            </div>
                                            {donationMap}
                                            <div>
                                                <div className={styles.animationText}>
                                                    <h2>Spiffy Corp.</h2>
                                                    <p>We’re totally reliant on these cents to keep us going.</p>
                                                </div>
                                                <div className={styles.donationCycleItems}>
                                                    <Image 
                                                    src={"/images/Game/donationCycle/spiffy.png"}
                                                    width={156}
                                                    height={45} />
                                                    <span>
                                                        ${Number(donationAmount) / donationFormula / donationFormula}0
                                                    </span>
                                                </div>
                                            </div>
                                        </div> :
                                        null} */}
                                </div>
                            </div>
                            {donationAmount ?
                                <div className={styles.card}>
                                    <GameAvatarList
                                        friends={addedFriends}
                                        seletedAvatar={seletedAvatar}
                                        name={avatarName}
                                        setStep={setStep}
                                        signupAnimation={signupAnimation} />
                                </div> :
                                null}
                        </Element>

                        <Element name={StepTypes.Six} className={styles.card}>
                            <div className={styles.gameStepSix}>
                                <div className={`${colCenter} ${styles.signUpsection}`}>
                                    <Image src={"/images/Game/trophy.png"} alt="trophy" width={291} height={318} />
                                    <h2 className={`${styles.avatarHeading}`}>Congratulations!</h2>
                                    <button>SIGN UP</button>
                                </div>
                            </div>
                        </Element>
                    </div>
                </Modal.Body >
            </Modal >
        </div >
    );
};

export default GameSection;
