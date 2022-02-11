import { Element, Link, scroller } from "react-scroll";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row } from "react-bootstrap";
import Image from "next/image";
import Modal from "react-bootstrap/Modal";
import React, { CSSProperties } from "react";

import Avatar from "components/game/avatar/gameAvatar";
import AvatarType from "components/game/gameSection/enums/avatarTypes";
import Breakpoints from "common/style/breakpoints";
import flexbox from "utils/flexbox";
import GameDonationCycle from "components/game/gameDonationCycle/gameDonationCycle";
import getUniqueId from "utils/getUniqueId";
import IGameSectionProps from "components/game/gameSection/interfaces/IGameSectionProps";
import PrimaryButton from "components/common/primaryButton/primaryButton";
import setViewportHeight from "utils/setViewportHeight";
import StepTypes from "components/game/gameSection/enums/stepTypes";
import useBreakpoint from "hooks/useBreakpoint";

import styles from "components/game/gameSection/gameSection.module.scss";

const colCenter = flexbox({ vertical: true, hAlign: "center", vAlign: "center" });
const horizontalAlign = flexbox({ hAlign: "center", vAlign: "center" });
const rowCenter = flexbox({ hAlign: "center" });
const rowHBetween = flexbox({ hAlign: "between" });
const rowVCenter = flexbox({ vAlign: "center", vertical: true, });
const friendsTimeout = 2000;
const boundDivide = 2;
const containerId = "containerElement";
const phoneKeyboardTimeout = 500;
const stepOneTimeout = 500;
const friendsSliceTwo = 2;
const friendsSliceFour = 4;
const breakpointPlus = 8;

const avatars = Object.values(AvatarType);
/**
 * First section remove orange avatar.
 */
const step1Avatars = avatars.filter((avatar) => avatar !== AvatarType.Orange);

const scrollTo = (value: string) => {
    scroller.scrollTo(value, {
        duration: 700,
        smooth: true,
        containerId,
        ignoreCancelEvents: true,
        offset: -20,
    });
};

const GameSection = (props: IGameSectionProps): JSX.Element => {
    const [addedFriends, setAddedFriends] = React.useState<AvatarType[]>([]);
    const [seletedAvatar, setSeletedAvatar] = React.useState<AvatarType>();
    const [step, setStep] = React.useState<StepTypes>(StepTypes.First);
    const [avatarName, setAvatarName] = React.useState<string>("");
    const isLG = useBreakpoint(Breakpoints.LG + breakpointPlus);
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

    /**
     * Filter avatars array with user selected avatar for friends.
     */
    const friendsAvatars = React.useMemo(() => avatars.filter((avatarObj) =>
        seletedAvatar && avatarObj !== seletedAvatar
    ), [seletedAvatar]);

    /**
     * UseEffect to check all four friends are added.
     */
    React.useEffect(() => {
        let timer: NodeJS.Timeout;
        if (seletedAvatar && addedFriends.length === friendsAvatars.length) {
            scrollTo(StepTypes.Fourth);
            /*eslint-env browser*/
            timer = setTimeout(() => {
                setStep(StepTypes.Fourth);
                clearTimeout(timer);
            }, friendsTimeout);
        }

        return () => {
            clearTimeout(timer);
        };
    }, [addedFriends, friendsAvatars, seletedAvatar]);

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

        friendsAvatars.forEach((avatar, index) => {
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
    const addFriends = React.useCallback((friendAvatar: AvatarType) => {
        if (stepThree.current) {
            const selectedFriends: AvatarType[] = friendsAvatars.filter((avatar) => avatar == friendAvatar);
            setAddedFriends((currentFriends: AvatarType[]) => [...currentFriends, ...selectedFriends]);
        }
    }, [friendsAvatars]);

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
                scrollTo(StepTypes.Third);
                clearTimeout(t);
            }

            clearTimeout(t);
        }, phoneKeyboardTimeout);
    }, [setFriendsPositions, seletedAvatar, avatarName, step]);

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
                scrollTo(StepTypes.Third);
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
    }, [setAvatarPositions, step, seletedAvatar, setFriendsPositions, isMD]);

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

    /** Render added friends */
    const renderAddedFriends = React.useCallback((isTop: boolean) => {
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

    /** Avatar dynamic classes */
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
        <div className={`${colCenter}`}>
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
                                        onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                            setAvatarName(e.currentTarget.value);
                                        }}
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
                                    <div className={`${styles.gameStepTwo} w-100`}>
                                        <h2 className={`${styles.avatarHeading} text-center`}>Add four friends</h2>
                                        <Row className={`${horizontalAlign} w-100 m-0`}>
                                            {renderAddedFriends(true)}
                                        </Row>
                                        <Row className={`${horizontalAlign} w-100 m-0`}>
                                            <div className={styles.targetTwo} ref={stepThree}></div>
                                        </Row>
                                        <Row className={`${horizontalAlign} w-100 m-0`}>
                                            {renderAddedFriends(false)}
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
                                                            onClick={() => addFriends(avatar)}>
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
                            <GameDonationCycle
                                friends={addedFriends}
                                seletedAvatar={seletedAvatar}
                                name={avatarName}
                                setAvatarStyleGUID={setAvatarStyleGUID} />
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
