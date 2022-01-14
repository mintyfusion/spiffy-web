import { Element, Link, scroller } from "react-scroll";
import Avatar from "../avatar/avatar";
import AvatarType from "./enums/avatarTypes";
import data from "components/game/gameSection/gameSectionContent";
import flexbox from "utils/flexbox";
import GameAvatarList from "components/game/gameAvatarList/gameAvatarList";
import IAvatar from "components/game/gameSection/interfaces/IAvatar";
import Image from "next/image";
import Modal from "react-bootstrap/Modal";
import React, { CSSProperties } from "react";
import StepTypes from "./enums/stepTypes";
import styles from "components/game/gameSection/gameSection.module.scss";

const colCenter = flexbox({ vertical: true, hAlign: "center", vAlign: "center" });
const rowHBetween = flexbox({ hAlign: "between" });
const rowHCenter = flexbox({ vAlign: "center", vertical: true, });
const donation: string[] = ["5", "10", "15", "25", "50"];
const donationDivide = 2;
const friendsTimeout = 5000;
const avatarTimeout = 1000;
const donationFormula = 5;
const boundDivide = 2;
const friendsLength = 4;
const firstSectionTime = 500;

const GameSection = (): JSX.Element => {
    const [friends, setFriends] = React.useState<IAvatar[]>([]);
    const [seletedAvatar, setSeletedAvatar] = React.useState<IAvatar>();
    const [selected, setSelected] = React.useState<AvatarType>();
    const [step, setStep] = React.useState<StepTypes>(StepTypes.One);
    const [avatarName, setAvatarName] = React.useState<string>("");
    const [donationAmount, setDonationAmount] = React.useState<string>("");
    const [animation, setAnimation] = React.useState<boolean>(false);
    const [avatatStyles, setAvatatStyles] = React.useState<Record<AvatarType, CSSProperties> | undefined>();
    const [friendsStyle, setFriendsStyle] = React.useState<Record<AvatarType, CSSProperties> | undefined>();
    const [freindsCount, setFriendsCount] = React.useState<number>(0);
    const [show, setShow] = React.useState<boolean>(false);

    const start = React.createRef<HTMLDivElement>();
    const target = React.useRef<HTMLDivElement>();
    const stepThree = React.useRef<HTMLDivElement>();
    const fullscreen = React.useRef<HTMLDivElement>();
    const friendsRef = React.useRef<HTMLDivElement>();

    React.useEffect(() => {
        let timer: NodeJS.Timeout;
        if (freindsCount === friendsLength) {
            scroller.scrollTo(StepTypes.Four, {
                duration: 700,
                smooth: true,
                containerId: "containerElement",
                delay: 2000,
                ignoreCancelEvents: true
            });
            timer = setTimeout(() => {
                setStep(StepTypes.Four);
                clearTimeout(timer);
            }, friendsTimeout);
        }

        return () => clearTimeout(timer);
    }, [freindsCount]);

    const animationHandler = React.useCallback((donation: string) => {
        if (donation !== donationAmount) {
            scroller.scrollTo(StepTypes.Five, {
                duration: 700,
                smooth: true,
                containerId: "containerElement",
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
    }, [start]);

    const getFriendsStyle = React.useCallback(() => {
        if (friendsRef.current) {
            const bounds = friendsRef.current.getBoundingClientRect();
            const mobile = 768;
            const mobileAvatar = 90;
            const desktopAvatar = 160;
            const avatarSize = window.innerWidth > mobile ? desktopAvatar : mobileAvatar;
            const cardMidPointX = (bounds.x + bounds.right) / boundDivide;
            const cardMidPointY = (bounds.y + bounds.bottom) / boundDivide;
            const space = 20;
            const left1 = Math.abs(cardMidPointX - avatarSize);
            const left2 = Math.abs(cardMidPointX + space);
            const top1 = Math.abs(cardMidPointY - avatarSize - space) + fullscreen.current.scrollTop;
            const top2 = Math.abs(cardMidPointY - space) + fullscreen.current.scrollTop;

            const styles = {} as Record<AvatarType, CSSProperties>;
            const keyTwo = 2;
            const keyThree = 3;

            Object.entries(AvatarType).filter(([filter]) => filter !== selected).forEach(([value], index) => {
                switch (index) {
                    case 0:
                        styles[value] = {
                            left: left1,
                            top: top1,
                        };
                        break;
                    case 1:
                        styles[value] = {
                            left: left2,
                            top: top1,
                        };
                        break;
                    case keyTwo:
                        styles[value] = {
                            left: left1,
                            top: top2,
                        };
                        break;
                    case keyThree:
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
    }, [selected]);

    const handleBtnClick = React.useCallback((avatar: AvatarType) => {
        if (target.current) {
            const bounds = target.current.getBoundingClientRect();
            setAvatatStyles({
                ...avatatStyles, [avatar]: {
                    top: bounds.y + fullscreen.current.scrollTop,
                    left: bounds.x + fullscreen.current.scrollLeft,
                }
            });

        }
        const Avatar = data.filter((filter) => filter.id === avatar);
        setFriends(data.filter((filter) => filter.id !== avatar));
        setSelected(avatar);
        setSeletedAvatar(Avatar[0]);
        setStep(StepTypes.Two);
    }, [avatatStyles]);

    const friendsAnimation = React.useCallback((index: number, value: AvatarType) => {
        if (stepThree.current) {
            const width = window.innerWidth;
            setFriendsCount(freindsCount + 1);
            const mobile = 768;
            const desktopSmall = 1350;
            const mobileTop = 20;
            const desktopTop = 40;
            const desktopSmallTop = 25;
            const mobileTop2 = 50;
            const desktopTop2 = 80;
            const mobileLeft = 45;
            const desktopLeft = 90;
            const desktopSmallLeft = 65;
            const mobileLeft2 = 70;
            const desktopleft2 = 115;

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
            switch (index) {
                case 0:
                    setFriendsStyle({
                        ...friendsStyle, [value]: {
                            top,
                            left,
                        }
                    });
                    break;
                case 1:
                    setFriendsStyle({
                        ...friendsStyle, [value]: {
                            top,
                            left: left2,
                        }
                    });
                    break;
                case keyTwo:
                    setFriendsStyle({
                        ...friendsStyle, [value]: {
                            top: top2,
                            left,
                        }
                    });
                    break;
                case keyThree:
                    setFriendsStyle({
                        ...friendsStyle, [value]: {
                            top: top2,
                            left: left2,
                        }
                    });
                    break;
            }
        }
    }, [friendsStyle, freindsCount]);

    const setAvatarPositions = React.useCallback(() => {
        const styles = getStyles();
        if (styles) {
            setAvatatStyles(styles);
        }
    }, [getStyles]);

    const setFriendsPositions = React.useCallback(() => {
        const styles = getFriendsStyle();
        if (styles) {
            setFriendsStyle({ ...friendsStyle, ...styles });
        }
    }, [getFriendsStyle, friendsStyle]);

    const handleBtnClick2 = React.useCallback((avatar: AvatarType) => {
        if (stepThree.current && step === StepTypes.Two) {
            const bounds = stepThree.current.getBoundingClientRect();
            setAvatatStyles({
                ...avatatStyles, [avatar]: {
                    top: bounds.y + fullscreen.current.scrollTop,
                    left: bounds.x + fullscreen.current.scrollLeft,
                }
            });
            setStep(StepTypes.Three);
            setFriendsPositions();
        }
    }, [avatatStyles, setFriendsPositions]);

    React.useEffect(() => {
        if (step === StepTypes.One) {
            const timer: NodeJS.Timeout = setTimeout(() => {
                setAvatarPositions();
                clearTimeout(timer);
            }, firstSectionTime);

            return () => clearTimeout(timer);
        }

    }, [setAvatarPositions, step]);

    const signupAnimation = React.useCallback(() => {
        scroller.scrollTo(StepTypes.Six, {
            duration: 700,
            smooth: true,
            containerId: "containerElement",
            delay: 2000,
            ignoreCancelEvents: true
        });
    }, []);

    const handleResize = React.useCallback(() => {
        switch (step) {
            case StepTypes.One:
                setAvatarPositions();
                break;
            case StepTypes.Two:
                const boundsFirst = target.current?.getBoundingClientRect();
                if (boundsFirst) {
                    setAvatatStyles({
                        ...avatatStyles, [selected]: {
                            top: boundsFirst.y + fullscreen.current.scrollTop,
                            left: boundsFirst.x + fullscreen.current.scrollLeft,
                        }
                    });
                }
                break;
            case StepTypes.Three:
            default:
                setFriendsPositions();
                const boundsSecond = stepThree.current?.getBoundingClientRect();

                if (boundsSecond) {
                    setAvatatStyles({
                        ...avatatStyles, [selected]: {
                            top: boundsSecond.y + fullscreen.current.scrollTop,
                            left: boundsSecond.x + fullscreen.current.scrollLeft,
                        }
                    });
                }

                break;
        }
    }, [setAvatarPositions, step, avatatStyles, selected]);

    React.useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [handleResize]);

    return (
        <div className={`${colCenter} ${styles.wrapper}`}>
            <button onClick={() => setShow(true)}>Fullscreen</button>
            <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
                <Modal.Body style={{ overflow: "hidden", backgroundColor: "#f2f2f2", width: "100%", padding: "0px" }} id="containerElement" ref={fullscreen}>
                    <div className={styles.container}>
                        <div className={styles.card} ref={start}>
                            <h2 className={`${styles.avatarHeading}`}>Choose your Avatar.</h2>
                            {Object.entries(AvatarType)
                                .filter(([filter]) => filter !== AvatarType.Orange)
                                .map(([key, value]) =>
                                    <Link
                                        key={key}
                                        style={{
                                            ...avatatStyles && avatatStyles[value],
                                        }}
                                        onClick={() => handleBtnClick(value)}
                                        to={StepTypes.Two}
                                        smooth={true}
                                        duration={700}
                                        containerId="containerElement"
                                        className={styles.avatar}
                                        ignoreCancelEvents={true}
                                        offset={-20}
                                    >
                                        <Avatar color={value} />
                                    </Link>
                                )}
                        </div>

                        <Element name={StepTypes.Two} className={styles.card}>
                            <div className={`${colCenter} ${styles.gameStepTwoWrapper}`}>
                                <h2 className={`${styles.avatarHeading}`}>Name your avatar.</h2>
                                <div className={`${colCenter} ${styles.gameStepTwo}`}>
                                    <div className={styles.targetOne} ref={target}></div>
                                    <input placeholder="Name" className="w-100 text-center" onChange={(e) => setAvatarName(e.target.value)} />
                                    <Link
                                        to={StepTypes.Three}
                                        smooth={true}
                                        duration={700}
                                        containerId="containerElement"
                                        ignoreCancelEvents={true}>
                                        <button disabled={avatarName === ""} onClick={() => {
                                            handleBtnClick2(selected);
                                        }}>
                                            Continue
                                        </button>
                                    </Link>
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
                                            {Object.entries(AvatarType)
                                                .filter(([filter]) => filter !== selected)
                                                .map(([key, value], index) =>
                                                    <div
                                                        key={key}
                                                        style={{
                                                            ...friendsStyle && friendsStyle[value],
                                                        }}
                                                        onClick={() => friendsAnimation(index, value)}
                                                    >
                                                        <Avatar color={value} />
                                                    </div>
                                                )}
                                        </div> : null}
                                </div>
                            </div>
                        </Element>

                        <Element name={StepTypes.Four} className={styles.donationSections}>
                            <div className={styles.card}>
                                <div className={`${rowHCenter} ${styles.stepFour}`}>
                                    <h2 className={`${styles.avatarHeading}`}>How much do you want to donate?</h2>
                                    <h4>Add donation in increments of $5 and discover where the donation is going.</h4>
                                    <div className={`${styles.donationDesktop}`}>
                                        <div className={`${rowHBetween}`}>
                                            {donation.map((donation, donationKey) => <div key={donationKey} className={`${styles.donations} ${donationAmount === donation ? styles.donationActive : ""}`}
                                                onClick={() => {
                                                    setDonationAmount(donation);
                                                    animationHandler(donation);
                                                }}>
                                                <h4>{donation}</h4>
                                            </div>)}
                                        </div>
                                    </div>
                                    <div className={"d-sm-none w-100"}>
                                        <div className={`${rowHBetween}`}>
                                            <select onChange={(e) => {
                                                setDonationAmount(e.target.value);
                                                animationHandler(e.target.value);
                                            }}>
                                                {donation.map((donation, donationKey) =>
                                                    <option key={donationKey}>{donation}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className={`${styles.donationInner} ${colCenter} ${animation ? styles.contentAnimation : ""}`}>
                                        <h2>Donation Cycle</h2>
                                        <div className={`${animation ? styles.coin : styles.coinDefault}`}>
                                            <Image src={"/images/Game/coin.png"} alt="Coin" width={76} height={76} />
                                        </div>
                                        <div className={styles.userDonation}>
                                            <Image src={"/images/Game/user.png"} alt="User" width={149} height={129} />
                                        </div>
                                        <p>${Number(donationAmount) / donationDivide}</p>
                                        <h3>Content Creators</h3>
                                    </div>
                                    {animation ?
                                        <div className={`${animation ? styles.animationGrid : ""} position-relative`}>
                                            <div className={styles.donationCycleItems}>
                                                <Image src={"/images/Game/donationCycle/avatarPurple.png"} width={56} height={63} />
                                                <span>$0.50</span>
                                                <h3 className="position-absolute">Early Adapters</h3>
                                            </div>
                                            {data.concat(friends).map((i, k) => (
                                                <div className={styles.donationCycleItems} key={k}>
                                                    <Image {...i.image} width={56} height={63} />
                                                    <span>
                                                        ${Number(donationAmount) / donationFormula / donationFormula}0
                                                    </span>
                                                </div>
                                            ))}
                                            <div>
                                                <div className={styles.animationText}>
                                                    <h2>Spiffy Corp.</h2>
                                                    <p>We’re totally reliant on this cents to keep us going.</p>
                                                </div>
                                                <div className={styles.donationCycleItems}>
                                                    <Image src={"/images/Game/donationCycle/spiffy.png"} width={156} height={45} />
                                                    <span>$0.50</span>
                                                </div>
                                            </div>
                                        </div> :
                                        null}
                                </div>
                            </div>
                            {donationAmount ?
                                <div className={styles.card}>
                                    <GameAvatarList
                                        friends={friends}
                                        selected={seletedAvatar}
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
                    </div></Modal.Body>
            </Modal>
        </div>
    );
};
export default GameSection;