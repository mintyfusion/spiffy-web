import Image from "next/image";
import React from "react";

import data from "components/game/gameSection/gameSectionContent";
import flexbox from "utils/flexbox";
import GameAvatarList from "components/game/gameAvatarList/gameAvatarList";
import IAvatar from "components/game/gameSection/interfaces/IAvatar";

import styles from "components/game/gameSection/gameSection.module.scss";
import AvatarType from "./enums/avatarTypes";

const colCenter = flexbox({ vertical: true, hAlign: "center", vAlign: "center" });
const rowCenter = flexbox({ vAlign: "center", hAlign: "center", });
const rowHBetween = flexbox({ hAlign: "between" });
const rowHCenter = flexbox({ vAlign: "center", vertical: true, });

const donation: string[] = ["5", "10", "15", "25", "50"];
const donationDivide = 2;
const friendsLength = 4;
const friendsTimeout = 5000;
const avatarTimeout = 1000;
const animationtimeout = 2000;

const GameSection = (): JSX.Element => {
    const [friends, setFriends] = React.useState<IAvatar[]>([]);
    const [selected, setSelected] = React.useState<IAvatar>();
    const [step, setStep] = React.useState<string>("1");
    const [avatarName, setAvatarName] = React.useState<string>("");
    const [donationAmount, setDonationAmount] = React.useState<string>("");
    const [animation, setAnimation] = React.useState<boolean>(false);

    React.useEffect(() => {
        let timer: NodeJS.Timeout;
        if (friends.filter((filter) => filter.className).length === friendsLength) {
            timer = setTimeout(() => {
                setStep("4");
                clearTimeout(timer);
            }, friendsTimeout);
        }

        return () => clearTimeout(timer);
    }, [friends]);

    const friendsHandler = (i: IAvatar) => {
        const selectedFriendId = friends.findIndex(element => element.id == i.id);
        const freindsClassUpdate = [...friends];
        freindsClassUpdate[selectedFriendId] =
            { ...freindsClassUpdate[selectedFriendId], className: styles.friendsAnimation };
        setFriends(freindsClassUpdate);
    };

    const selectedHandler = (i: IAvatar) => {
        setSelected(i);
    };

    const selectedAvatarClasses = React.useMemo(() => {
        switch (selected?.id) {
            case "Purple":
                return styles.avatarPurple;
            case "Green":
                return styles.avatarGreen;
            case "Red":
                return styles.avatarRed;
            case "Yellow":
                return styles.avatarYellow;
            case "Orange":
                return styles.avatarOrange;
            default:
                return "";
        }
    }, [selected]);

    const selectedAvatarStepClasses = React.useMemo(() => {
        switch (step) {
            case "2":
                return styles.avatarstepTwo;
            case "3":
                return styles.avatarstepThree;
            case "4":
                return "d-none";
            case "5":
                return "d-none";
            case "6":
                return "d-none";
        }
    }, [step]);

    React.useEffect(() => {
        if (selected) {
            setFriends(data.filter((filter) => filter.id !== selected.id));
        }
    }, [selected]);

    const animationHandler = (donation: string) => {
        if (donation !== donationAmount) {
            setAnimation(false);
            setTimeout(() => {
                setAnimation(true);
            }, avatarTimeout);
        }
    };
    return (
        <div className={"position-relative"}>
            <div className={`${selectedAvatarStepClasses} ${selectedAvatarClasses}`}>
                {selected ?
                    <Image {...selected.image} />
                    : null
                }
            </div>

            <div className={`${step === "1" || step === "2" ? styles.container : "d-none"} ${step === "2" ? styles.containerFadOut : ""}`}>
                <div className={`${colCenter} ${styles.gameStepOne}`}>
                    <h2 className={`${styles.avatarHeading}`}>Select your avatar.</h2>
                    <div className={`${styles.avatarWrapper} ${rowCenter} flex-wrap`}>
                        {data.filter((filter) => filter.id !== AvatarType.Orange).map((i: IAvatar, k) =>
                            <div className={`${selected === undefined ? "visible" : styles.avatarAnimation}`} key={k}>
                                <Image {...i.image}
                                    onClick={() => {
                                        selectedHandler(i);
                                        setTimeout(() => {
                                            setStep("2");
                                        }, animationtimeout);
                                    }} />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className={`${step === "2" || step === "3" ? styles.container : "d-none"} ${step === "2" ? styles.containerFadIn : step === "3" ? styles.containerFadOut : "d-none"}`}>
                <div className={`${colCenter} ${styles.gameStepTwoWrapper}`}>
                    <h2 className={`${styles.avatarHeading}`}>Name your avatar.</h2>
                    <div className={`${colCenter} ${styles.gameStepTwo}`}>
                        {selected ?
                            <Image {...selected.image} />
                            : null}
                        <input placeholder="Name" className="w-100 text-center" onChange={(e) => setAvatarName(e.target.value)} />
                        <button disabled={avatarName === ""} onClick={() => {
                            setStep("3");
                        }}>Continue</button>
                    </div>
                </div>
            </div>

            <div className={`${styles.paddingSides} ${step === "3" || step === "4" ? styles.container : "d-none"} ${step === "3" ? styles.containerFadIn : step === "4" ? styles.containerFadOut : "d-none"}`}>
                <div className={`${styles.gameStepThree} ${rowHBetween} position-relative`}>
                    <div className={`${styles.gameStepThreeUserColumn} ${colCenter}`}>
                        <h2 className={styles.avatarHeading}>Add four friends.</h2>
                        <div className={styles.avatarInner}>
                            <div className={`${step === "3" || step === "4" ? styles.selected : "invisible"}`}>
                                {selected ? <Image {...selected.image} width={222} height={222} /> : null}
                            </div>
                        </div>
                        <h3>{avatarName}</h3>
                    </div>

                    <div className={`${styles.gameStepThreeFriendsColumn} ${rowHCenter}`}>
                        <h2 className={styles.avatarHeading}>Add four friends.</h2>
                        <div className={`${styles.percentageWrapper} ${rowHCenter} flex-wrap`}>
                            {friends.map((i, k) => <div className={i.className} key={k}>
                                <Image
                                    {...i.image}
                                    onClick={() => friendsHandler(i)} />
                            </div>)}
                        </div>
                    </div>
                </div>
            </div>

            <div className={`${step === "4" || step === "5" ? styles.container : "d-none"} 
            ${step === "4" ? styles.containerFadIn : step === "5" ? styles.containerFadOut : "d-none"}`}>
                <div className={`${colCenter} ${styles.stepFour}`}>
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
                    <div className={"d-sm-none"}>
                        <div className={`${rowHBetween}`}>
                            <select onChange={(e) => {
                                setDonationAmount(e.target.value);
                                animationHandler(e.target.value);
                            }}>
                                {donation.map((donation, donationKey) => <option key={donationKey}>{donation}</option>)}
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
                    {animation ? <div className={`${animation ? styles.animationGrid : ""} position-relative w-100`}>
                        <div className={styles.donationCycleItems}>
                            <Image src={"/images/Game/donationCycle/avatarPurple.png"} width={56} height={63} />
                            <span>$0.50</span>
                            <h3 className="position-absolute">Early Adapters</h3>
                        </div>
                        {data.concat(friends).map((i, k) => (
                            <div className={styles.donationCycleItems} key={k}>
                                <Image {...i.image} width={56} height={63} />
                                <span>{(Number(donationAmount) / 5) / 5}</span>
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
                    </div> : null}
                </div>
            </div>

            <div className={`${donationAmount ? styles.container : "d-none"} ${step === "6" ? styles.containerFadOut : ""}`}>
                <GameAvatarList friends={friends} selected={selected} name={avatarName} setStep={setStep} />
            </div>

            <div className={`${step === "6" ? styles.container : "d-none"} ${step === "6" ? styles.containerFadIn : "d-none"}`}>
                <div className={styles.gameStepSix}>
                    <div className={`${colCenter} ${step === "6" ? styles.show : "d-none"} ${styles.signUpsection}`}>
                        <Image src={"/images/Game/trophy.png"} alt="trophy" width={291} height={318} />
                        <h2 className={`${styles.avatarHeading}`}>Congratulations!</h2>
                        <button>SIGN UP</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default GameSection;