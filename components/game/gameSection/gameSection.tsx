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
import GameSignup from "../gameSignup/gameSignup";
import IGameSectionProps from "components/game/gameSection/interfaces/IGameSectionProps";
import KeyCSS from "hooks/types/keyCss";
import PrimaryButton from "components/common/primaryButton/primaryButton";
import setViewportHeight from "utils/setViewportHeight";
import StepTypes from "components/game/gameSection/enums/stepTypes";
import useBreakpoint from "hooks/useBreakpoint";
import useStyles from "hooks/useStyles";

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
const friendsSliceStartIndex = 2;
const friendsSliceEndIndex = 4;
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
    const [step, setStep] = React.useState<StepTypes>(StepTypes.ChooseAvatarSection);
    const [avatarName, setAvatarName] = React.useState<string>("");
    const isBreakpoint998 = useBreakpoint(Breakpoints.LG + breakpointPlus);
    const isMD = useBreakpoint(Breakpoints.MD);

    const [avatarStyles, avatarStyleUpdateId, updateAvatarStyle] = useStyles<KeyCSS>();
    const [friendsStyle, friendsStyleUpdateId, updateFriendsStyle] = useStyles<KeyCSS>();

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
            scrollTo(StepTypes.DonationCycleSection);
            timer = setTimeout(() => {
                setStep(StepTypes.DonationCycleSection);
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
        const { left1, left2, top1, top2 } = getAvatarPositions(step1Ref);

        avatars.forEach((avatar) => {
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
        const { left1, left2, top1, top2 } = getAvatarPositions(friendsSectionRef);

        friendsAvatars.forEach((avatar, index) => {
            switch (index) {
                case 0:
                    styles[avatar] = {
                        left: left1,
                        top: top1,
                    };
                    break;
                case 1:
                    styles[avatar] = {
                        left: left2,
                        top: top1,
                    };
                    break;
                case thirdAvatarIndex:
                    styles[avatar] = {
                        left: left1,
                        top: top2,
                    };
                    break;
                case fourthAvatarIndex:
                default:
                    styles[avatar] = {
                        left: left2,
                        top: top2,
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
            updateAvatarStyle({
                [avatar]: {
                    top: bounds.y + modalBodyRef.current.scrollTop,
                    left: bounds.x + modalBodyRef.current.scrollLeft,
                    opacity: "1"
                }
            });
        }
        setSeletedAvatar(avatar);
        setStep(StepTypes.NameAvatarSection);
    }, [updateAvatarStyle]);

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
            updateAvatarStyle(styles);
        }
    }, [getAvatarStyles, updateAvatarStyle]);

    /**
     * Setting styles of friends in third section.
     */
    const setFriendsPositions = React.useCallback(() => {
        const styles = getFriendsStyles();
        if (styles) {
            updateFriendsStyle(styles);
        }
    }, [getFriendsStyles, updateFriendsStyle, friendsStyleUpdateId]);

    /**
     * Section two animation and scroll on continue.
     */
    const handleContinueBtnClick = React.useCallback(() => {
        if (!avatarName) {
            return;
        }

        const t = setTimeout(() => {
            if (step3Ref.current && step === StepTypes.NameAvatarSection) {
                const bounds = step3Ref.current.getBoundingClientRect();
                updateAvatarStyle({
                    [seletedAvatar]: {
                        top: bounds.y + modalBodyRef.current.scrollTop,
                        left: bounds.x + modalBodyRef.current.scrollLeft,
                        opacity: "1",
                        cursor: "initial"
                    }
                });
                /** SetStep to animate scroll to next section */
                setStep(StepTypes.AddFriendsSection);
                setFriendsPositions();
                scrollTo(StepTypes.AddFriendsSection);
            }

            clearTimeout(t);
        }, phoneKeyboardTimeout);
    }, [setFriendsPositions, seletedAvatar, avatarName, step, updateAvatarStyle]);

    /**
     * First section avatars style.
     */
    React.useEffect(() => {
        let avatarTimeout: NodeJS.Timeout;
        /** 
         * checking if step is one and style is already applied for section one avatars
         */
        if (step === StepTypes.ChooseAvatarSection && avatarStyleUpdateId === "0") {
            avatarTimeout = setTimeout(() => {
                setAvatarPositions();
            }, stepOneTimeout);
        }

        return () => {
            clearTimeout(avatarTimeout);
        };
    }, [setAvatarPositions, step, avatarStyleUpdateId]);

    /**
     * Resize function
     */
    const handleResize = React.useCallback(() => {
        switch (step) {
            case StepTypes.ChooseAvatarSection:
                setAvatarPositions();
                break;

            case StepTypes.NameAvatarSection: {
                isMD && setViewportHeight();
                const boundsFirst = step2TargetRef.current?.getBoundingClientRect();
                if (boundsFirst) {
                    updateAvatarStyle({
                        [seletedAvatar]: {
                            top: boundsFirst.y + modalBodyRef.current.scrollTop,
                            left: boundsFirst.x + modalBodyRef.current.scrollLeft,
                            opacity: "1"
                        }
                    });
                }
                break;
            }

            case StepTypes.AddFriendsSection: {
                scrollTo(StepTypes.AddFriendsSection);
                setFriendsPositions();
                const boundsSecond = step3Ref.current?.getBoundingClientRect();
                if (boundsSecond) {
                    updateAvatarStyle({
                        [seletedAvatar]: {
                            top: boundsSecond.y + modalBodyRef.current.scrollTop,
                            left: boundsSecond.x + modalBodyRef.current.scrollLeft,
                            opacity: "1"
                        }
                    });
                }
                break;
            }
        }
    }, [setAvatarPositions, step, seletedAvatar, setFriendsPositions, isMD, updateAvatarStyle]);

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
            ? addedFriends.slice(0, friendsSliceStartIndex)
            : addedFriends.slice(friendsSliceStartIndex, friendsSliceEndIndex);

        const style = isTop ? styles.friendsTop : styles.friendsBottom;

        return <div className={`${style} ${rowHBetween}`}>
            {arrFriends.map((friend, friendKey) =>
                <Avatar color={friend} key={friendKey} />)}
        </div>;
    }, [addedFriends]);

    /** Avatar dynamic classes */
    const getAvatarLinkClasses = React.useMemo(() => {
        const className = `${styles.avatar} position-absolute text-center`;

        switch (step) {
            case StepTypes.NameAvatarSection:
                return `${className} ${styles.avatarSelected}`;

            case StepTypes.AddFriendsSection:
                return `${className} ${styles.avatarFriends}`;

            default:
                return className;
        }
    }, [step]);

    const avatarNameHandler = React.useCallback((e: React.FormEvent<HTMLInputElement>) => {
        setAvatarName(e.currentTarget.value);
    }, [setAvatarName]);

    return (
        <div className={`${colCenter}`}>
            <Modal show={true} fullscreen={true} onHide={props.closeModal}>
                <Modal.Body
                    className={`w-100 overflow-hidden inline-block p-0 ${styles.modalBody}`}
                    id={containerId}
                    ref={modalBodyRef}>
                    <FontAwesomeIcon icon={faTimes} width="30" height="35" onClick={props.closeModal} className={`${styles.close} position-fixed`} />
                    <div className={`w-100 ${rowVCenter}`}>
                        <div className={`${styles.card} ${styles.gameStepTwoWrapper} ${rowCenter}`} ref={step1Ref}>
                            <h2 className={`${styles.avatarHeading}`}>Choose your avatar</h2>
                            {step1Avatars.map((avatar, index) =>
                                <Link
                                    key={index}
                                    style={avatarStyles && avatarStyles[avatar]}
                                    onClick={() => handleAvatarClick(avatar)}
                                    to={StepTypes.NameAvatarSection}
                                    smooth={true}
                                    duration={500}
                                    containerId={containerId}
                                    className={getAvatarLinkClasses}
                                    ignoreCancelEvents={true}
                                    offset={-20}
                                >
                                    <Avatar color={avatar} />
                                </Link>
                            )}
                        </div>

                        <Element name={StepTypes.NameAvatarSection} className={`${styles.card} ${rowCenter}`}>
                            <div className={`${colCenter} ${styles.gameStepTwoWrapper}`}>
                                <h2 className={`${styles.avatarHeading}`}>Name your avatar</h2>
                                <div className={`${colCenter} ${styles.gameStepTwo}`}>
                                    <div className={styles.targetOne} ref={step2TargetRef}></div>
                                    <input
                                        type="text"
                                        placeholder="Enter name"
                                        className="w-100 text-center"
                                        onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                            avatarNameHandler(e);
                                        }}
                                    />
                                    <PrimaryButton onClick={handleContinueBtnClick} className="w-100">
                                        Continue
                                    </PrimaryButton>
                                </div>
                            </div>
                        </Element>

                        <Element
                            name={StepTypes.AddFriendsSection}
                            className={`${styles.card} ${styles.transparent} ${rowCenter}`}>
                            <div className={`${styles.gameStepThree} ${rowHBetween}`}>
                                <div className={`${styles.userColumn} ${colCenter}`}>
                                    <div className={`${styles.userColumnInner} w-100`}>
                                        <h2 className={`${styles.avatarHeading} text-center d-lg-none d-sm-block`}>Add four friends</h2>
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
                                    className={`${styles.friendsColumn} ${rowVCenter}`}
                                    ref={friendsSectionRef}
                                >
                                    <h2 className={`${styles.avatarHeading}`}>Add four friends</h2>
                                    {step === StepTypes.AddFriendsSection
                                        ? <div className={`${styles.percentageWrapper} ${rowVCenter} flex-wrap`}>
                                            {friendsAvatars.map((avatar: AvatarType) => {
                                                if (addedFriends.find((addedAvatar) => addedAvatar === avatar)) {
                                                    return null;
                                                }

                                                return (
                                                    <React.Fragment key={avatar}>
                                                        <div
                                                            className="position-absolute"
                                                            style={friendsStyle && friendsStyle[avatar]}
                                                            onClick={() => addFriends(avatar)}>
                                                            <Avatar color={avatar} />
                                                        </div>
                                                    </React.Fragment>
                                                );
                                            })}
                                        </div>
                                        : null}
                                </div>
                            </div>
                        </Element>

                        <Element name={StepTypes.DonationCycleSection} className="w-100">
                            <GameDonationCycle
                                friends={addedFriends}
                                seletedAvatar={seletedAvatar}
                                name={avatarName} />
                        </Element>

                        <Element name={StepTypes.SignupSection} className={`${styles.card} ${rowCenter}`}>
                            <GameSignup />
                        </Element>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default GameSection;
