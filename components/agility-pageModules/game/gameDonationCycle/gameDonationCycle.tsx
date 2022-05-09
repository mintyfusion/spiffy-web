import { Col, Row } from "react-bootstrap";
import Image from "next/image";
import React, { CSSProperties } from "react";

import Avatar from "components/agility-pageModules/game/avatar/gameAvatar";
import ButtonList from "components/agility-pageModules/common/buttonList/buttonList";
import flexbox from "utils/flexbox";
import GameAvatarList from "components/agility-pageModules/game/gameAvatarList/gameAvatarList";
import GamePageAvatarType from "components/agility-pageModules/game/gameSection/enums/GamePageAvatarTypes";
import IGameDonationCycle from "components/agility-pageModules/game/gameDonationCycle/interfaces/IGameDonationCycleProps";
import Logo from "components/agility-pageModules/common/logo/logo";
import LogoVariants from "components/agility-pageModules/common/logo/enums/logoVariants";
import useBoolean from "hooks/useBoolean";
import useStyles from "hooks/useStyles";

import styles from "components/agility-pageModules/game/gameDonationCycle/gameDonationCycle.module.scss";

const colVCenter = flexbox({ vAlign: "center", vertical: true, });
const rowHCenter = flexbox({ hAlign: "center" });
const rowCenter = flexbox({ hAlign: "center", vAlign: "center" });
const colCenter = flexbox({ vertical: true, hAlign: "center", vAlign: "center" });
const rowHBetween = flexbox({ hAlign: "between" });
const rowHEnd = flexbox({ hAlign: "end" });
const donationValues: string[] = ["5", "10", "15", "25", "50"];

// declaring timeout values for settimeout functions
const avatarTimeout = 1000;
const stepTwoTimeout = 1500;

// donation values for counting amount shares
const contentCreatorDonation = 50;
const friendsDonation = 4;
const spiffyDonation = 10;

// Mobile Breakpoints
const fourHundred = 400;
const threeHundred = 300;
const eightHundred = 800;
const sixHundred = 600;
const fiveHundred = 500;

// Desktop Breakpoints
const fourteenHundred = 1400;
const fifteenHundred = 1500;
const twelveHundred = 1300;
const thousand = 1000;
const seventeenHundred = 1700;
const sixteenHundred = 1600;
const ninteenTwenty = 1920;
const twoThousand = 2000;
const twentyOneHundred = 2100;
const twentyTwoHundred = 2200;
const twentyThreeHundred = 2300;
const twentyFourHundred = 2400;
const twentyFiveHundred = 2500;
const twentySixHundred = 2600;

// positions for breakpoint ranges
const eleven = 11;
const thiryFive = 35;
const oneFourty = 140;
const oneSixty = 160;
const thirty = 30;
const fourty = 40;
const fifty = 50;
const eigthy = 80;
const hundred = 100;
const oneFifty = 150;
const ninety = 90;
const seventy = 70;
const twenty = 20;
const ten = 10;
const oneTwenty = 120;
const oneSeventy = 170;
const oneEigthy = 180;
const oneNinety = 190;
const twoHundred = 200;
const twoHundredTen = 210;
const twoHundredTwenty = 220;
const twoHundredThirty = 230;
const oneFourtyFive = 145;
const oneSixtyFive = 165;
const oneFiftyFive = 155;
const oneSeventyFive = 175;

const donationCycleClasses = `${colCenter} ${styles.cycle} position-relative`;

const GameDonationCycle = (props: IGameDonationCycle): JSX.Element => {
    const [donationAmount, setDonationAmount] = React.useState<string>("");
    const [animation, { setTrue: startAnimation, setFalse: stopAnimation }] = useBoolean(false);
    const [coinStyles, , updateCoinStyle] = useStyles<CSSProperties>();
    const coinAnimationWrapperRef = React.useRef<HTMLDivElement>();
    const coinRef = React.useRef<HTMLDivElement>();

    /**
    * Reset the donation cycle animation.
    * @param donation user select amount of donation.
    */
    const resetCycleAnimation = React.useCallback((donation: string) => {
        if (donation !== donationAmount) {
            stopAnimation();
            const animationTimeout = setTimeout(() => {
                startAnimation();
                clearTimeout(animationTimeout);
            }, avatarTimeout);
        }
    }, [donationAmount, stopAnimation, startAnimation]);

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
                left = thirty;
            } else if (width > fourHundred && width < fiveHundred) {
                left = fourty;
            } else if (width > fiveHundred && width < eightHundred) {
                left = fifty;
            } else if (width > eightHundred && width < thousand) {
                left = eigthy;
            } else if (width > thousand && width < twelveHundred) {
                left = hundred;
            } else if (width > fourteenHundred && width < fifteenHundred) {
                left = oneTwenty;
            } else if (width > fifteenHundred && width < seventeenHundred) {
                left = oneFifty;
            } else if (width > ninteenTwenty && width < twoThousand) {
                left = oneSeventy;
            } else if (width > twoThousand && width < twentyOneHundred) {
                left = oneEigthy;
            } else if (width > twentyOneHundred && width < twentyTwoHundred) {
                left = oneNinety;
            } else if (width > twentyTwoHundred && width < twentyThreeHundred) {
                left = twoHundred;
            } else if (width > twentyThreeHundred && width < twentyFourHundred) {
                left = twoHundredTen;
            } else if (width > twentyFourHundred && width < twentyFiveHundred) {
                left = twoHundredTwenty;
            } else if (width > twentyFiveHundred && width < twentySixHundred) {
                left = twoHundredThirty;
            } else {
                left = oneSixty;
            }

            if (width < seventeenHundred && width > sixteenHundred) {
                startingLeft = thiryFive;
            } else if (width > thousand && width < sixteenHundred) {
                startingLeft = ninety;
            } else if (width > eightHundred && width < thousand) {
                startingLeft = seventy;
            } else if (width > sixHundred && width < eightHundred) {
                startingLeft = fourty;
            } else if (width > fourHundred && width < sixHundred) {
                startingLeft = twenty;
            } else if (width > threeHundred && width < fourHundred) {
                startingLeft = ten;
            } else if (width > ninteenTwenty && width < twoThousand) {
                startingLeft = oneFourtyFive;
            } else if (width > twoThousand && width < twentyOneHundred) {
                startingLeft = oneFifty;
            } else if (width > twentyOneHundred && width < twentyTwoHundred) {
                startingLeft = oneFiftyFive;
            } else if (width > twentyTwoHundred && width < twentyThreeHundred) {
                startingLeft = oneSixtyFive;
            } else if (width > twentyThreeHundred && width < twentyFourHundred) {
                startingLeft = oneSeventy;
            } else if (width > twentyFourHundred && width < twentyFiveHundred) {
                startingLeft = oneSeventyFive;
            } else if (width > twentyFiveHundred && width < twentySixHundred) {
                startingLeft = oneEigthy;
            } else {
                startingLeft = oneFourty;
            }

            const leftStyle = bounds.x + coin.scrollLeft - startingLeft;
            const topStyle = bounds.y + coin.scrollTop;

            switch (stepIndex) {
                case 0:
                    updateCoinStyle({
                        left: leftStyle,
                        top: topStyle,
                        transition: "2s",
                        opacity: "1"
                    });
                    break;
                case eleven:
                    updateCoinStyle({
                        left: leftStyle,
                        top: topStyle,
                        transition: "2s",
                        opacity: "0"
                    });
                    break;
                default:
                    updateCoinStyle({
                        left: bounds.x + coin.scrollLeft - left,
                        top: bounds.y + coin.scrollTop - thirty,
                        transition: "2s",
                        opacity: "1"
                    });
            }
        }
    }, [updateCoinStyle]);

    /**
     * Function to start or reset the donation cycle animation.
     */
    React.useEffect(() => {
        let coinInterval: NodeJS.Timer;
        if (animation) {
            const donationTotalAvatars = 11;
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
    const getDonationAmount = React.useCallback((donation: number) => {
        const percentage = 100;
        const donationFixed = 2;
        const amount = (donation / percentage * Number(donationAmount)).toFixed(donationFixed);

        return <span>{amount.charAt(0) === "0" ? `${amount}¢` : `$${amount}`}</span>;
    }, [donationAmount]);

    /**
     * Donation cycle items.
     * @param style classNames of cycle items.
     */
    const donation = React.useCallback((amountClass: string, color: string, dataIndex: string, cycleClass: string) => {
        if (donationAmount) {
            return (
                <div className={`${cycleClass} ${donationCycleClasses}`} data-index={dataIndex}>
                    <Avatar color={color} size={56} />
                    <span className={`${amountClass} ${styles.donationAmount}`}>
                        {getDonationAmount(friendsDonation)}
                    </span>
                </div>
            );
        }
    }, [donationAmount, getDonationAmount]);

    const handleDonationButtonClick = React.useCallback((amount: string) => {
        setDonationAmount(amount);
        resetCycleAnimation(amount);
        coinAnimationWrapperRef.current.scroll({
            top: 230,
            behavior: "smooth"
        });
        updateCoinStyle({
            left: null,
            top: null,
            transition: "none",
        });
    }, [resetCycleAnimation, updateCoinStyle]);

    return <div ref={coinAnimationWrapperRef} className={`${styles.donationSections} w-100 overflow-auto`}>
        <div className={`${styles.card} ${rowHCenter}`}>
            <div className={`${colVCenter} ${styles.stepFour} position-relative`}>
                <h2 className={`${styles.avatarHeading} text-center`}>
                    How much do you want to donate?
                </h2>
                <h4 className="text-center">
                    Add donation in increments of $5, and discover where your donation is going.
                </h4>

                <ButtonList
                    selected={donationAmount}
                    lisItems={donationValues}
                    onButtonClick={handleDonationButtonClick}
                    valuePrefix="$"
                />

                <div className={`w-100 ${animation ? styles.contentAnimation : styles.donationCycle}`}>
                    <div className={`${styles.donationInner} ${colCenter}`}>
                        <h2>Donation Cycle</h2>
                        <div className={`${styles.coin} position-absolute`} ref={coinRef} style={coinStyles}>
                            <Image src="/images/game/coin.png" alt="Coin" width={76} height={76} />
                        </div>
                        <div className={`${styles.userDonation} position-relative`} data-index="0">
                            <Image src="/images/game/user.png" alt="User" width={149} height={129} />
                        </div>
                        <p>
                            {donationAmount && getDonationAmount(contentCreatorDonation)}
                        </p>
                    </div>
                    <Row className={rowHBetween}>
                        <Col className={`${rowCenter} ${styles.cycleheigth}`}>
                            {donation(styles.donationAmount1, GamePageAvatarType.Green, "1", `${styles.cycle1} text-center`)}
                        </Col>
                    </Row>
                    <Row
                        className={`${styles.donationRow1}
                        ${styles.friendsMarginTop}
                        ${rowHEnd}`}
                    >
                        {donation(styles.donationAmount2, GamePageAvatarType.Red, "2", styles.cycle2)}
                    </Row>
                    <Row className={`${styles.donationRow2} ${rowHBetween}`}>
                        <div className={`${styles.donationLogo} ${colCenter} position-relative`}>
                            <div className="text-lg-right position-absolute">
                                <span className="d-block">
                                    We’re totally reliant on these cents to keep us going.
                                </span>
                            </div>
                            <div className={`${styles.cycle11} ${donationCycleClasses}`} data-index="11">
                                <Logo variant={LogoVariants.footer} />
                                <span className={`${styles.donationAmount11} ${styles.donationAmount}`}>
                                    {getDonationAmount(spiffyDonation)}
                                </span>
                            </div>
                        </div>

                        {donation(styles.donationAmount3, GamePageAvatarType.Yellow, "3", styles.cycle3)}
                    </Row>
                    <Row className={`${styles.donationRow3} ${rowHBetween}`}>
                        {donation(styles.donationAmount10, GamePageAvatarType.Green, "10", styles.cycle10)}
                        {donation(styles.donationAmount4, GamePageAvatarType.Purple, "4", styles.cycle4)}

                    </Row>
                    <Row className={`${styles.donationRow2} ${rowHBetween}`}>
                        {donation(styles.donationAmount9, GamePageAvatarType.Yellow, "9", styles.cycle9)}
                        {donation(styles.donationAmount5, GamePageAvatarType.Yellow, "5", styles.cycle5)}
                    </Row>
                    <Row className={`${styles.donationRow1}
                        ${styles.friendsMarginBottom} 
                        ${rowHBetween}`}>
                        {donation(styles.donationAmount8, GamePageAvatarType.Red, "8", styles.cycle8)}
                        {donation(styles.donationAmount6, GamePageAvatarType.Red, "6", styles.cycle6)}
                    </Row>
                    <Row className={rowCenter}>
                        {donation(styles.donationAmount7, GamePageAvatarType.Green, "7", styles.cycle7)}
                    </Row>
                </div>
            </div>
        </div>
        {
            donationAmount
                ? <div className={`${styles.card} ${rowHCenter}`}>
                    <GameAvatarList
                        friends={props.friends}
                        seletedAvatar={props.seletedAvatar}
                        name={props.name}
                    />
                </div>
                : null
        }
    </div>;
};

export default GameDonationCycle;