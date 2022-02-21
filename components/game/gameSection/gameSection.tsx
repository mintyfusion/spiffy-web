import { Element, Link, scroller } from "react-scroll";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import React, { CSSProperties } from "react";

import Avatar from "components/game/avatar/gameAvatar";
import Breakpoints from "common/style/breakpoints";
import flexbox from "utils/flexbox";
import GameDonationCycle from "components/game/gameDonationCycle/gameDonationCycle";
import GamePageAvatarType from "components/game/gameSection/enums/GamePageAvatarTypes";
import GamePageStepTypes from "components/game/gameSection/enums/gamePageStepTypes";
import GameSignup from "components/game/gameSignup/gameSignup";
import IGameSectionProps from "components/game/gameSection/interfaces/IGameSectionProps";
import KeyCSS from "hooks/types/keyCSS";
import PrimaryButton from "components/common/primaryButton/primaryButton";
import setViewportHeight from "utils/setViewportHeight";
import useBreakpoint from "hooks/useBreakpoint";
import useStyles from "hooks/useStyles";

import styles from "components/game/gameSection/gameSection.module.scss";

const colCenter = flexbox({ vertical: true, hAlign: "center", vAlign: "center" });
const rowCenter = flexbox({ hAlign: "center", vAlign: "center" });
const rowHCenter = flexbox({ hAlign: "center" });
const rowHBetween = flexbox({ hAlign: "between" });
const colVCenter = flexbox({ vAlign: "center", vertical: true, });
const friendsTimeout = 2000;
const boundDivide = 2;
const containerId = "containerElement";
const phoneKeyboardTimeout = 500;
const stepOneTimeout = 500;
const friendsSliceStartIndex = 2;
const friendsSliceEndIndex = 4;
const breakpointPlus = 8;

const avatars = Object.values(GamePageAvatarType);

/**
 * Removing orange avatar from the avatars to display on first step.
 */
const step1Avatars = avatars.filter((avatar) => avatar !== GamePageAvatarType.Orange);

const scrollTo = (step: GamePageStepTypes) => {
    scroller.scrollTo(step, {
        duration: 700,
        smooth: true,
        containerId,
        ignoreCancelEvents: true,
        offset: -20,
    });
};

const GameSection = (props: IGameSectionProps): JSX.Element => {
    const [addedFriends, setAddedFriends] = React.useState<GamePageAvatarType[]>([]);
    const [seletedAvatar, setSeletedAvatar] = React.useState<GamePageAvatarType>();
    const [step, setStep] = React.useState<GamePageStepTypes>(GamePageStepTypes.ChooseAvatarSection);
    const [avatarName, setAvatarName] = React.useState<string>("");
    const isBreakpoint998 = useBreakpoint(Breakpoints.LG + breakpointPlus);
    const isMD = useBreakpoint(Breakpoints.MD);

    const [avatarStyles, avatarStyleUpdateId, updateAvatarStyle] = useStyles<KeyCSS>();
    const [friendsStyle, , updateFriendsStyle] = useStyles<KeyCSS>();

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
            scrollTo(GamePageStepTypes.DonationCycleSection);
            timer = setTimeout(() => {
                setStep(GamePageStepTypes.DonationCycleSection);
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
        const styles = {} as Record<GamePageAvatarType, CSSProperties>;
        const { left1, left2, top1, top2 } = getAvatarPositions(step1Ref);

        avatars.forEach((avatar) => {
            switch (avatar) {
                case GamePageAvatarType.Green:
                    styles[avatar] = {
                        left: left1,
                        top: top1,
                        opacity: "1",
                    };
                    break;
                case GamePageAvatarType.Red:
                    styles[avatar] = {
                        left: left2,
                        top: top1,
                        opacity: "1",
                    };
                    break;
                case GamePageAvatarType.Yellow:
                    styles[avatar] = {
                        left: left1,
                        top: top2,
                        opacity: "1",
                    };
                    break;
                case GamePageAvatarType.Purple:
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
        const styles = {} as Record<GamePageAvatarType, CSSProperties>;
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
    const handleAvatarClick = React.useCallback((avatar: GamePageAvatarType) => {
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
        setStep(GamePageStepTypes.NameAvatarSection);
    }, [updateAvatarStyle]);

    /**
     * Filter selected friends from avatars.
     * @param friendAvatar user selected friends.
     */
    const addFriends = React.useCallback((friendAvatar: GamePageAvatarType) => {
        if (step3Ref.current) {
            const selectedFriends: GamePageAvatarType[] = friendsAvatars.filter((avatar) => avatar == friendAvatar);
            setAddedFriends((currentFriends: GamePageAvatarType[]) => [...currentFriends, ...selectedFriends]);
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
    }, [getFriendsStyles, updateFriendsStyle]);

    /**
     * Section two animation and scroll on continue.
     */
    const handleContinueBtnClick = React.useCallback(() => {
        if (!avatarName) {
            return;
        }

        const t = setTimeout(() => {
            if (step3Ref.current && step === GamePageStepTypes.NameAvatarSection) {
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
                setStep(GamePageStepTypes.AddFriendsSection);
                setFriendsPositions();
                scrollTo(GamePageStepTypes.AddFriendsSection);
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
        if (step === GamePageStepTypes.ChooseAvatarSection && avatarStyleUpdateId === "0") {
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
            case GamePageStepTypes.ChooseAvatarSection:
                setAvatarPositions();
                break;

            case GamePageStepTypes.NameAvatarSection: {
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

            case GamePageStepTypes.AddFriendsSection: {
                scrollTo(GamePageStepTypes.AddFriendsSection);
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
            case GamePageStepTypes.NameAvatarSection:
                return `${className} ${styles.avatarSelected}`;

            case GamePageStepTypes.AddFriendsSection:
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
                    ref={modalBodyRef}
                >
                    <FontAwesomeIcon icon={faTimes} width="30" height="35" onClick={props.closeModal} className={`${styles.close} position-fixed`} />
                    <div className={`w-100 ${colVCenter}`}>
                        <div className={`${styles.card} ${styles.gameStepTwoWrapper} ${rowHCenter}`} ref={step1Ref}>
                            <h2 className={`${styles.avatarHeading}`}>Choose your avatar</h2>
                            {step1Avatars.map((avatar, index) =>
                                <Link
                                    key={index}
                                    style={avatarStyles && avatarStyles[avatar]}
                                    onClick={() => handleAvatarClick(avatar)}
                                    to={GamePageStepTypes.NameAvatarSection}
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

                        <Element name={GamePageStepTypes.NameAvatarSection} className={`${styles.card} ${rowHCenter}`}>
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
                            name={GamePageStepTypes.AddFriendsSection}
                            className={`${styles.card} ${styles.transparent} ${rowHCenter}`}>
                            <div className={`${styles.gameStepThree} ${rowHBetween}`}>
                                <div className={`${styles.userColumn} ${colCenter}`}>
                                    <div className={`${styles.userColumnInner} w-100`}>
                                        <h2 className={`${styles.avatarHeading} text-center d-lg-none d-sm-block`}>
                                            Add four friends
                                        </h2>
                                        <Row className={`${rowCenter} w-100 m-0`}>
                                            {renderAddedFriends(true)}
                                        </Row>
                                        <Row className={`${rowCenter} w-100 m-0`}>
                                            <div className={styles.targetTwo} ref={step3Ref}></div>
                                        </Row>
                                        <Row className={`${rowCenter} w-100 m-0`}>
                                            {renderAddedFriends(false)}
                                        </Row>

                                        <h3 className="text-center">{avatarName}</h3>
                                    </div>
                                </div>
                                <div
                                    className={`${styles.friendsColumn} ${colVCenter}`}
                                    ref={friendsSectionRef}
                                >
                                    <h2 className={`${styles.avatarHeading}`}>Add four friends</h2>
                                    {step === GamePageStepTypes.AddFriendsSection
                                        ? <div className={`${styles.percentageWrapper} ${colVCenter} flex-wrap`}>
                                            {friendsAvatars.map((avatar: GamePageAvatarType) => {
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

                        <Element name={GamePageStepTypes.DonationCycleSection} className="w-100">
                            <GameDonationCycle
                                friends={addedFriends}
                                seletedAvatar={seletedAvatar}
                                name={avatarName} />
                        </Element>

                        <Element name={GamePageStepTypes.SignupSection} className={`${styles.card} ${rowHCenter}`}>
                            <GameSignup />
                        </Element>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default GameSection;
