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
const friendsSliceindex1 = 2;
const friendsSliceindex2 = 4;
const breakpointPlus = 8;

const avatars = Object.values(AvatarType);
/**
 * First section remove orange avatar.
 */
const step1Avatars = avatars.filter((avatar) => avatar !== AvatarType.Orange);

const scrollTo = (step: StepTypes) => {
    scroller.scrollTo(step, {
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
    const [step, setStep] = React.useState<StepTypes>(StepTypes.chooseAvatarSection);
    const [avatarName, setAvatarName] = React.useState<string>("");
    const isBreakpoint998 = useBreakpoint(Breakpoints.LG + breakpointPlus);
    const isMD = useBreakpoint(Breakpoints.MD);

    const avatarStyles = React.useRef<Record<AvatarType, CSSProperties>>();
    const [avatarStyleGUID, setAvatarStyleGUID] = React.useState("0");
    const friendsStyle = React.useRef<Record<AvatarType, CSSProperties>>();
    const [, setFriendsStyleGUID] = React.useState("0");

    const step1Ref = React.useRef<HTMLDivElement>();
    const step2TargetRef = React.useRef<HTMLDivElement>();
    const step3Ref = React.useRef<HTMLDivElement>();
    const modalBodyRef = React.useRef<HTMLDivElement>();
    const friendsSectionRef = React.useRef<HTMLDivElement>();

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
            scrollTo(StepTypes.donationCycleSection);
            timer = setTimeout(() => {
                setStep(StepTypes.donationCycleSection);
                clearTimeout(timer);
            }, friendsTimeout);
        }

        return () => {
            clearTimeout(timer);
        };
    }, [addedFriends, friendsAvatars, seletedAvatar]);

    const getAvatarPositions = React.useCallback((refrence: React.MutableRefObject<HTMLDivElement>) => {
        if (refrence.current) {
            const mobileAvatar = 90;
            const desktopAvatar = 160;
            const bounds = refrence.current.getBoundingClientRect();
            const avatarSize = isBreakpoint998 ? mobileAvatar : desktopAvatar;
            const cardMidPointX = (bounds.x + bounds.right) / boundDivide;
            const cardMidPointY = (bounds.y + bounds.bottom) / boundDivide;
            const space = 10;
            const left1 = Math.abs(cardMidPointX - avatarSize);
            const left2 = Math.abs(cardMidPointX + space);
            const top1 = Math.abs(cardMidPointY - avatarSize - space) + modalBodyRef.current.scrollTop;
            const top2 = Math.abs(cardMidPointY + space) + modalBodyRef.current.scrollTop;

            return { left1, left2, top1, top2 };
        }
    }, [isBreakpoint998]);

    /**
     * Get styles of avatars in first section.
     */
    const getAvatarStyles = React.useCallback(() => {
        const styles = {} as Record<AvatarType, CSSProperties>;

        avatars.forEach((avatar) => {
            const left1 = getAvatarPositions(step1Ref).left1;
            const top1 = getAvatarPositions(step1Ref).top1;
            const left2 = getAvatarPositions(step1Ref).left2;
            const top2 = getAvatarPositions(step1Ref).top2;

            switch (avatar) {
                case AvatarType.Green:
                    styles[avatar] = {
                        left: left1,
                        top: top1,
                        opacity: "1",
                    };
                    break;
                case AvatarType.Red:
                    styles[avatar] = {
                        left: left2,
                        top: top1,
                        opacity: "1",
                    };
                    break;
                case AvatarType.Yellow:
                    styles[avatar] = {
                        left: left1,
                        top: top2,
                        opacity: "1",
                    };
                    break;
                case AvatarType.Purple:
                default:
                    styles[avatar] = {
                        left: left2,
                        top: top2,
                        opacity: "1",
                    };
                    break;
            }
        });

        return styles;
    }, [getAvatarPositions]);

    /**
     * Get styles of fiends avatars in third section.
     */
    const getFriendsStyles = React.useCallback(() => {
        const styles = {} as Record<AvatarType, CSSProperties>;
        const thirdAvatarIndex = 2;
        const fourthAvatarIndex = 3;

        friendsAvatars.forEach((avatar, index) => {
            switch (index) {
                case 0:
                    styles[avatar] = {
                        left: getAvatarPositions(friendsSectionRef).left1,
                        top: getAvatarPositions(friendsSectionRef).top1,
                    };
                    break;
                case 1:
                    styles[avatar] = {
                        left: getAvatarPositions(friendsSectionRef).left2,
                        top: getAvatarPositions(friendsSectionRef).top1,
                    };
                    break;
                case thirdAvatarIndex:
                    styles[avatar] = {
                        left: getAvatarPositions(friendsSectionRef).left1,
                        top: getAvatarPositions(friendsSectionRef).top2,
                    };
                    break;
                case fourthAvatarIndex:
                default:
                    styles[avatar] = {
                        left: getAvatarPositions(friendsSectionRef).left2,
                        top: getAvatarPositions(friendsSectionRef).top2,
                    };
                    break;
            }
        });

        return styles;
    }, [friendsAvatars, getAvatarPositions]);

    /**
     * Section one animation and scroll on selecting avatar.
     * @param avatar user selected avatar in first section.
     */
    const handleAvatarClick = React.useCallback((avatar: AvatarType) => {
        if (step2TargetRef.current) {
            const bounds = step2TargetRef.current.getBoundingClientRect();
            avatarStyles.current = {
                ...avatarStyles.current,
                [avatar]: {
                    top: bounds.y + modalBodyRef.current.scrollTop,
                    left: bounds.x + modalBodyRef.current.scrollLeft,
                    opacity: "1"
                }
            };
            setAvatarStyleGUID(getUniqueId());
        }
        setSeletedAvatar(avatar);
        setStep(StepTypes.nameAvatarSection);
    }, []);

    /**
     * Filter selected friends from avatars.
     * @param friendAvatar user selected friends.
     */
    const addFriends = React.useCallback((friendAvatar: AvatarType) => {
        if (step3Ref.current) {
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
        const styles = getFriendsStyles();
        if (styles) {
            friendsStyle.current = { ...friendsStyle.current, ...styles };
            setFriendsStyleGUID(getUniqueId());
        }
    }, [getFriendsStyles]);

    /**
     * Section two animation and scroll on continue.
     */
    const handleContinueBtnClick = React.useCallback(() => {
        if (!avatarName) {
            return;
        }

        const t = setTimeout(() => {
            if (step3Ref.current && step === StepTypes.nameAvatarSection) {
                const bounds = step3Ref.current.getBoundingClientRect();
                avatarStyles.current = {
                    ...avatarStyles.current,
                    [seletedAvatar]: {
                        top: bounds.y + modalBodyRef.current.scrollTop,
                        left: bounds.x + modalBodyRef.current.scrollLeft,
                        opacity: "1",
                        cursor: "initial"
                    }
                };
                setAvatarStyleGUID(getUniqueId());
                /** SetStep to animate scroll to next section */
                setStep(StepTypes.addFriendsSection);
                setFriendsPositions();
                scrollTo(StepTypes.addFriendsSection);
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
        if (step === StepTypes.chooseAvatarSection && avatarStyleGUID === "0") {
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
            case StepTypes.chooseAvatarSection:
                setAvatarPositions();
                break;

            case StepTypes.nameAvatarSection: {
                isMD && setViewportHeight();
                const boundsFirst = step2TargetRef.current?.getBoundingClientRect();
                if (boundsFirst) {
                    avatarStyles.current = {
                        ...avatarStyles.current,
                        [seletedAvatar]: {
                            top: boundsFirst.y + modalBodyRef.current.scrollTop,
                            left: boundsFirst.x + modalBodyRef.current.scrollLeft,
                            opacity: "1"
                        }
                    };
                    setAvatarStyleGUID(getUniqueId());
                }
                break;
            }

            case StepTypes.addFriendsSection: {
                scrollTo(StepTypes.addFriendsSection);
                setFriendsPositions();
                const boundsSecond = step3Ref.current?.getBoundingClientRect();

                if (boundsSecond) {
                    avatarStyles.current = {
                        ...avatarStyles.current,
                        [seletedAvatar]: {
                            top: boundsSecond.y + modalBodyRef.current.scrollTop,
                            left: boundsSecond.x + modalBodyRef.current.scrollLeft,
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
            ? addedFriends.slice(0, friendsSliceindex1)
            : addedFriends.slice(friendsSliceindex1, friendsSliceindex2);

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
            case StepTypes.nameAvatarSection:
                return `${className} ${styles.avatarSelected}`;

            case StepTypes.addFriendsSection:
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
                    ref={modalBodyRef}>
                    <FontAwesomeIcon icon={faTimes} width="30" height="35" onClick={props.closeModal} className={styles.close} />
                    <div className={`w-100 ${rowVCenter}`}>
                        <div className={`${styles.card} ${styles.gameStepTwoWrapper} ${rowCenter}`} ref={step1Ref}>
                            <h2 className={`${styles.avatarHeading}`}>Choose your avatar</h2>
                            {step1Avatars.map((avatar, index) =>
                                <Link
                                    key={index}
                                    style={avatarStyles.current && avatarStyles.current[avatar]}
                                    onClick={() => handleAvatarClick(avatar)}
                                    to={StepTypes.nameAvatarSection}
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

                        <Element name={StepTypes.nameAvatarSection} className={`${styles.card} ${rowCenter}`}>
                            <div className={`${colCenter} ${styles.gameStepTwoWrapper}`}>
                                <h2 className={`${styles.avatarHeading}`}>Name your avatar</h2>
                                <div className={`${colCenter} ${styles.gameStepTwo}`}>
                                    <div className={styles.targetOne} ref={step2TargetRef}></div>
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

                        <Element name={StepTypes.addFriendsSection} className={`${styles.card} ${styles.transparent} ${rowCenter}`}>
                            <div className={`${styles.gameStepThree} ${rowHBetween}`}>
                                <div className={`${styles.gameStepThreeUserColumn} ${colCenter}`}>
                                    <div className={`${styles.gameStepTwo} w-100`}>
                                        <h2 className={`${styles.avatarHeading} text-center`}>Add four friends</h2>
                                        <Row className={`${horizontalAlign} w-100 m-0`}>
                                            {renderAddedFriends(true)}
                                        </Row>
                                        <Row className={`${horizontalAlign} w-100 m-0`}>
                                            <div className={styles.targetTwo} ref={step3Ref}></div>
                                        </Row>
                                        <Row className={`${horizontalAlign} w-100 m-0`}>
                                            {renderAddedFriends(false)}
                                        </Row>

                                        <h3 className="text-center">{avatarName}</h3>
                                    </div>
                                </div>
                                <div
                                    className={`${styles.gameStepThreeFriendsColumn} ${rowVCenter}`}
                                    ref={friendsSectionRef}>
                                    <h2 className={styles.avatarHeading}>Add four friends</h2>
                                    {step === StepTypes.addFriendsSection
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

                        <Element name={StepTypes.donationCycleSection} className="w-100">
                            <GameDonationCycle
                                friends={addedFriends}
                                seletedAvatar={seletedAvatar}
                                name={avatarName}
                                setAvatarStyleGUID={setAvatarStyleGUID} />
                        </Element>

                        <Element name={StepTypes.signupSection} className={`${styles.card} ${rowCenter}`}>
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
