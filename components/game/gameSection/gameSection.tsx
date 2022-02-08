import { Col, Nav, Navbar, Row } from "react-bootstrap";
import { Element, Link, scroller } from "react-scroll";
import { faChevronDown, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Modal from "react-bootstrap/Modal";
import React, { CSSProperties } from "react";

import Avatar from "components/game/avatar/avatar";
import AvatarType from "components/game/gameSection/enums/avatarTypes";
import Breakpoints from "common/style/breakpoints";
import flexbox from "utils/flexbox";
import GameAvatarList from "components/game/gameAvatarList/gameAvatarList";
import getUniqueId from "utils/getUniqueId";
import IGameSectionProps from "components/game/gameSection/interfaces/IGameSectionProps";
import PrimaryButton from "components/common/primaryButton/primaryButton";
import setViewportHeight from "utils/setViewportHeight";
import StepTypes from "components/game/gameSection/enums/stepTypes";
import useBoolean from "hooks/useBoolean";
import useBreakpoint from "hooks/useBreakpoint";

import styles from "components/game/gameSection/gameSection.module.scss";

const colCenter = flexbox({ vertical: true, hAlign: "center", vAlign: "center" });
const horizontalAlign = flexbox({ hAlign: "center", vAlign: "center" });
const rowCenter = flexbox({ hAlign: "center" });
const rowHBetween = flexbox({ hAlign: "between" });
const rowHEnd = flexbox({ hAlign: "end" });
const rowVCenter = flexbox({ vAlign: "center", vertical: true, });
const donationValues: string[] = ["5", "10", "15", "25", "50"];
const friendsTimeout = 2000;
const avatarTimeout = 1000;
const boundDivide = 2;
const containerId = "containerElement";
const phoneKeyboardTimeout = 500;
const donationTotalAvatars = 11;
const stepTwoTimeout = 1500;
const contentCreatorFormula = 50;
const friendsFormula = 4;
const spiffyFormula = 10;
const stepOneTimeout = 500;
const friendsSliceTwo = 2;
const friendsSliceFour = 4;

/** Donation Cycle Animation Style */
const fourHundred = 420;
const ten = 10;
const eleven = 11;
const fiveHundred = 500;
const fifty = 50;
const eightHundred = 800;
const sixtyFive = 65;
const elevenHundred = 1100;
const thiryFive = 35;
const seventy = 70;
const thirty = 30;
const seventeenHundred = 1700;
const sixteenHundred = 1600;
const thousand = 1000;
const sevenHundred = 700;
const threeHundred = 300;
const fourty = 40;
const fourtyFive = 45;
const twelveHundred = 1300;
const twenty = 20;

const avatars = Object.values(AvatarType);
/**
 * First section remove orange avatar.
 */
const step1Avatars = avatars.filter((avatar) => avatar !== AvatarType.Orange);

const GameSection = (props: IGameSectionProps): JSX.Element => {
    const [addedFriends, setAddedFriends] = React.useState<AvatarType[]>([]);
    const [seletedAvatar, setSeletedAvatar] = React.useState<AvatarType>();
    const [step, setStep] = React.useState<StepTypes>(StepTypes.First);
    const [avatarName, setAvatarName] = React.useState<string>("");
    const [donationAmount, setDonationAmount] = React.useState<string>("");
    const [animation, { setTrue: animationTrue, setFalse: animationFalse }] = useBoolean(false);
    const [expanded, { toggle: navToggle }] = useBoolean(false);
    const isLG = useBreakpoint(Breakpoints.LG);
    const isMD = useBreakpoint(Breakpoints.MD);

    const avatarStyles = React.useRef<Record<AvatarType, CSSProperties>>();
    const [avatarStyleGUID, setAvatarStyleGUID] = React.useState("0");
    const friendsStyle = React.useRef<Record<AvatarType, CSSProperties>>();
    const [, setFriendsStyleGUID] = React.useState("0");

    const start = React.useRef<HTMLDivElement>();
    const target = React.useRef<HTMLDivElement>();
    const stepThree = React.useRef<HTMLDivElement>();
    const fullscreen = React.useRef<HTMLDivElement>();
    const friendsRef = React.useRef<HTMLDivElement>();
    const coinRef = React.useRef<HTMLDivElement>();
    const coinAnimationWrapperRef = React.useRef<HTMLDivElement>();
    const coinStyles = React.useRef<CSSProperties>();

    /**
     * Filter avatars array with user selected avatar for friends.
     */
    const friendsAvatars = React.useMemo(() => avatars.filter((avatarObj) =>
        seletedAvatar && avatarObj !== seletedAvatar
    ), [seletedAvatar]);

    const scrollHandler = React.useCallback((value: string) => {
        scroller.scrollTo(value, {
            duration: 700,
            smooth: true,
            containerId,
            ignoreCancelEvents: true,
            offset: -20,
        });
    }, []);

    /**
     * UseEffect to check all four friends are added.
     */
    React.useEffect(() => {
        let timer: NodeJS.Timeout;
        if (seletedAvatar && addedFriends.length === friendsAvatars.length) {
            scrollHandler(StepTypes.Fourth);
            /*eslint-env browser*/
            timer = setTimeout(() => {
                setStep(StepTypes.Fourth);
                clearTimeout(timer);
            }, friendsTimeout);
        }

        return () => {
            clearTimeout(timer);
        };
    }, [addedFriends, friendsAvatars, seletedAvatar, scrollHandler]);

    /**
     * Reset the donation cycle animation.
     * @param donation user select amount of donation.
     */
    const animationHandler = React.useCallback((donation: string) => {
        if (donation !== donationAmount) {
            animationFalse();
            const animationTimeout = setTimeout(() => {
                animationTrue();
                clearTimeout(animationTimeout);
            }, avatarTimeout);
        }
    }, [donationAmount, animationFalse, animationTrue]);

    const avatarStyleHandler = React.useCallback((refrence: React.MutableRefObject<HTMLDivElement>) => {
        if (refrence.current) {
            const mobileAvatar = 90;
            const desktopAvatar = 160;
            const bounds = refrence.current.getBoundingClientRect();
            const avatarSize = isLG ? mobileAvatar : desktopAvatar;
            const cardMidPointX = (bounds.x + bounds.right) / boundDivide;
            const cardMidPointY = (bounds.y + bounds.bottom) / boundDivide;
            const space = 10;
            const left1 = Math.abs(cardMidPointX - avatarSize);
            const left2 = Math.abs(cardMidPointX + space);
            const top1 = Math.abs(cardMidPointY - avatarSize - space) + fullscreen.current.scrollTop;
            const top2 = Math.abs(cardMidPointY + space) + fullscreen.current.scrollTop;

            return { left1, left2, top1, top2 };
        }
    }, [isLG]);

    /**
     * Get styles of avatars in first section.
     */
    const getAvatarStyles = React.useCallback(() => {
        const styles = {} as Record<AvatarType, CSSProperties>;

        avatars.forEach((avatar) => {
            switch (avatar) {
                case AvatarType.Green:
                    styles[avatar] = {
                        left: avatarStyleHandler(start).left1,
                        top: avatarStyleHandler(start).top1,
                        opacity: "1",
                    };
                    break;
                case AvatarType.Red:
                    styles[avatar] = {
                        left: avatarStyleHandler(start).left2,
                        top: avatarStyleHandler(start).top1,
                        opacity: "1",
                    };
                    break;
                case AvatarType.Yellow:
                    styles[avatar] = {
                        left: avatarStyleHandler(start).left1,
                        top: avatarStyleHandler(start).top2,
                        opacity: "1",
                    };
                    break;
                case AvatarType.Purple:
                default:
                    styles[avatar] = {
                        left: avatarStyleHandler(start).left2,
                        top: avatarStyleHandler(start).top2,
                        opacity: "1",
                    };
                    break;
            }
        });

        return styles;
    }, [avatarStyleHandler]);

    /**
     * Get styles of fiends avatars in third section.
     */
    const getFriendsStyle = React.useCallback(() => {
        const styles = {} as Record<AvatarType, CSSProperties>;
        const keyTwo = 2;
        const keyThree = 3;

        friendsAvatars.map((avatar, index) => {
            switch (index) {
                case 0:
                    styles[avatar] = {
                        left: avatarStyleHandler(friendsRef).left1,
                        top: avatarStyleHandler(friendsRef).top1,
                    };
                    break;
                case 1:
                    styles[avatar] = {
                        left: avatarStyleHandler(friendsRef).left2,
                        top: avatarStyleHandler(friendsRef).top1,
                    };
                    break;
                case keyTwo:
                    styles[avatar] = {
                        left: avatarStyleHandler(friendsRef).left1,
                        top: avatarStyleHandler(friendsRef).top2,
                    };
                    break;
                case keyThree:
                default:
                    styles[avatar] = {
                        left: avatarStyleHandler(friendsRef).left2,
                        top: avatarStyleHandler(friendsRef).top2,
                    };
                    break;
            }
        });

        return styles;
    }, [friendsAvatars, avatarStyleHandler]);

    /**
     * Section one animation and scroll on selecting avatar.
     * @param avatar user selected avatar in first section.
     */
    const handleAvatarClick = React.useCallback((avatar: AvatarType) => {
        if (target.current) {
            const bounds = target.current.getBoundingClientRect();
            avatarStyles.current = {
                ...avatarStyles.current,
                [avatar]: {
                    top: bounds.y + fullscreen.current.scrollTop,
                    left: bounds.x + fullscreen.current.scrollLeft,
                    opacity: "1"
                }
            };
            setAvatarStyleGUID(getUniqueId());
        }
        setSeletedAvatar(avatar);
        setStep(StepTypes.Second);
    }, []);

    /**
     * Filter selected friends from avatars.
     * @param friendAvatar user selected friends.
     */
    const selectedFriendsHandler = React.useCallback((friendAvatar: AvatarType) => {
        if (stepThree.current) {
            const selectedFriends: AvatarType[] = [];
            avatars.filter((avatar) => avatar !== seletedAvatar).forEach((avatar) => {
                if (avatar == friendAvatar) {
                    selectedFriends.push(avatar);
                }
            });
            setAddedFriends((currentFriends: AvatarType[]) => [...currentFriends, ...selectedFriends]);
        }
    }, [seletedAvatar]);

    /**
     * Setting styles of avatars in first section.
     */
    const setAvatarPositions = React.useCallback(() => {
        const styles = getAvatarStyles();
        if (styles) {
            avatarStyles.current = { ...avatarStyles.current, ...styles };
            setAvatarStyleGUID(getUniqueId());
        }
    }, [getAvatarStyles]);

    /**
     * Setting styles of friends in third section.
     */
    const setFriendsPositions = React.useCallback(() => {
        const styles = getFriendsStyle();
        if (styles) {
            friendsStyle.current = { ...friendsStyle.current, ...styles };
            setFriendsStyleGUID(getUniqueId());
        }
    }, [getFriendsStyle]);

    /**
     * Section two animation and scroll on continue.
     */
    const handleContinueBtnClick = React.useCallback(() => {
        if (!avatarName) {
            return;
        }

        const t = setTimeout(() => {
            if (stepThree.current && step === StepTypes.Second) {
                const bounds = stepThree.current.getBoundingClientRect();
                avatarStyles.current = {
                    ...avatarStyles.current,
                    [seletedAvatar]: {
                        top: bounds.y + fullscreen.current.scrollTop,
                        left: bounds.x + fullscreen.current.scrollLeft,
                        opacity: "1"
                    }
                };
                setAvatarStyleGUID(getUniqueId());
                /** SetStep to animate scroll to next section */
                setStep(StepTypes.Third);
                setFriendsPositions();
                scrollHandler(StepTypes.Third);
                clearTimeout(t);
            }

            clearTimeout(t);
        }, phoneKeyboardTimeout);
    }, [setFriendsPositions, seletedAvatar, avatarName, step, scrollHandler]);

    /**
     * First section avatars style.
     */
    React.useEffect(() => {
        let avatarTimeout: NodeJS.Timeout;
        /** checking if step is one and style is already applied for section one avatars*/
        if (step === StepTypes.First && avatarStyleGUID === "0") {
            avatarTimeout = setTimeout(() => {
                setAvatarPositions();
            }, stepOneTimeout);
        }

        return () => {
            clearTimeout(avatarTimeout);
        };
    }, [setAvatarPositions, step, avatarStyleGUID]);

    /**
     * Section five animation and scroll on 100% to signup section.
     */
    const signupAnimation = React.useCallback(() => {
        scroller.scrollTo(StepTypes.Sixth, {
            duration: 700,
            smooth: true,
            containerId,
            ignoreCancelEvents: true,
            delay: 3000
        });
    }, []);

    /**
     * Resize function
     */
    const handleResize = React.useCallback(() => {
        switch (step) {
            case StepTypes.First:
                setAvatarPositions();
                break;

            case StepTypes.Second: {
                isMD && setViewportHeight();
                const boundsFirst = target.current?.getBoundingClientRect();
                if (boundsFirst) {
                    avatarStyles.current = {
                        ...avatarStyles.current,
                        [seletedAvatar]: {
                            top: boundsFirst.y + fullscreen.current.scrollTop,
                            left: boundsFirst.x + fullscreen.current.scrollLeft,
                            opacity: "1"
                        }
                    };
                    setAvatarStyleGUID(getUniqueId());
                }
                break;
            }

            case StepTypes.Third: {
                scrollHandler(StepTypes.Third);
                setFriendsPositions();
                const boundsSecond = stepThree.current?.getBoundingClientRect();

                if (boundsSecond) {
                    avatarStyles.current = {
                        ...avatarStyles.current,
                        [seletedAvatar]: {
                            top: boundsSecond.y + fullscreen.current.scrollTop,
                            left: boundsSecond.x + fullscreen.current.scrollLeft,
                            opacity: "1"
                        }
                    };
                    setAvatarStyleGUID(getUniqueId());
                }
                break;
            }
        }
    }, [setAvatarPositions, step, seletedAvatar, setFriendsPositions, scrollHandler]);

    /**
     * Resize function
     */
    React.useEffect(() => {
        setViewportHeight();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [handleResize]);

    /**
     * Donation cycle style and animation.
     * @param stepIndex index of cycle item.
     */
    const handlStepAnimation = React.useCallback((stepIndex: number) => {
        if (coinRef.current) {
            const avatar = document.querySelector(`[data-index='${stepIndex}']`);
            const bounds = avatar.getBoundingClientRect();
            const coin = coinAnimationWrapperRef.current;
            const width = window.innerWidth;

            let left: number;
            let startingLeft: number;

            if (width < fourHundred) {
                left = ten;
            } else if (width > fourHundred && width < fiveHundred) {
                left = fifty;
            } else if (width > fiveHundred && width < eightHundred) {
                left = sixtyFive;
            } else if (width > eightHundred && width < elevenHundred) {
                left = thiryFive;
            } else if (width > thousand && width < twelveHundred) {
                left = thirty;
            } else {
                left = seventy;
            }

            if (width < seventeenHundred && width > sixteenHundred) {
                startingLeft = thiryFive;
            } else if (width > thousand && width < sixteenHundred) {
                startingLeft = thirty;
            } else if (width > fourHundred && width < sevenHundred) {
                startingLeft = fourty;
            } else if (width > threeHundred && width < fourHundred) {
                startingLeft = 0;
            } else {
                startingLeft = fourtyFive;
            }

            switch (stepIndex) {
                case 0:
                    coinStyles.current = {
                        left: bounds.x + coin.scrollLeft - startingLeft,
                        top: bounds.y + coin.scrollTop,
                        transition: "2s"
                    };
                    break;
                case eleven:
                    coinStyles.current = {
                        left: bounds.x + coin.scrollLeft - startingLeft,
                        top: bounds.y + coin.scrollTop,
                        transition: "2s",
                        opacity: "0"
                    };
                    break;
                default:
                    coinStyles.current = {
                        left: bounds.x + coin.scrollLeft - left,
                        top: bounds.y + coin.scrollTop - twenty,
                        transition: "2s",
                    };
            }
            setAvatarStyleGUID(getUniqueId());
        }
    }, []);

    /**
     * Function to start or reset the donation cycle animation.
     */
    React.useEffect(() => {
        let coinInterval: NodeJS.Timer;
        if (animation) {
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
        }

        return () => {
            clearInterval(coinInterval);
        };
    }, [animation, handlStepAnimation]);

    /**
     * Donation cycle calclutions.
     * @param donation selected amount in donation cycle.
     */
    const donationAmountHandler = React.useCallback((donation: number) => {
        const percentage = 100;
        const donationFixed = 2;
        const amount = (donation / percentage * Number(donationAmount)).toFixed(donationFixed);

        return <span>{amount.charAt(0) === "0" ? `${amount}¢` : `$${amount}`}</span>;
    }, [donationAmount]);

    /**
     * Donation cycle items.
     * @param style classNames of cycle items.
     */
    const donation = React.useCallback((style: string, color: string) => {
        if (donationAmount) {
            return <>
                <Avatar color={color} size={56} />
                <span className={`${style} ${styles.donationAmount}`}>
                    {donationAmountHandler(friendsFormula)}
                </span>
            </>;
        }
    }, [donationAmount, donationAmountHandler]);

    /**
     * Donation amount rendering.
     */
    const donationCycle = React.useMemo(() =>
        donationValues.map((donation) =>
            <PrimaryButton
                key={donation}
                onClick={() => {
                    setDonationAmount(donation);
                    animationHandler(donation);
                    coinAnimationWrapperRef.current.scroll({
                        top: 230,
                        behavior: "smooth"
                    });
                    coinStyles.current = {
                        left: null,
                        top: null
                    };
                }}
                className={`${horizontalAlign} 
                ${styles.donationButton}
                ${donation === donationAmount ? styles.active : styles.inactive}
                w-100 px-1 py-3`}
            >
                ${donation}
            </PrimaryButton>
        ), [animationHandler, donationAmount]);

    const addedFriendsRender = React.useCallback((isTop: boolean) => {
        const arrFriends = isTop
            ? addedFriends.slice(0, friendsSliceTwo)
            : addedFriends.slice(friendsSliceTwo, friendsSliceFour);

        const style = isTop
            ? styles.friendsTop
            : styles.friendsBottom;

        return <div className={`${style} ${rowHBetween}`}>
            {arrFriends.map((friend, friendKey) =>
                <Avatar color={friend} key={friendKey} />)}
        </div>;
    }, [addedFriends]);

    const classes = React.useMemo(() => {
        const className = `${styles.avatar} position-absolute text-center`;

        switch (step) {
            case StepTypes.Second:
                return `${className} ${styles.avatarSelected}`;

            case StepTypes.Third:
                return `${className} ${styles.avatarFriends}`;

            default:
                return className;
        }
    }, [step]);

    return (
        <div className={`${colCenter} ${styles.wrapper}`}>
            <Modal show={true} fullscreen={true} onHide={props.closeModal}>
                <Modal.Body
                    className={`w-100 overflow-hidden inline-block p-0 ${styles.modalBody}`}
                    id={containerId}
                    ref={fullscreen}>
                    <FontAwesomeIcon icon={faTimes} width="30" height="35" onClick={props.closeModal} className={styles.close} />
                    <div className={`w-100 ${rowVCenter}`}>
                        <div className={`${styles.card} ${styles.gameStepTwoWrapper} ${rowCenter}`} ref={start}>
                            <h2 className={`${styles.avatarHeading}`}>Choose your avatar</h2>
                            {step1Avatars.map((avatar, index) =>
                                <Link
                                    key={index}
                                    style={avatarStyles.current && avatarStyles.current[avatar]}
                                    onClick={() => handleAvatarClick(avatar)}
                                    to={StepTypes.Second}
                                    smooth={true}
                                    duration={500}
                                    containerId={containerId}
                                    className={classes}
                                    ignoreCancelEvents={true}
                                    offset={-20}
                                >
                                    <Avatar color={avatar} />
                                </Link>
                            )}
                        </div>

                        <Element name={StepTypes.Second} className={`${styles.card} ${rowCenter}`}>
                            <div className={`${colCenter} ${styles.gameStepTwoWrapper}`}>
                                <h2 className={`${styles.avatarHeading}`}>Name your avatar</h2>
                                <div className={`${colCenter} ${styles.gameStepTwo}`}>
                                    <div className={styles.targetOne} ref={target}></div>
                                    <input
                                        type="text"
                                        placeholder="Enter name"
                                        className="w-100 text-center"
                                        onChange={(e) => setAvatarName(e.target.value)}
                                    />
                                    <PrimaryButton onClick={handleContinueBtnClick} className="w-100">
                                        Continue
                                    </PrimaryButton>
                                </div>
                            </div>
                        </Element>

                        <Element name={StepTypes.Third} className={`${styles.card} ${styles.transparent} ${rowCenter}`}>
                            <div className={`${styles.gameStepThree} ${rowHBetween}`}>
                                <div className={`${styles.gameStepThreeUserColumn} ${colCenter}`}>
                                    <div className={`${styles.gameStepThreeUserColumnInner} w-100`}>
                                        <h2 className={`${styles.avatarHeading} text-center`}>Add four friends</h2>
                                        <Row className={`${horizontalAlign} w-100 m-0`}>
                                            {addedFriendsRender(true)}
                                        </Row>
                                        <Row className={`${horizontalAlign} w-100 m-0`}>
                                            <div className={styles.targetTwo} ref={stepThree}></div>
                                        </Row>
                                        <Row className={`${horizontalAlign} w-100 m-0`}>
                                            {addedFriendsRender(false)}
                                        </Row>

                                        <h3 className="text-center">{avatarName}</h3>
                                    </div>
                                </div>
                                <div className={`${styles.gameStepThreeFriendsColumn} ${rowVCenter}`} ref={friendsRef}>
                                    <h2 className={styles.avatarHeading}>Add four friends</h2>
                                    {step === StepTypes.Third
                                        ? <div className={`${styles.percentageWrapper} ${rowVCenter} flex-wrap`}>
                                            {friendsAvatars.map((avatar: AvatarType) => {
                                                if (addedFriends.find((addedAvatar) => addedAvatar === avatar)) {
                                                    return null;
                                                }

                                                return (
                                                    <React.Fragment key={avatar}>
                                                        <div
                                                            className="position-absolute"
                                                            style={
                                                                friendsStyle.current
                                                                && friendsStyle.current[avatar]
                                                            }
                                                            onClick={() => selectedFriendsHandler(avatar)}>
                                                            <Avatar color={avatar} />
                                                        </div>
                                                    </React.Fragment>
                                                );
                                            })}
                                        </div> : null}
                                </div>
                            </div>
                        </Element>

                        <Element name={StepTypes.Fourth} className="w-100">
                            <div ref={coinAnimationWrapperRef} className={styles.donationSections}>
                                <div className={`${styles.card} ${rowCenter}`}>
                                    <div className={`${rowVCenter} ${styles.stepFour} position-relative`}>
                                        <h2 className={`${styles.avatarHeading} text-center`}>
                                            How much do you want to donate?
                                        </h2>
                                        <h4 className="text-center">
                                            Add donation in increments of $5, and discover where your donation is going.
                                        </h4>
                                        <Navbar
                                            expand="lg"
                                            className="d-block text-center"
                                            expanded={expanded}
                                            onClick={() => isLG && navToggle()}>
                                            <Navbar.Brand className="d-lg-none">
                                                {!donationAmount
                                                    ? "Select Amount"
                                                    : `$${donationAmount}`}
                                            </Navbar.Brand>
                                            <Navbar.Toggle className={styles.navToggle}>
                                                <FontAwesomeIcon icon={faChevronDown} width="30" height="35" />
                                            </Navbar.Toggle>
                                            <hr className={`d-block d-lg-none w-100 ${styles.activeTab} opacity-1`} />
                                            <Navbar.Collapse className={styles.customNavbar}>
                                                <Nav className={"me-auto w-100"}>
                                                    {donationCycle}
                                                </Nav>
                                            </Navbar.Collapse>
                                        </Navbar>

                                        <div className={`w-100 ${animation
                                            ? styles.contentAnimation
                                            : styles.donationCycle}`}>
                                            <div className={`${styles.donationInner} ${colCenter}`}>
                                                <h2>Donation Cycle</h2>
                                                <div className={styles.coinTwo}
                                                    ref={coinRef}
                                                    style={coinStyles.current}>
                                                    <Image src="/images/game/coin.png" alt="Coin" width={76} height={76} />
                                                </div>
                                                <div className={`${styles.userDonation} position-relative`} data-index="0">
                                                    <Image src="/images/game/user.png" alt="User" width={149} height={129} />
                                                </div>
                                                <p>
                                                    {donationAmount && donationAmountHandler(contentCreatorFormula)}
                                                </p>
                                            </div>
                                            <Row className={rowHBetween}>
                                                <Col className={`${horizontalAlign} ${styles.heigth120}`}>
                                                    <div className={`${styles.cycle} ${colCenter} ${styles.cycle1} ${styles.donationImage} position-relative`} data-index="1">
                                                        <Avatar color={AvatarType.Green} size={56} />
                                                        <span
                                                            className={
                                                                `${styles.donationAmount}
                                                                ${styles.donationAmount1}`
                                                            }>
                                                            {donationAmountHandler(friendsFormula)}
                                                        </span>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row
                                                className={`
                                                ${styles.donationRow1}
                                                ${styles.marginTopMinusFifty}
                                                ${rowHEnd}`}>
                                                <div className={`${styles.cycle2} ${styles.donationImage} ${styles.cycle} position-relative`} data-index="2">
                                                    {donation(styles.donationAmount2, AvatarType.Red)}
                                                </div>
                                            </Row>
                                            <Row className={`${styles.donationRow2} ${rowHBetween}`}>
                                                <div className={styles.donationLogo}>
                                                    <div>
                                                        <span className="d-block">
                                                            We’re totally reliant on these cents to keep us going.
                                                        </span>
                                                    </div>
                                                    <div className={`${styles.cycle11} ${styles.donationImage} ${styles.cycle} position-relative`} data-index="11">
                                                        <Image src="/images/game/donationCycle/spiffy.png" width={155} height={44} />
                                                        {donationAmountHandler(spiffyFormula)}
                                                    </div>
                                                </div>

                                                <div className={`${styles.cycle3} ${styles.donationImage} ${styles.cycle} position-relative`} data-index="3">
                                                    {donation(styles.donationAmount3, AvatarType.Yellow)}
                                                </div>
                                            </Row>
                                            <Row className={`${styles.donationRow3} ${rowHBetween}`}>
                                                <div className={`${styles.cycle10} ${styles.donationImage} ${styles.cycle} position-relative`} data-index="10">
                                                    {donation(styles.donationAmount10, AvatarType.Green)}
                                                </div>
                                                <div className={`${styles.cycle4} ${styles.donationImage} ${styles.cycle} position-relative`} data-index="4">
                                                    {donation(styles.donationAmount4, AvatarType.Purple)}
                                                </div>
                                            </Row>
                                            <Row className={`${styles.donationRow2} ${rowHBetween}`}>
                                                <div className={`${styles.cycle9} ${styles.donationImage} ${styles.cycle} position-relative`} data-index="9">
                                                    {donation(styles.donationAmount9, AvatarType.Yellow)}
                                                </div>
                                                <div className={`${styles.cycle5} ${styles.donationImage} ${styles.cycle} position-relative`} data-index="5">
                                                    {donation(styles.donationAmount5, AvatarType.Yellow)}
                                                </div>
                                            </Row>
                                            <Row className={`${styles.donationRow1}
                                                    ${styles.marginBottomMinusFifty} 
                                                    ${rowHBetween}`}>
                                                <div className={`${styles.cycle8} ${styles.donationImage} ${styles.cycle} position-relative`} data-index="8">
                                                    {donation(styles.donationAmount8, AvatarType.Red)}
                                                </div>
                                                <div className={`${styles.cycle6} ${styles.donationImage} ${styles.cycle} position-relative`} data-index="6">
                                                    {donation(styles.donationAmount6, AvatarType.Red)}
                                                </div>
                                            </Row>
                                            <Row className={horizontalAlign}>
                                                <div className={`${styles.cycle7} ${styles.donationImage} ${styles.cycle} position-relative`} data-index="7">
                                                    {donation(styles.donationAmount7, AvatarType.Green)}
                                                </div>
                                            </Row>
                                        </div>
                                    </div>
                                </div>
                                {donationAmount
                                    ? <div className={`${styles.card} ${rowCenter}`}>
                                        <GameAvatarList
                                            friends={addedFriends}
                                            seletedAvatar={seletedAvatar}
                                            name={avatarName}
                                            signupAnimation={signupAnimation} />
                                    </div>
                                    : null}
                            </div>
                        </Element>

                        <Element name={StepTypes.Sixth} className={`${styles.card} ${rowCenter}`}>
                            <div className={styles.gameStepSix}>
                                <div className={`${colCenter} ${styles.signUpsection}`}>
                                    <Image src="/images/game/trophy.png" alt="trophy" width={291} height={318} />
                                    <h2 className={`${styles.avatarHeading}`}>Congratulations!</h2>
                                    <PrimaryButton>Sign Up</PrimaryButton>
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
