import { Col, Nav, Navbar, Row } from "react-bootstrap";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { CSSProperties } from "react";

import Avatar from "components/game/avatar/gameAvatar";
import Breakpoints from "common/style/breakpoints";
import flexbox from "utils/flexbox";
import GameAvatarList from "../gameAvatarList/gameAvatarList";
import GamePageAvatarType from "components/game/gameSection/enums/GamePageAvatarTypes";
import IGameDonationCycle from "./interfaces/IGameDonationCycleProps";
import Logo from "components/common/logo/logo";
import LogoVariants from "components/common/logo/enums/logoVariants";
import PrimaryButton from "components/common/primaryButton/primaryButton";
import styles from "components/game/gameDonationCycle/gameDonationCycle.module.scss";
import useBoolean from "hooks/useBoolean";
import useBreakpoint from "hooks/useBreakpoint";
import useStyles from "hooks/useStyles";

const rowVCenter = flexbox({ vAlign: "center", vertical: true, });
const rowCenter = flexbox({ hAlign: "center" });
const horizontalAlign = flexbox({ hAlign: "center", vAlign: "center" });
const colCenter = flexbox({ vertical: true, hAlign: "center", vAlign: "center" });
const rowHBetween = flexbox({ hAlign: "between" });
const rowHEnd = flexbox({ hAlign: "end" });
const donationValues: string[] = ["5", "10", "15", "25", "50"];

const avatarTimeout = 1000;
const contentCreatorDonation = 50;
const friendsDonation = 4;
const spiffyDonation = 10;
const donationTotalAvatars = 11;
const stepTwoTimeout = 1500;
/** Donation Cycle Animation Style */
const fourHundred = 420;
const ten = 10;
const eleven = 11;
const fiveHundred = 500;
const fifty = 50;
const eightHundred = 800;
const elevenHundred = 1100;
const thiryFive = 35;
const seventy = 70;
const thirty = 30;
const seventeenHundred = 1700;
const sixteenHundred = 1600;
const thousand = 1000;
const threeHundred = 300;
const fourtyFive = 45;
const twelveHundred = 1300;
const twenty = 20;

const GameDonationCycle = (props: IGameDonationCycle): JSX.Element => {
    const [expanded, { toggle: navToggle }] = useBoolean(false);
    const [donationAmount, setDonationAmount] = React.useState<string>("");
    const [animation, { setTrue: animationTrue, setFalse: animationFalse }] = useBoolean(false);
    const [coinStyles, , updateCoinStyle] = useStyles<CSSProperties>();
    const isLG = useBreakpoint(Breakpoints.LG);
    const coinAnimationWrapperRef = React.useRef<HTMLDivElement>();
    const coinRef = React.useRef<HTMLDivElement>();

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
                    updateCoinStyle({
                        left: null,
                        top: null,
                        transition: "none",
                    });
                }}
                className={`
              ${horizontalAlign} 
              ${styles.donationButton}
              ${donation === donationAmount ? styles.active : styles.inactive}
              w-100 px-1 py-3`}
            >
                ${donation}
            </PrimaryButton>
        ), [animationHandler, donationAmount]);


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
                left = twenty;
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
            } else if (width > fourHundred && width < eightHundred) {
                startingLeft = ten;
            } else if (width > threeHundred && width < fourHundred) {
                startingLeft = 0;
            } else {
                startingLeft = fourtyFive;
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
                        top: bounds.y + coin.scrollTop - twenty,
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
    const getDonationAmout = React.useCallback((donation: number) => {
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
                    {getDonationAmout(friendsDonation)}
                </span>
            </>;
        }
    }, [donationAmount, getDonationAmout]);

    return <div ref={coinAnimationWrapperRef} className={`${styles.donationSections} w-100 overflow-auto`}>
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
                    onClick={isLG ? navToggle : undefined}>
                    <Navbar.Brand className="d-lg-none">
                        {!donationAmount ? "Select Amount" : `$${donationAmount}`}
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
                            {donationAmount && getDonationAmout(contentCreatorDonation)}
                        </p>
                    </div>
                    <Row className={rowHBetween}>
                        <Col className={`${horizontalAlign} ${styles.cycleheigth}`}>
                            <div className={`${styles.cycle} ${colCenter} ${styles.cycle1} position-relative text-center`} data-index="1">
                                <Avatar color={GamePageAvatarType.Green} size={56} />
                                <span
                                    className={
                                        `${styles.donationAmount} ${styles.donationAmount1} `
                                    }>
                                    {getDonationAmout(friendsDonation)}
                                </span>
                            </div>
                        </Col>
                    </Row>
                    <Row
                        className={`${styles.donationRow1}
                        ${styles.friendsMarginTop}
                        ${rowHEnd}`}
                    >
                        <div className={`${styles.cycle2} ${colCenter} ${styles.cycle} position-relative`} data-index="2">
                            {donation(styles.donationAmount2, GamePageAvatarType.Red)}
                        </div>
                    </Row>
                    <Row className={`${styles.donationRow2} ${rowHBetween}`}>
                        <div className={`${styles.donationLogo} ${colCenter} position-relative`}>
                            <div className="text-lg-right position-absolute">
                                <span className="d-block">
                                    We’re totally reliant on these cents to keep us going.
                                </span>
                            </div>
                            <div className={`${styles.cycle11} ${colCenter} ${styles.cycle} position-relative`} data-index="11">
                                <Logo variant={LogoVariants.footer} />
                                <span className={`${styles.donationAmount11} ${styles.donationAmount}`}>
                                    {getDonationAmout(spiffyDonation)}
                                </span>
                            </div>
                        </div>

                        <div className={`${styles.cycle3} ${colCenter} ${styles.cycle} position-relative`} data-index="3">
                            {donation(styles.donationAmount3, GamePageAvatarType.Yellow)}
                        </div>
                    </Row>
                    <Row className={`${styles.donationRow3} ${rowHBetween}`}>
                        <div className={`${styles.cycle10} ${colCenter} ${styles.cycle} position-relative`} data-index="10">
                            {donation(styles.donationAmount10, GamePageAvatarType.Green)}
                        </div>
                        <div className={`${styles.cycle4} ${colCenter} ${styles.cycle} position-relative`} data-index="4">
                            {donation(styles.donationAmount4, GamePageAvatarType.Purple)}
                        </div>
                    </Row>
                    <Row className={`${styles.donationRow2} ${rowHBetween}`}>
                        <div className={`${styles.cycle9} ${colCenter} ${styles.cycle} position-relative`} data-index="9">
                            {donation(styles.donationAmount9, GamePageAvatarType.Yellow)}
                        </div>
                        <div className={`${styles.cycle5} ${colCenter} ${styles.cycle} position-relative`} data-index="5">
                            {donation(styles.donationAmount5, GamePageAvatarType.Yellow)}
                        </div>
                    </Row>
                    <Row className={`${styles.donationRow1}
                        ${styles.friendsMarginBottom} 
                        ${rowHBetween}`}>
                        <div className={`${styles.cycle8} ${colCenter} ${styles.cycle} position-relative`} data-index="8">
                            {donation(styles.donationAmount8, GamePageAvatarType.Red)}
                        </div>
                        <div className={`${styles.cycle6} ${colCenter} ${styles.cycle} position-relative`} data-index="6">
                            {donation(styles.donationAmount6, GamePageAvatarType.Red)}
                        </div>
                    </Row>
                    <Row className={horizontalAlign}>
                        <div className={`${styles.cycle7} ${colCenter} ${styles.cycle} position-relative`} data-index="7">
                            {donation(styles.donationAmount7, GamePageAvatarType.Green)}
                        </div>
                    </Row>
                </div>
            </div>
        </div >
        {
            donationAmount
                ? <div className={`${styles.card} ${rowCenter}`}>
                    <GameAvatarList
                        friends={props.friends}
                        seletedAvatar={props.seletedAvatar}
                        name={props.name}
                    />
                </div>
                : null
        }
    </div >;
};

export default GameDonationCycle;